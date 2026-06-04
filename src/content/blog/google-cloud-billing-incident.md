---
title: "The Google Cloud Billing Incident"
date: 2026-06-03
category: "AI & Automation"
tags: ["google cloud", "ai", "billing", "api"]
image: "/images/blog/1.jpg"
excerpt: "I assumed our credit card limit would protect us from a runaway API bill. It did not. Here is what actually stops the meter."
---

I got a surprise bill from Google Cloud. Not a small one.

We had used an AI to set up some API connections. The problem: they went live without guardrails. No usage caps, no scoping, nothing to stop them from running freely.

Here is what I got wrong. I assumed our credit card limit protected us. It did not. The Google API was set to run now and invoice later, not prepay. A card limit does not cap what you can rack up. The service keeps answering requests and bills you after the fact, limit or no limit. By the time I caught it, the charges had been accumulating for weeks.

Here is what I changed:

- Anything an AI sets up now gets guardrails before it goes live: a defined scope, a hard usage cap, and a human sign-off.
- Hard quota limits are set on the APIs themselves, so usage cannot run unbounded even if I miss an alert.
- I documented which of our services bill prepaid versus in arrears, because that distinction is the whole game.

Most people assume that a card limit, or an alert they set up once, is a safety net. Often it is neither.

If you run anything on Claude, Google Cloud, AWS, or Azure, or you let an AI agent touch billable APIs, check two things today: is each service prepaid or invoiced, and does anything you have automated have a hard cap, not just an alert. It takes ten minutes and could save you a real number.
