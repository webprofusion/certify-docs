---
id: ansible-update
title: Update with Ansible
description: Use an Ansible playbook to keep Certify Certificate Manager (Windows) and Certify Management Agent (Linux) up to date across many servers.
displayed_sidebar: commonDocsSidebar
---

If you look after many servers, you can use [Ansible](https://docs.ansible.com/) to keep *Certify Certificate Manager* (Windows) and *Certify Management Agent* (Linux) up to date. This guide gives you a playbook for each one. Each playbook:

1. Gets the version installed on the server.
2. Asks the Certify The Web update API for the latest release.
3. If the server is out of date, downloads the release and checks its SHA-256 checksum.
4. Runs the installer silently, then checks that the service is running again.

Servers that are already up to date are not changed, so you can run the playbooks on a schedule (for example from AWX, Ansible Automation Platform, or cron on your control node).

Your settings are kept when you update. They are stored in `C:\ProgramData\certify` on Windows and `/usr/share/certify` on Linux. Back these up as normal.

Each playbook starts with a `Version` comment that shows the date it was last changed. Compare it with the playbook on this page to see if your copy is out of date.

:::tip
Run the playbook on a few test servers first. The playbooks use `serial` so that only a few servers update at a time.
:::

## Before you start

- An Ansible control node with Ansible 2.15 or newer.
- For Windows servers, the `ansible.windows` collection, and a WinRM or SSH connection that runs as an administrator:

  ```bash
  ansible-galaxy collection install ansible.windows
  ```

- For Linux servers, SSH access with `sudo` (`become`) rights.
- Each server can reach `https://api.certifytheweb.com` and `https://downloads.certifytheweb.com` over HTTPS.
- An inventory that puts your servers in groups. The examples use the groups `certify_ccm` and `certify_agent`:

  ```ini
  [certify_ccm]
  web01.example.com
  web02.example.com

  [certify_ccm:vars]
  ansible_connection=winrm
  ansible_winrm_transport=ntlm
  ansible_port=5986

  [certify_agent]
  app01.example.com
  app02.example.com
  ```

## Update Certify Certificate Manager (Windows)

Save this playbook as `update-certify-ccm.yml`:

```yaml
# Certify The Web - Update Certify Certificate Manager (Windows)
# Version: 2026-10-19
# Latest version: https://docs.certifytheweb.com/docs/guides/ansible-update

- name: Update Certify Certificate Manager
  hosts: certify_ccm
  serial: 5
  vars:
    certify_channel: release
    certify_check_signature: true
    certify_setup_path: C:\Windows\Temp\certify-ccm-setup.exe
    certify_setup_log: C:\Windows\Temp\certify-ccm-setup.log

  tasks:
    - name: Get the installed version
      ansible.windows.win_reg_stat:
        path: HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Certify The Web_is1
        name: DisplayVersion
      register: certify_installed

    - name: Skip servers where the app is not installed
      ansible.builtin.meta: end_host
      when: not certify_installed.exists

    - name: Get the latest release
      ansible.windows.win_uri:
        url: "https://api.certifytheweb.com/v1/update?product=ccm&platform=windows-x64&channel={{ certify_channel }}&version={{ certify_installed.value }}"
        return_content: true
      register: certify_release

    - name: Work out the versions
      ansible.builtin.set_fact:
        certify_installed_version: "{{ certify_installed.value }}"
        certify_latest_version: "{{ certify_release.json.version.major }}.{{ certify_release.json.version.minor }}.{{ certify_release.json.version.patch }}"

    - name: Show the versions
      ansible.builtin.debug:
        msg: "Installed {{ certify_installed_version }}, latest {{ certify_latest_version }}"

    - name: Update when a newer version is available
      when: certify_installed_version is version(certify_latest_version, '<')
      block:
        - name: Download the installer and check its checksum
          ansible.windows.win_get_url:
            url: "{{ certify_release.json.message.downloadFileURL }}"
            dest: "{{ certify_setup_path }}"
            checksum: "{{ certify_release.json.message.sha256 }}"
            checksum_algorithm: sha256
            force: true

        - name: Check the installer is signed by Webprofusion Pty Ltd
          ansible.windows.win_shell: |
            $sig = Get-AuthenticodeSignature -FilePath '{{ certify_setup_path }}'
            if ($sig.Status -ne 'Valid' -or $sig.SignerCertificate.Subject -notmatch 'Webprofusion Pty Ltd') {
              throw "Installer signature is not valid: $($sig.Status) $($sig.SignerCertificate.Subject)"
            }
          changed_when: false
          when: certify_check_signature | bool

        - name: Run the installer silently
          ansible.windows.win_command: >-
            "{{ certify_setup_path }}" /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP- /CLOSEAPPLICATIONS /LOG="{{ certify_setup_log }}"

        - name: Check the service is running
          ansible.windows.win_service:
            name: Certify Management Agent
            state: started

      always:
        - name: Remove the installer
          ansible.windows.win_file:
            path: "{{ certify_setup_path }}"
            state: absent
```

Run it:

```bash
ansible-playbook -i inventory.ini update-certify-ccm.yml
```

Notes:

- The installer stops the *Certify Management Agent* background service, updates the files, and starts the service again. It closes the app's window if a user has it open.
- If an update fails, read the installer log at `C:\Windows\Temp\certify-ccm-setup.log` on that server.
- Servers still on version 6 are offered the last version 6 release, not version 7. Upgrade those servers to version 7 by hand first, using the steps in [Upgrade from v6 to v7](installation.md#upgrade-from-v6-to-v7), especially if the service runs under a custom account.

## Update Certify Management Agent (Linux)

This playbook is for Linux servers where the agent was installed with the [install script](../hub/installation/linux.md#certify-management-agent), which runs the agent as the systemd service `certify-agent`. It works on x64 and arm64.

Save this playbook as `update-certify-agent.yml`:

```yaml
# Certify The Web - Update Certify Management Agent (Linux)
# Version: 2026-10-19
# Latest version: https://docs.certifytheweb.com/docs/guides/ansible-update

- name: Update Certify Management Agent
  hosts: certify_agent
  become: true
  serial: 5
  vars:
    certify_channel: release
    certify_agent_url: http://127.0.0.2:9696
    certify_platform: "linux-{{ 'arm64' if ansible_facts['architecture'] in ['aarch64', 'arm64'] else 'x64' }}"
    certify_work_dir: /tmp/certify-agent-update

  tasks:
    - name: Get the installed version from the agent
      ansible.builtin.uri:
        url: "{{ certify_agent_url }}/api/system/appversion"
        return_content: true
      register: certify_installed

    - name: Read the installed version
      ansible.builtin.set_fact:
        certify_installed_version: "{{ certify_installed.content | trim | replace('\"', '') }}"

    - name: Get the latest release
      ansible.builtin.uri:
        url: "https://api.certifytheweb.com/v1/update?product=agent&platform={{ certify_platform }}&channel={{ certify_channel }}&version={{ certify_installed_version }}"
        return_content: true
      register: certify_release

    - name: Work out the latest version
      ansible.builtin.set_fact:
        certify_latest_version: "{{ certify_release.json.version.major }}.{{ certify_release.json.version.minor }}.{{ certify_release.json.version.patch }}"

    - name: Show the versions
      ansible.builtin.debug:
        msg: "Installed {{ certify_installed_version }}, latest {{ certify_latest_version }}"

    - name: Update when a newer version is available
      when: certify_installed_version is version(certify_latest_version, '<')
      block:
        - name: Create an empty work folder
          ansible.builtin.file:
            path: "{{ certify_work_dir }}/certify-agent-install"
            state: directory
            mode: "0700"

        - name: Download the release and check its checksum
          ansible.builtin.get_url:
            url: "{{ certify_release.json.message.downloadFileURL }}"
            dest: "{{ certify_work_dir }}/certify-agent.tar.gz"
            checksum: "sha256:{{ certify_release.json.message.sha256 }}"
            mode: "0600"

        - name: Extract the release
          ansible.builtin.unarchive:
            src: "{{ certify_work_dir }}/certify-agent.tar.gz"
            dest: "{{ certify_work_dir }}/certify-agent-install"
            remote_src: true

        - name: Run the install script
          ansible.builtin.command:
            cmd: bash ./certify-agent-install/scripts/install-agent.sh
            chdir: "{{ certify_work_dir }}"

        - name: Wait for the agent to report the new version
          ansible.builtin.uri:
            url: "{{ certify_agent_url }}/api/system/appversion"
            return_content: true
          register: certify_updated
          until: (certify_updated.content | default('') | trim | replace('\"', '')) is version(certify_latest_version, '>=')
          retries: 12
          delay: 5

      always:
        - name: Remove the work folder
          ansible.builtin.file:
            path: "{{ certify_work_dir }}"
            state: absent
```

Run it:

```bash
ansible-playbook -i inventory.ini update-certify-agent.yml
```

Notes:

- The install script must run from the folder that holds `certify-agent-install`, which is why the task sets `chdir`.
- The script stops the `certify-agent` service, copies the new files to `/opt/certify-agent`, and starts the service again.
- The playbook reads the installed version from the agent's local API. If the agent is not running, the first task fails for that server. Check the service with `sudo systemctl status certify-agent` and `journalctl -u certify-agent`.
- If you changed the agent's listening address, set `certify_agent_url` to match.

## Options

| Variable | Default | Meaning |
|---|---|---|
| `certify_channel` | `release` | Set to `beta` to get beta releases. Only use beta releases on test servers. |
| `certify_check_signature` | `true` | Windows only. Set to `false` to skip the installer signature check. See [Security](#security). |
| `serial` | `5` | How many servers update at the same time. |
| `certify_agent_url` | `http://127.0.0.2:9696` | The agent's local API address (Linux only). |

## Security

The playbooks only install a release if its SHA-256 checksum matches the one the update API gives. Do not remove this check.

On Windows, the playbook also checks that the installer has a valid signature from `Webprofusion Pty Ltd`. This check can fail on servers that cannot check certificate revocation, for example servers with no internet access apart from the Certify download sites. If you need to, you can turn the check off for those servers with `certify_check_signature: false`, either in the inventory or on the command line:

```bash
ansible-playbook -i inventory.ini update-certify-ccm.yml -e certify_check_signature=false
```

The checksum check still runs when the signature check is off. Only turn off the signature check where you have to.

Keep your playbooks and inventory in a place only your administrators can change, because they run installers with administrator or root rights on every server.

## See also

- [Install and Upgrade Certify Certificate Manager](installation.md)
- [Install Certify Management Agent on Linux](../hub/installation/linux.md#certify-management-agent)
- [Automatic App Updates](auto-update.md)
- [Release notes](https://certifytheweb.com/home/changelog)
