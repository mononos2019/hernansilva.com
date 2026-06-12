---
title: "The Wi-Fi Password Nobody Has Changed in Years"
date: 2026-06-12
category: "IT & MSP"
tags: ["wifi", "network security", "security", "smb"]
image: "/images/blog/13.jpg"
excerpt: "That password on the sticky note has not changed since the router was installed. Former employees still have it, and they are on the same network as your server."
---

Walk into almost any small business office and ask for the Wi-Fi password. Someone will either point to the wall where it is written on a sign, or they will read it off a sticky note on the front desk.

That password has probably not changed since the router was installed. Former employees still have it. Every vendor who visited last year has it. The intern from three summers ago has it. And all of those people, plus every device they connect, are on the same network as your server, your accounting software, and your company files.

Wi-Fi security is one of the most neglected areas in small business I.T., and it is one of the easiest to fix.

## Segment the network

The starting point is network segmentation. This means creating separate Wi-Fi networks for different groups of users, so that a device on one network cannot reach devices or data on another. Most business-grade routers and access points support this natively. Even many consumer-grade routers do.

The minimum setup for a small business:

A private business network for company-owned devices: workstations, servers, printers, phones enrolled in the company's device management system. This network should have a strong, unique password known only to employees. Change it when someone leaves.

A guest network for visitors, clients, vendors, and personal devices. This network gets internet access only. It cannot see or reach anything on the business network. Devices on the guest network are isolated from each other as well, so one compromised device cannot attack another. The password for this network can be shared freely.

If you have devices like smart TVs, building security cameras, or IoT equipment, thermostats, door locks, that kind of thing, put those on a third network or on the guest network, separate from your business systems. IoT devices are frequently poorly secured and make easy entry points if they share a network with your workstations.

## Lock down the router

The router itself is worth attention. Most small business routers ship with default administrator credentials, often something like "admin" for both username and password. These defaults are published by manufacturers and are widely known. If someone gets on your network and the router still has default credentials, they can log into the router's admin panel and control all traffic flowing through it, redirecting it, reading it, or blocking it.

Log into your router's admin panel today, verify the admin password has been changed from the default, and while you are there, check the firmware version against the manufacturer's current release. Router firmware updates often include security patches. Most small business routers have an automatic firmware update option in the settings. Turn it on if it is not already active.

One more thing: the physical router. It should be in a locked room or closet, not sitting in an open hallway. A physical reset button on the back of a router can restore it to factory settings, wiping any custom configuration and, critically, resetting it to default credentials. Someone with 30 seconds of physical access and a paperclip can undo your network security. Keep the hardware behind a locked door.

## Protect remote workers

For businesses with multiple locations, remote workers, or any situation where employees connect from outside the office, a VPN adds another layer of protection. A VPN creates an encrypted tunnel between the employee's device and the company network, so that traffic cannot be read even if the employee is on an untrusted public Wi-Fi network. This is increasingly standard for small businesses with any remote work component.

For VPN, CIO Landing is replacing it with SASE (Secure Access Service Edge), which is more secure, faster, and more stable than VPN.

The full picture: a segmented network with separate business and guest SSIDs, a strong router admin password, current firmware, physical security for the hardware, and a VPN for remote workers. None of it requires expensive equipment. Most of it can be done on the router you already have.

If you are not sure what your current network setup looks like, ask your I.T. provider to document it. A basic network diagram that shows what is connected to what, which VLANs or SSIDs exist, and what the password rotation schedule is gives you a baseline to work from. Without that baseline, you are managing a network you cannot fully see.
