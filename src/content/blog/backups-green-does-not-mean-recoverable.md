---
title: "Your Backup Says Green. That Does Not Mean It Works."
date: 2026-06-10
category: "IT & MSP"
tags: ["backups", "disaster recovery", "security", "smb"]
image: "/images/blog/11.jpg"
excerpt: "A backup had been failing silently for seven months. The dashboard showed green the whole time. Why green is not the same as recoverable, and what to check."
---

A prospect called us on a Tuesday afternoon. Their server had failed. A drive had died, taking years of project files with it.

They had a backup. They were sure of it. Their I.T. person had set it up two years earlier. The problem: nobody had checked it since. When we ran the restore, the backup software had been failing silently for seven months. Error logs nobody read. Scheduled jobs that ran, showed green, and wrote nothing recoverable. Seven months of work was simply gone.

That story is not unusual. It is probably the most common version of a data loss event we encounter. Not ransomware, not a sophisticated attack, just a backup that stopped working and nobody noticed.

Backups have a trust problem. People set them up, feel good about it, and stop thinking about them. The work happens in the background. When the dashboard shows green, people move on. But "green" on a backup dashboard means the job ran. It does not mean the data is actually recoverable. Those are two different things.

## The 3-2-1 rule

The industry standard framework for backup design is called 3-2-1. Three copies of your data. Two on different storage types (local and cloud, for example). One stored offsite or air-gapped, meaning it cannot be reached by the same ransomware that might encrypt your primary systems. The logic is simple: any single failure, hardware, human error, or attack, should not be able to reach all three copies simultaneously.

For a small business, this looks like: your data lives on a local server or workstations. An automated backup runs nightly to a local network-attached storage (NAS) device. That same backup replicates to a cloud storage provider. The cloud copy is in a separate account with separate credentials, so a compromised main account cannot delete the backup.

Here is what most small businesses actually have: their data lives on one machine, it syncs to OneDrive or Google Drive, and they call that a backup. It is not. Cloud sync is not a backup. If you delete a file, or ransomware encrypts it, the sync propagates that change to the cloud. You now have three copies of nothing.

## The questions every owner should be able to answer

What specific systems and folders are covered by our backup? "Everything" is not an answer. Name the systems, the databases, the file shares.

How often does the backup run? Daily is the minimum for most businesses. Some financial and medical clients require incremental hourly backups.

How long would a full restore take from scratch? This is called your RTO, recovery time objective. If the answer is three days and your business cannot operate without its data, you have a problem even if the backup works perfectly.

When did someone last do a test restore? Not a restore from a recent backup to check a file, a full test where you simulate a disaster, restore to a separate environment, and confirm that systems come back up correctly. This should happen at least once a year. Quarterly is better.

Who gets notified when the backup fails? Someone needs to own that alert. If it goes to a shared inbox nobody checks, it is not owned.

Running through those questions with your I.T. team or MSP takes about 30 minutes. The answers will tell you quickly whether your backup is a real safety net or a documented belief that you are protected.

## One thing to do today

Log into your backup software, pull the last 30 days of job logs, and look for any failed or incomplete jobs. If you do not know how to do that, ask your I.T. provider to pull it for you and explain what you are looking at. That review, done once, will tell you more about the actual state of your data protection than any marketing brochure for the backup product you are using.

The client who lost seven months of data recovered most of it eventually, through painstaking forensic work on the original failed drive. It took three weeks and cost more than two years of proper backup service would have. They now test their restore quarterly. They also know exactly which jobs are running, which alerts are active, and who gets notified when something fails.

That knowledge did not come free. You can get it cheaper.
