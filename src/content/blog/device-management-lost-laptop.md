---
title: "What Happens When the Laptop Does Not Come Back"
date: 2026-06-20
category: "IT & MSP"
tags: ["device management", "encryption", "mdm", "security"]
image: "/images/blog/18.jpg"
excerpt: "A laptop bag gets left on a train. The drive was not encrypted and there was no way to wipe it. Two controls keep a lost device costing you hardware and nothing more."
---

A laptop bag gets left on a train. The employee notices at the office, an hour later. Inside that bag is a company laptop with email, client files, and access to internal systems.

Here is the part that turns a bad morning into an expensive problem. The drive was not encrypted. There was no device management in place. So there was no way to lock or wipe it from a distance. Whoever found it could read everything on it.

That company filed a police report and notified affected clients. Their attorney checked whether the loss triggered a breach notification requirement under their state's data privacy law. It did. Letters went out. The cost and the embarrassment came from one gap: a laptop that left the office every day had no protection for the day it did not come back.

I use this example with owners because the fix is simple, and most small businesses have it half done or not done at all. Two controls cover this scenario.

## Encrypt the drive

Drive encryption means the data on the drive cannot be read without the login credentials. If someone picks up a lost laptop and tries to boot it from a USB drive, or pulls the hard drive and connects it to another machine, they get nothing readable. The encryption key is tied to the device and the login. Without the right credentials, the data is unreadable.

On Windows this is BitLocker. On Mac it is FileVault. Both are built into the operating system at no extra cost. Both run quietly in the background once enabled. Setup takes about 15 minutes per machine, plus a few hours for the initial encryption to finish, which also runs in the background.

One note on recovery keys. When you turn on BitLocker or FileVault, the system creates a recovery key, a long code that can unlock the drive if the user forgets the password or the device has a hardware problem. Store those keys in a central place your I.T. administrator controls, not on the encrypted device itself. Microsoft 365 and Intune can store BitLocker recovery keys for you. If you manage this by hand, a password manager with an admin vault works.

## Manage the device

Mobile Device Management, or MDM, is software that lets you manage company devices from one console. It shows you which devices exist, what software is installed, whether encryption is on, and when each device last checked in. It also lets you act on a device from a distance.

Two actions matter here. Remote lock forces the device to require a password so no one can use it. Remote wipe erases everything on it. When the employee on the train reports the lost laptop, you open the MDM console, find the device, and send a wipe command. The next time that laptop connects to the internet, at the station, at someone's home, anywhere, it wipes itself. The hardware is still gone. The data is safe.

For small businesses, Microsoft Intune comes with Microsoft 365 Business Premium, which many companies already pay for. If you have Business Premium and have not set up Intune, you are paying for a capability you are not using. For companies without Microsoft 365, Apple Business Manager with Jamf Now covers Mac and iPhone fleets. Neither one needs full-time I.T. staff to run.

MDM earns its place beyond the lost laptop. You can see which devices are behind on updates, push software out, enforce screen locks and password rules, and cut off access the moment someone leaves. That last point applies to offboarding. A device enrolled in MDM can be wiped and reset for the next employee in minutes, with no need to collect it and rebuild it by hand.

At CIO Landing, we can get encryption turned on and MDM deployed across ten laptops in a day or two. After that the upkeep is light.

## The cost of skipping it

The cost stays invisible until something goes missing. Breach notification laws in most US states require you to tell affected people when their data was on a lost or stolen device that was not encrypted. Legal fees, notification costs, reputational damage, and in regulated industries possible fines add up fast.

The employee who left the bag on the train was not careless. People lose things. You cannot prevent every lost device. You can make sure a lost device costs you hardware and nothing more.
