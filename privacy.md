---
layout: legal
title: Privacy Policy
description: How PocketShell handles Google sign-in, encrypted sync, SSH connections, local storage, and your privacy requests.
permalink: /privacy/
---

# Privacy Policy

Last updated: October 2, 2026

This policy covers pocketshell.io, app.pocketshell.io, and PocketShell's desktop, Android, and sync services. PocketShell is operated by Alexey Grigorev. For privacy questions or requests, contact [hello@pocketshell.io](mailto:hello@pocketshell.io).

## Google sign-in

When you sign in with Google, PocketShell receives a Google account identifier, email address, and identity token. Google's sign-in interface may also display your basic profile, such as your name and picture. We use your identity to authenticate you, apply access controls, and associate your encrypted settings with your account. We do not receive your Google password or request access to your Gmail, Google Drive, contacts, or calendar.

## Encrypted sync and local storage

PocketShell encrypts synced host settings on your device using your sync passphrase before uploading them. The sync service stores encrypted blobs and account-related metadata, such as update times and versions. Web clients can also sync encrypted SSH credentials in a separate encrypted settings slot. Your sync passphrase is not sent to the sync service, which cannot decrypt these blobs.

The web app uses browser session storage for your sign-in token and email, and local browser storage for encrypted credentials and settings. If you choose to remember a passphrase, the app also uses device-local storage for that feature. Signing out clears the sign-in session but does not necessarily remove encrypted local data. Clearing the site's browser data removes its local copies; it does not delete synced server copies.

## SSH connections and files

PocketShell connects to the servers you choose. For web connections that use a PocketShell bridge or relay, connection details and the SSH key, password, or key passphrase needed for the connection pass over an encrypted connection to that service. The bridge uses credentials in memory to establish SSH access. This connection path is separate from encrypted settings sync: the bridge processes the credentials and terminal traffic needed for your session.

Commands, terminal output, and files you transfer are processed to provide your requested session. Files you upload to a remote host are stored on that host under its own controls. You are responsible for the servers you connect to and the information you send to them.

## Emails and operational information

If you subscribe to PocketShell updates, we process your email address, confirmation, and subscription status through the DataTalks.Club email relay. Signup uses email confirmation. You can unsubscribe through the link in an update email. If you contact support, we use your message and contact details to respond.

Hosting and connection services process technical information, such as IP addresses, request times, connection identifiers, and errors, to deliver the service and maintain security. The web app does not include analytics or advertising tracking scripts.

## Purposes and service providers

We process account and connection information to provide the service you request, subscription information with your consent, and necessary operational information to protect and maintain the service. We do not sell your personal data or share it for third-party advertising.

Google provides authentication. GitHub Pages hosts the public website, and Amazon Web Services hosts web and sync infrastructure. Depending on the connection route, a relay provider may also process connection traffic. The email relay delivers subscription and support-related messages. Providers process information needed for their functions under their own service arrangements and privacy policies; processing locations may differ from your location.

## Retention and your choices

Encrypted synced settings remain available until removed or replaced, or until the associated stored data is deleted. Local copies remain until removed on that device. Remote sessions and uploaded files remain subject to your remote server's settings. Signing out does not stop an agent already running on your server.

You can remove stored credentials through the app and clear local site data in your browser. For access, correction, export, or deletion of personal data held by PocketShell, email [hello@pocketshell.io](mailto:hello@pocketshell.io). We may need to verify your identity. Legal requirements and provider backup retention may affect deletion. Losing your sync passphrase prevents us from recovering your encrypted settings.

Where applicable, you may also request restriction of processing, object to processing, withdraw consent, and complain to your data protection authority. Withdrawal does not affect processing already performed.

## Security and changes

We use encrypted connections, client-side encryption for synced settings, and authentication controls. No service can guarantee complete security. Protect your Google account, devices, sync passphrase, and SSH credentials. We may update this policy as PocketShell changes; the date above identifies this version.
