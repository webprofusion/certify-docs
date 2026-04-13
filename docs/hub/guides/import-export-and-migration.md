---
title: Import, Export, and Migration
description: Use the Hub import and export workflows to migrate from Certify Certificate Manager, preview imported configuration, and plan safer transitions to centralized administration.
---

# Import, Export, and Migration

The Hub includes an **Import & Export** area for moving certificate configuration between environments, especially from *Certify Certificate Manager* into the Hub model.

## Scope

Use import and export when you want to:

- move existing managed certificate definitions into the Hub
- preview imported configuration before applying it
- consolidate administration from separate CCM installs
- support staged migration instead of rebuilding every certificate manually

## Import Flow

The import flow supports:

- selecting an exported archive
- choosing an import target instance
- entering an encryption password where required
- previewing the import before applying it

Use the preview step to confirm the target instance and archive contents.

## Migration Sequence

1. Identify the instance that should own the certificate after migration.
2. Export the source configuration.
3. Import into a non-critical target first if possible.
4. Review the imported settings carefully.
5. Test authorization and deployment before treating the import as production-ready.

## Post-Import Review

Review:

- target instance selection
- ACME account availability on that instance
- stored credentials on that instance
- deployment tasks and file paths
- service-specific permissions
- maintenance window assignment if used
- tags or environment classification

## Migration Patterns

### CCM to Hub-hosted certificates

Use this when the Hub server itself should now perform the renewal and deployment.

### CCM to joined CCM instance under Hub control

Use this when you want centralized administration but the certificate work should stay on the original Windows machine.

### CCM to joined Agent or another host

Use this only after carefully checking path, permissions, and platform differences.

## Cases to Delay

Do not rush migration if:

- the existing renewal path is stable and there is no immediate benefit to moving it
- local deployment requirements are complex or poorly documented
- the target instance does not yet have the required CA accounts or credentials

In those cases, join the instance first and centralize visibility before changing the execution model.

## Transition Strategy

For larger estates:

1. Join existing instances first.
2. Use the Hub to understand their state.
3. Migrate only the certificates that benefit from a new model.
4. Keep changes small and reversible.

## Read Next

- [Choose a management model](../concepts/management-models.md)
- [Certify Certificate Manager instances](ccm.md)
- [Certify Management Agent](agent.md)
- [Request and deploy certificates](request-and-deploy-certificates.md)
