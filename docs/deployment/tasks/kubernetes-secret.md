---
id: kubernetes-secret
title: Deploy to Kubernetes TLS Secret
sidebar_label: Kubernetes TLS Secret
description: Store the certificate and key as a Kubernetes TLS secret, and optionally restart the workloads that use it.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Kubernetes TLS Secret* task stores the certificate and its private key as a TLS secret (type `kubernetes.io/tls`) in a Kubernetes cluster. Ingress controllers, Gateway API gateways and service meshes can use the secret directly, and pods can mount it.

The first deployment creates the secret, unless it already exists. Renewals update it. Ingress controllers such as ingress-nginx and Traefik pick up the change themselves. For applications that only load their certificate at startup, the task can also restart their Deployments, StatefulSets or DaemonSets.

Certify connects to the cluster's API server directly, with a service account token. It works with any cluster Certify can reach over HTTPS, including Amazon EKS, Azure AKS and Google GKE.

## Before you start

In the cluster, create a service account for Certify, with permission to write the secret. This example is for secret `www-example-com-tls` in namespace `web`, and also lets Certify restart Deployment `web`:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: certify
  namespace: web
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: certify-tls-secret
  namespace: web
rules:
  # read, create and update the secret
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["www-example-com-tls"]
    verbs: ["get", "create", "patch"]
  # only needed for Workloads to Restart
  - apiGroups: ["apps"]
    resources: ["deployments"]
    resourceNames: ["web"]
    verbs: ["get", "patch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: certify-tls-secret
  namespace: web
subjects:
  - kind: ServiceAccount
    name: certify
    namespace: web
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: certify-tls-secret
---
# a token for the service account that doesn't expire
apiVersion: v1
kind: Secret
metadata:
  name: certify-token
  namespace: web
  annotations:
    kubernetes.io/service-account.name: certify
type: kubernetes.io/service-account-token
```

The service account can only see and change the one secret and the one Deployment. If you create the TLS secret yourself first (as type `kubernetes.io/tls`), you can leave out `create`.

Then get the details for the credential:

- **Token**: `kubectl get secret certify-token -n web -o jsonpath='{.data.token}'`, then base64 decode it. You can use a token from `kubectl create token certify -n web` instead, but it expires, and renewals fail once it has.
- **API server**: `kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}'`
- **Cluster CA certificate**: `kubectl config view --raw --minify -o jsonpath='{.clusters[0].cluster.certificate-authority-data}'`

## Setting up the task

1. Add the *Deploy to Kubernetes TLS Secret* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Kubernetes API Token* credential. Select *New* to add one, with:
     - **API Server**: the API server URL, e.g. `https://k8s.example.com:6443`.
     - **Token**: the service account token.
     - **Cluster CA Certificate**: the cluster's CA certificate, either as the `certificate-authority-data` from a kubeconfig file or in PEM format. When it's set, Certify only trusts API server certificates issued by this CA, as `kubectl` does. Leave it blank if the API server has a publicly trusted certificate.
     - **Allow Invalid TLS Certificate**: don't check the API server's certificate at all. Use the *Cluster CA Certificate* instead where you can.
   - **Namespace**: the namespace of the secret, e.g. `web`.
   - **Secret Name**: the name of the secret, e.g. `www-example-com-tls`. If there's no secret with this name, the task creates it.
   - **Workloads to Restart** (optional): workloads in the same namespace to restart when the certificate changes, comma separated. A name on its own is a Deployment. For other kinds, use `statefulset/name` or `daemonset/name`, e.g. `web, statefulset/db`.
3. Save, then run the task with the ▶️ play button.

## How it works

- The secret has the certificate followed by its intermediate certificates in `tls.crt`, and the private key in `tls.key` (unencrypted PKCS#8 PEM). The root certificate is not included.
- The task writes the secret with server-side apply, as field manager `certify-the-web`. Only `tls.crt`, `tls.key` and the task's annotations are changed. Other keys in the secret, such as `ca.crt`, and its other labels and annotations are kept.
- The secret is annotated with the managed certificate ID (`certifytheweb.com/managed-certificate-id`), and the certificate's serial number and expiry date.
- If the secret already holds this certificate, the task changes nothing and restarts nothing.
- After updating the secret, the task restarts each workload in *Workloads to Restart*, in the same way as `kubectl rollout restart`. Pods are replaced following the workload's update strategy.
- When the task is previewed or validated, it connects to the API server, reads the secret, checks the workloads exist, and asks the API server whether the service account may make each change. It then reports what deploying would change, without changing anything. This catches wrong credentials, missing permissions or wrong names before a renewal depends on them.

## Limitations

- Each managed certificate needs its own secret. The task won't write to a secret annotated for a different managed certificate.
- The task won't write to a secret of another type, an immutable secret, or a secret managed by cert-manager.
- If the secret is part of a Helm release, upgrading the release may replace the certificate. The task warns about this. Leave the secret out of the Helm chart, or let Certify create it.
- Workloads are only restarted when the secret changes. If a restart fails, the task reports it, but running the task again won't retry the restart, as the secret is then up to date. Restart the workload yourself.
- Each task writes to one secret in one cluster. To deploy to more namespaces or clusters, add a task for each.

## Using Certify instead of cert-manager

[cert-manager](https://cert-manager.io/) runs inside each cluster, and gets and renews certificates for the Certificate resources and annotated Ingresses in that cluster. With this task, Certify Management Hub does that job from outside the cluster. Certify gets and renews the certificate, and the task writes it to the same kind of TLS secret, so ingress controllers and pods that use the secret don't need to change.

Certify fits well when:

- You want one place to manage, monitor and report on certificates across clusters, Windows servers, appliances and cloud services, rather than a cert-manager install in each cluster.
- The same certificate is also needed outside the cluster, for example on a load balancer or in a vault. Add a task for each place.
- The cluster shouldn't hold DNS provider credentials, or can't reach your certificate authority. Certify does the [domain validation](../../dns/validation.md), and only needs to reach the API server.
- You use a [certificate authority](../../guides/certificate-authorities.md) Certify supports, with the same validation and renewal settings as your other certificates.

cert-manager is still the better fit when:

- Teams create certificates themselves, by adding Certificate resources or annotating Ingresses, and expect them to be issued without anyone setting up a managed certificate.
- Certificates come and go with deployments, such as one per preview environment.
- You need certificates for workloads inside the cluster, such as mTLS between services with istio-csr or the cert-manager CSI driver.

You can also use both, with each certificate managed by one or the other.

### Moving a certificate from cert-manager

For each cert-manager Certificate you want to move:

1. In Certify, add a managed certificate for the same domains, and request it.
2. Add this task to it, with the namespace and the `secretName` of the Certificate, and run the preview. It reports that the secret is managed by cert-manager, which confirms Certify can reach the cluster and read the secret.
3. If the Certificate was created from Ingress annotations, remove the `cert-manager.io/cluster-issuer` or `cert-manager.io/issuer` annotation from the Ingress, otherwise cert-manager creates the Certificate again. Keep the Ingress's `tls` section.
4. Delete the Certificate, e.g. `kubectl delete certificate www-example-com -n web`. By default cert-manager keeps the secret, so the ingress keeps serving the current certificate. If cert-manager runs with `--enable-certificate-owner-ref`, the secret is deleted too, and Certify creates it again in the next step.
5. Remove cert-manager's annotations from the secret, so the task will write to it:

   ```
   kubectl annotate secret www-example-com-tls -n web cert-manager.io/certificate-name- cert-manager.io/issuer-name- cert-manager.io/issuer-kind- cert-manager.io/issuer-group-
   ```

6. Run the task. It replaces the certificate in the secret, and keeps other keys such as `ca.crt`.

Once you've moved all your certificates, you can uninstall cert-manager.

## Troubleshooting

- **The API server didn't accept the token (401 Unauthorized)**: the token is wrong or has expired, or its service account or token secret was deleted.
- **Access denied (... cannot patch resource "secrets" ...)**, or **the service account isn't allowed to ...**: the service account's Role is missing a permission, or doesn't cover this secret, workload or namespace. Check the Role and RoleBinding above.
- **Could not connect to the API server ... isn't trusted**: set the *Cluster CA Certificate* of the credential to the cluster's CA certificate.
- **Has type ..., not kubernetes.io/tls**: the secret already exists with another type, which can't be changed. Use a different secret name, or delete the secret so the task can create it.
- **There is no deployment/... in namespace ...**: check the names in *Workloads to Restart*, and that the workloads are in the same namespace as the secret.
