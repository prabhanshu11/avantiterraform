---
name: avanti-email-domain
description: Pointer to the Avanti Terraform email/domain runbook (Google Workspace, Namecheap DNS, VPS SMTP relay for the contact form). Use when touching the contact-form API SMTP settings, scripts/set-vps-smtp-env.sh, deploy secrets, or anything about mail on avantiterraform.com.
---

# Avanti email and domain: where the runbook lives

This repository is **public**. The full runbook (provider history, DNS records,
admin-account recovery, billing, VPS `.env` contents) contains company
identifiers and is kept in the private company repo:

    ~/Documents/avanti-terraform/.claude/skills/avanti-email-domain/SKILL.md

Read that file before changing SMTP settings, the contact-form API, or the
deploy workflow. Never copy its contents, the VPS `.env`, or any identifiers
from it into this repository.

What lives here instead:
- `scripts/set-vps-smtp-env.sh` writes the VPS SMTP `.env` (no secrets in git).
- `api/` is the contact-form service that uses those settings.
- `deploy/` and the GitHub `deploy.yml` workflow push the site to the VPS.
