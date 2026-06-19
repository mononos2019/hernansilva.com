---
title: "MFA on Email Is Not Enough"
date: 2026-06-18
category: "IT & MSP"
tags: ["mfa", "security", "authentication", "smb"]
image: "/images/blog/17.jpg"
excerpt: "MFA on email blocked the attacker. The same password with no MFA on cloud storage let them in for two days. Why MFA belongs everywhere, and which method to use."
---

I read an example that I believe is worth sharing. A manager called their I.T. after one of their employees received a password reset email they did not request. Someone had the employee's password and was trying to get in. The email account had MFA enabled. The attacker failed. End of story.

Except it was not the end of the story.

The same password was being used on their cloud storage account. That account did not have MFA. The attacker got in, found client files, and spent two days quietly reviewing them before anyone noticed the unusual login location flag in the access logs.

MFA on email saved the email. MFA missing everywhere else cost them two days of silent exposure and a very uncomfortable conversation with clients.

Multi-factor authentication is the single most effective account security control available to small businesses. Microsoft's own data shows it blocks over 99% of automated account attacks. That number is not an argument for doing it on email. It is an argument for doing it everywhere.

Here is how MFA actually works. When you log in with just a username and password, the only thing standing between an attacker and your account is that password. If they have it, through phishing, credential stuffing, a breach on another site, or guessing, they are in. MFA adds a second requirement: something you physically have. A code generated on your phone, a push notification to an app you approve, or a hardware key that must be present. An attacker with your password but not your device cannot complete the login.

## Where MFA matters most

The systems that need MFA, in rough priority order for a small business:

Email is first because email is the master key. Password resets for almost every other account go to email. If an attacker controls your email, they can reset every other password and lock you out of everything.

Cloud storage is second. Platforms like OneDrive, Google Drive, Dropbox, and SharePoint hold your actual files. An attacker with access to cloud storage can read, copy, or delete data without touching any device on your network.

Accounting and finance software is third. QuickBooks Online, Xero, Bill.com, your bank's online portal. These are obvious high-value targets. Most support MFA and most businesses have not turned it on.

Remote access tools are fourth. RDP, VPN, remote management tools. These give an attacker a direct path onto your network. Unprotected remote access is one of the most common entry points in ransomware attacks. If you have any form of remote access enabled, MFA is non-negotiable.

CRM and project management tools often hold client data that is valuable even without direct financial access. Turn on MFA here too.

## Not all MFA is equal

SMS text codes, where a six-digit code is sent to your phone via text, are the most common and the least secure. They can be intercepted through SIM swapping, where an attacker convinces your mobile carrier to transfer your phone number to a SIM they control. This is not a theoretical attack, it happens to business owners regularly.

Authenticator apps are significantly better. Microsoft Authenticator, Google Authenticator, and Authy generate time-based one-time passwords (TOTP) that expire after 30 seconds. They work without a network connection. The codes live on the device, not in a text message. An attacker cannot intercept them without physical access to your phone.

For the highest-risk accounts, administrator accounts, finance systems, executive email, hardware security keys are the strongest option. A hardware key is a physical device, roughly the size of a USB drive, that you plug in or tap to your phone to complete a login. Popular options include YubiKey and Google Titan Key. These keys use a cryptographic protocol called FIDO2 that is resistant to phishing, even if an attacker tricks you into entering your password on a fake website, they cannot use the key because the key validates the real domain.

## The rollout plan

Start with email and cloud storage this week. Add accounting software and remote access next week. Set a 30-day deadline to have MFA enabled on every system that supports it. After 30 days, audit the list and confirm nothing was missed.

One note for business owners with employees: make it easy for your team to adopt authenticator apps. Send them clear instructions. Offer a short group walkthrough. The five minutes you spend walking someone through setting up Microsoft Authenticator are well spent. If the process is confusing, people resist it, and adoption stalls.

At CIO Landing, we guide our clients to use SSO, passwordless single sign-on, the best way for an employee to give out their password is to not have one to begin with.

MFA is not perfect. Determined attackers have methods to work around it, particularly against SMS-based codes. But it closes the vast majority of the doors that are actually being tried. An attacker who hits MFA on your email, your storage, and your accounting software will move on to an easier target. That is the practical goal.
