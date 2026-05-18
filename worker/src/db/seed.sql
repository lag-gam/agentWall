-- AgentFence Seed Data
-- ~100 fake emails + 4 fake files for demo purposes

-- ============================================================
-- FAKE EMAILS
-- ============================================================

-- === INBOX: Normal work emails ===

INSERT INTO fake_emails (from_address, to_address, subject, body, date, is_read, labels, has_attachment)
VALUES
('sarah.chen@acme.com', 'alex.morgan@acme.com', 'Q3 Planning Meeting — Thursday 2pm',
'Hi Alex,

Just a reminder that we have the Q3 planning meeting this Thursday at 2pm in Conference Room B. Please bring your updated roadmap slides and any blockers you want to discuss.

Agenda:
1. Review Q2 results
2. Q3 OKR proposals
3. Headcount planning
4. Open discussion

Let me know if you have any additions to the agenda.

Best,
Sarah', '2024-07-15T09:23:00Z', 1, '["inbox"]', 0),

('david.kim@acme.com', 'alex.morgan@acme.com', 'Re: API rate limiting issue',
'Hey Alex,

I looked into the rate limiting issue you flagged. Turns out our Redis cache was misconfigured after the last deploy. The TTL was set to 60 seconds instead of 600, causing way more cache misses than expected.

I''ve pushed a fix to staging. Can you verify on your end before we roll to prod?

Thanks,
David', '2024-07-15T11:45:00Z', 1, '["inbox"]', 0),

('jennifer.wu@acme.com', 'alex.morgan@acme.com', 'Design review feedback — Dashboard v2',
'Hi Alex,

Attached are my notes from the design review yesterday. Overall the direction looks great, but I have a few concerns about the data density on the main dashboard view. Some specific callouts:

- The metrics cards feel cramped on smaller screens
- Could we add a date range picker to the top-level filter bar?
- The color palette for the charts needs to pass WCAG AA contrast ratios

Happy to sync live if you want to walk through these.

Cheers,
Jennifer', '2024-07-14T16:30:00Z', 1, '["inbox"]', 1),

('mark.thompson@acme.com', 'alex.morgan@acme.com', 'Prod incident — elevated error rates',
'URGENT: We''re seeing elevated 5xx error rates on the payments service since ~3:15pm UTC. Error rate jumped from 0.1% to 4.7%. The on-call team is investigating.

Current hypothesis: the new connection pooling config deployed at 3:00pm may be exhausting DB connections under load.

Action items:
- Rollback deploy if not resolved in 15 min
- Page the database team
- Update status page

Please join #incident-2024-0715 in Slack.

Mark', '2024-07-15T15:22:00Z', 0, '["inbox"]', 0),

('rachel.patel@acme.com', 'alex.morgan@acme.com', 'PTO Request — Aug 5-9',
'Hi Alex,

I''d like to request PTO for August 5th through August 9th. I''ve already coordinated with David to cover my on-call shift that week, and I''ll make sure all my PRs are reviewed and merged before I leave.

My current sprint items should all be completed by Aug 2nd. Let me know if there are any concerns.

Thanks,
Rachel', '2024-07-12T10:15:00Z', 1, '["inbox"]', 0),

('mike.jones@acme.com', 'alex.morgan@acme.com', 'Lunch tomorrow?',
'Hey Alex, want to grab lunch tomorrow? I was thinking that new ramen place on 5th Street. I heard their tonkotsu is amazing. Let me know!

Mike', '2024-07-14T17:02:00Z', 1, '["inbox"]', 0),

('hr@acme.com', 'alex.morgan@acme.com', 'Action Required: Complete Annual Compliance Training',
'Dear Alex Morgan,

This is a reminder that your annual compliance training is due by July 31, 2024. Please complete the following modules in the LMS portal:

1. Information Security Awareness (30 min)
2. Anti-Harassment Training (45 min)
3. Code of Conduct Review (15 min)
4. Data Privacy & GDPR (20 min)

Failure to complete by the deadline may result in restricted system access.

Thank you,
Human Resources', '2024-07-10T08:00:00Z', 0, '["inbox"]', 0),

('lisa.chang@partner-corp.com', 'alex.morgan@acme.com', 'Re: Integration timeline',
'Hi Alex,

Thanks for sending over the API docs. Our team has reviewed them and we have a few questions:

1. Is the webhook retry policy configurable per-endpoint?
2. What''s the max payload size for batch operations?
3. Do you support mutual TLS for the production endpoints?

We''re targeting an August launch on our side, so it would be great to get answers this week if possible.

Best regards,
Lisa Chang
Partner Corp - Technical Integrations', '2024-07-15T13:10:00Z', 0, '["inbox"]', 0),

('no-reply@github.com', 'alex.morgan@acme.com', '[acme/platform] PR #1247: Fix connection pool exhaustion',
'david-kim requested your review on PR #1247

Fix connection pool exhaustion under high concurrency

This PR addresses the root cause of incident INC-2024-0715. Changes:
- Increase max pool size from 20 to 50
- Add connection timeout of 5s (was unlimited)
- Add pool exhaustion metric to Datadog dashboard
- Add integration test for concurrent connection handling

+147 -23 across 4 files

View on GitHub: https://github.com/acme/platform/pull/1247', '2024-07-15T18:45:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'team@acme.com', 'Team update — Week of July 15',
'Hi team,

Quick update for this week:

Shipped:
- Dashboard v2 beta is live for internal users
- Rate limiting fix deployed to staging
- New onboarding flow A/B test started

In Progress:
- Partner Corp integration (targeting Aug launch)
- Performance optimization sprint
- Q3 planning (meeting Thursday)

Blockers:
- Need design sign-off on dashboard mobile views
- Waiting on legal review for partner DPA

Have a great week!
Alex', '2024-07-15T08:00:00Z', 1, '["inbox", "sent"]', 0),

('noreply@jira.acme.com', 'alex.morgan@acme.com', '[PLAT-4521] Story moved to In Review',
'Rachel Patel moved PLAT-4521 to In Review

Story: Implement batch export API endpoint
Assignee: Rachel Patel
Sprint: Sprint 24-14
Story Points: 5

Comment from Rachel:
"Ready for review. Added pagination support and CSV export format. Tests are all green. Please check the error handling for large datasets."

View in Jira: https://jira.acme.com/browse/PLAT-4521', '2024-07-15T14:30:00Z', 0, '["inbox", "updates"]', 0),

('facilities@acme.com', 'all-sf@acme.com', 'Office Notice: HVAC Maintenance July 18',
'Hi everyone,

Please be advised that we will be performing scheduled HVAC maintenance on Thursday, July 18th from 6pm to 10pm. The 3rd floor may experience reduced cooling during this time.

If you are planning to work late on Thursday, please consider working from home or relocating to floors 1 or 2.

We apologize for any inconvenience.

Facilities Team', '2024-07-15T10:00:00Z', 1, '["inbox"]', 0),

('cfo@acme.com', 'all-engineering@acme.com', 'FY2024 Budget Adjustments',
'Dear Engineering Team,

As part of our mid-year review, we are making some adjustments to the FY2024 budget. Key changes that affect engineering:

- Cloud infrastructure budget increased by 15% to support scaling initiatives
- Conference/travel budget reduced by 20% — please prioritize virtual attendance where possible
- Training budget maintained at current levels
- New tool procurement requires VP approval for purchases over $5,000

Detailed breakdown is attached. Please direct questions to your department lead.

Best regards,
Patricia Alvarez
CFO', '2024-07-11T09:30:00Z', 1, '["inbox"]', 1),

('recruiter@acme.com', 'alex.morgan@acme.com', 'Interview panel — Senior Backend Engineer candidate',
'Hi Alex,

You''re scheduled as a panel interviewer for a Senior Backend Engineer candidate on July 22nd at 1pm.

Candidate: James Wilson
Focus area: System design round (45 min)
Resume and interview guide are attached.

Please review the candidate''s background before the interview. Let me know if you have any scheduling conflicts.

Thanks,
Talent Team', '2024-07-16T08:45:00Z', 0, '["inbox"]', 1),

('security@acme.com', 'all-engineering@acme.com', 'Mandatory: Rotate your API keys by July 31',
'Engineering Team,

As part of our quarterly security rotation policy, all personal API keys and service account tokens must be rotated by July 31, 2024.

Steps:
1. Go to https://internal.acme.com/settings/api-keys
2. Revoke all keys issued before July 1
3. Generate new keys
4. Update any local .env files or CI/CD configs

Keys not rotated by the deadline will be automatically revoked.

Security Team', '2024-07-08T11:00:00Z', 1, '["inbox", "updates"]', 0),

('ben.foster@acme.com', 'alex.morgan@acme.com', 'Quick question about the caching layer',
'Hey Alex,

I''m working on the search optimization and wondering if we should use the existing Redis cluster or spin up a dedicated Elasticsearch cache. The current Redis instance is already at ~70% memory utilization.

What do you think? I can put together a quick comparison doc if that helps.

Ben', '2024-07-14T11:20:00Z', 1, '["inbox"]', 0),

('alex.morgan@acme.com', 'ben.foster@acme.com', 'Re: Quick question about the caching layer',
'Hey Ben,

Good question. I''d lean toward a dedicated instance for search — mixing concerns in the same Redis cluster has bitten us before (see the rate limiting incident last week).

Let''s set up a 30-min call to sketch out the architecture. How''s Wednesday afternoon look?

Alex', '2024-07-14T11:48:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'sarah.chen@acme.com', 'Re: Q3 Planning Meeting — Thursday 2pm',
'Hi Sarah,

Sounds good. I''ll have my roadmap slides ready. Can we also add 10 minutes to discuss the Partner Corp integration timeline? Lisa from their team has been asking about our webhook retry policy and I want to make sure we''re aligned before committing to dates.

Thanks,
Alex', '2024-07-15T09:45:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'rachel.patel@acme.com', 'Re: PTO Request — Aug 5-9',
'Hi Rachel,

Approved! Enjoy your time off. Thanks for coordinating coverage with David ahead of time — really appreciate the proactive planning.

Alex', '2024-07-12T10:30:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'lisa.chang@partner-corp.com', 'Re: Integration timeline',
'Hi Lisa,

Great questions. Here are the answers:

1. Yes, webhook retry policy is configurable per-endpoint. You can set max retries (1-10) and backoff strategy (linear or exponential) via the dashboard.
2. Max payload for batch ops is 10MB. We recommend keeping individual batch sizes under 1000 records for optimal performance.
3. Yes, we support mTLS in production. I''ll send you the cert provisioning guide separately.

Let me know if you need anything else. We''re excited about the August launch!

Best,
Alex', '2024-07-15T14:00:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'david.kim@acme.com', 'Re: API rate limiting issue',
'Nice catch, David. I verified on staging and the fix looks good — cache hit rate is back up to ~95%.

Let''s roll it to prod during the next deploy window. I''ll update the runbook with the correct TTL values so this doesn''t happen again.

Alex', '2024-07-15T12:15:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'jennifer.wu@acme.com', 'Re: Design review feedback — Dashboard v2',
'Hi Jennifer,

Thanks for the thorough feedback. I agree on all three points:

1. Metrics cards — I''ll work with the frontend team to add a responsive breakpoint at 768px
2. Date range picker — great call, adding to the sprint
3. Color palette — will run the Stark accessibility check and update

Can we do a follow-up review next Tuesday?

Alex', '2024-07-14T17:15:00Z', 1, '["sent"]', 0),

('alex.morgan@acme.com', 'mark.thompson@acme.com', 'Re: Prod incident — elevated error rates',
'On it. Joining the incident channel now. I''ll coordinate the rollback if needed.

Alex', '2024-07-15T15:25:00Z', 1, '["sent"]', 0),

('noreply@slack.com', 'alex.morgan@acme.com', 'Slack digest: 5 unread messages in #engineering',
'You have unread messages in channels you follow:

#engineering (3 new)
- david.kim: Deployed hotfix for connection pooling. Monitoring dashboards look stable.
- rachel.patel: Batch export PR is ready for review: #1248
- mark.thompson: Incident resolved. RCA will be shared by EOD tomorrow.

#random (2 new)
- mike.jones: Anyone up for board game night this Friday?
- sarah.chen: There''s leftover pizza in the 3rd floor kitchen

View in Slack: https://acme.slack.com', '2024-07-15T19:00:00Z', 0, '["inbox", "updates"]', 0),

('noreply@datadog.com', 'alex.morgan@acme.com', '[Alert Resolved] High error rate on payments-service',
'Alert Resolved

Monitor: High error rate on payments-service
Status: Recovered
Duration: 47 minutes
Triggered: 2024-07-15 15:15 UTC
Resolved: 2024-07-15 16:02 UTC

The error rate for payments-service has returned to normal levels (0.08%). The alert threshold of 1% is no longer being exceeded.

View monitor: https://app.datadoghq.com/monitors/12345678', '2024-07-15T16:05:00Z', 0, '["inbox", "updates"]', 0),

('noreply@linear.app', 'alex.morgan@acme.com', '[Acme] 3 issues assigned to you',
'You have 3 issues assigned to you that are due this sprint:

1. PLAT-4530: Update API docs for v2 endpoints — Due Jul 19
2. PLAT-4535: Review and approve Partner Corp DPA — Due Jul 18
3. PLAT-4540: Performance benchmarks for batch export — Due Jul 22

View your issues: https://linear.app/acme/my-issues', '2024-07-16T07:00:00Z', 0, '["inbox", "updates"]', 0),

('emily.ross@acme.com', 'alex.morgan@acme.com', 'Customer escalation — Globex Corp',
'Hi Alex,

Globex Corp is experiencing intermittent timeouts on our batch API. They''re one of our top 10 accounts and their renewal is coming up in September. Their CTO personally emailed our VP of Sales about this.

Can you prioritize looking into this? I''ve attached their support ticket with request IDs and timestamps.

Thanks,
Emily Ross
Customer Success', '2024-07-16T09:15:00Z', 0, '["inbox"]', 1),

('peter.walsh@acme.com', 'alex.morgan@acme.com', 'Architecture RFC: Event sourcing migration',
'Hi Alex,

I''ve drafted an RFC for migrating our order processing pipeline to event sourcing. The doc covers:

- Current pain points with the CRUD model
- Proposed event store architecture (using EventStoreDB)
- Migration strategy (dual-write period of ~4 weeks)
- Performance projections
- Cost analysis

Would love your review by end of week. The RFC is in Google Docs — I''ve shared it with you directly.

Thanks,
Peter', '2024-07-13T14:00:00Z', 1, '["inbox"]', 0),

('alex.morgan@acme.com', 'peter.walsh@acme.com', 'Re: Architecture RFC: Event sourcing migration',
'Peter,

Read through the RFC — really solid work. A few high-level thoughts:

1. Love the dual-write approach for migration safety
2. Concerned about the EventStoreDB licensing costs at our projected scale. Have we looked at Kafka + custom projections as an alternative?
3. The 4-week migration window feels tight for our test coverage. Can we extend to 6?

Let''s discuss in the architecture meeting on Monday.

Alex', '2024-07-14T09:30:00Z', 1, '["sent"]', 0),

('julia.martinez@acme.com', 'alex.morgan@acme.com', 'New hire starting July 22 — your team',
'Hi Alex,

Quick heads up: Priya Sharma will be joining your team as a Software Engineer on July 22nd. Here''s what we need from you:

- Assign a buddy/mentor from the team
- Prepare first-week onboarding tasks
- Schedule 1:1 for her first day (30 min)
- Ensure she has access to all team repos and channels

Her equipment has been ordered and will be at her desk on start day. She''s coming from Stripe, so she has strong payments domain experience.

Best,
Julia
Engineering Operations', '2024-07-16T10:00:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'julia.martinez@acme.com', 'Re: New hire starting July 22 — your team',
'Julia,

Excellent! I''ll assign David Kim as her buddy since they''ll be working on the same team. I''ll have the onboarding checklist ready by Friday.

The payments domain experience is a huge plus — we can ramp her up on the Partner Corp integration quickly.

Alex', '2024-07-16T10:20:00Z', 1, '["sent"]', 0),

('noreply@aws.amazon.com', 'alex.morgan@acme.com', 'AWS Cost Anomaly Detection Alert',
'An anomaly was detected in your AWS account.

Account: acme-production (123456789012)
Service: Amazon RDS
Anomaly period: July 14-15, 2024
Expected daily cost: $142.50
Actual daily cost: $387.20
Impact: +$244.70 (+172%)

Root cause analysis suggests increased read replica usage. Review your RDS instances in the AWS Console.

View details: https://console.aws.amazon.com/cost-management/home', '2024-07-16T06:00:00Z', 0, '["inbox", "updates"]', 0),

('tom.nguyen@acme.com', 'alex.morgan@acme.com', 'Can you review my promotion packet?',
'Hey Alex,

I''m putting together my promotion packet for the next review cycle. Would you be willing to review it and give feedback? You''ve seen most of my work this year and I''d really value your perspective.

No rush — the deadline isn''t until August 15th. I can send it over whenever you have bandwidth.

Thanks,
Tom', '2024-07-13T16:45:00Z', 1, '["inbox"]', 0),

('alex.morgan@acme.com', 'tom.nguyen@acme.com', 'Re: Can you review my promotion packet?',
'Tom,

Absolutely, happy to help! Send it over whenever it''s ready. I''d suggest highlighting the observability improvements you led in Q2 — that was a huge impact across the org.

Alex', '2024-07-13T17:00:00Z', 1, '["sent"]', 0),

('admin@acme.com', 'all@acme.com', 'Company All-Hands: July 25 at 4pm PT',
'Hi everyone,

Please join us for the monthly All-Hands meeting:

Date: Thursday, July 25, 2024
Time: 4:00 PM Pacific
Location: Main auditorium + Zoom (link in calendar invite)

Agenda:
- CEO update on H2 strategy
- Product launches recap
- Engineering spotlight: Platform reliability improvements
- Q&A

A recording will be available for those who can''t attend live.

Thanks,
Admin Team', '2024-07-16T12:00:00Z', 0, '["inbox"]', 0),

('carol.davis@acme.com', 'alex.morgan@acme.com', 'Legal review complete — Partner Corp DPA',
'Hi Alex,

Legal has finished reviewing the Data Processing Agreement with Partner Corp. We''ve approved it with two minor redline changes:

1. Section 4.2: Changed data retention period from 90 days to 60 days
2. Section 7.1: Added mutual audit rights clause

The updated document is attached. Please forward to Lisa at Partner Corp for their review and signature.

Let me know if you have questions.

Carol Davis
Legal — Commercial Contracts', '2024-07-16T14:30:00Z', 0, '["inbox"]', 1),

('alex.morgan@acme.com', 'lisa.chang@partner-corp.com', 'Partner Corp DPA — legal review complete',
'Hi Lisa,

Our legal team has completed the DPA review. Attached is the redlined version with two minor changes (data retention period and audit rights). Happy to jump on a call to walk through them if needed.

Once you''re comfortable, we can move to e-signatures. Targeting next week to have this finalized so we stay on track for the August launch.

Best,
Alex', '2024-07-16T15:00:00Z', 1, '["sent"]', 1),

('it-support@acme.com', 'alex.morgan@acme.com', 'Ticket #IT-8834 Resolved: VPN access issue',
'Hi Alex,

Your IT support ticket #IT-8834 has been resolved.

Issue: Unable to connect to VPN from home network
Resolution: Updated your VPN client profile to use the new gateway endpoint. The old endpoint was decommissioned on July 10th.

Please test the connection and reopen the ticket if you still experience issues.

IT Support Team', '2024-07-12T13:00:00Z', 1, '["inbox", "updates"]', 0),

('no-reply@zoom.us', 'alex.morgan@acme.com', 'Cloud recording available: Engineering Sync',
'Hi Alex Morgan,

Your cloud recording is now available:

Meeting: Engineering Sync
Date: July 15, 2024
Duration: 52 minutes
Participants: 8

View recording: https://zoom.us/rec/share/example-link

This recording will be available for 30 days.

Zoom', '2024-07-15T17:30:00Z', 0, '["inbox", "updates"]', 0),

('sarah.chen@acme.com', 'alex.morgan@acme.com', 'Updated Q3 OKRs — please review',
'Hi Alex,

I''ve updated the Q3 OKR doc based on Thursday''s planning session. Key changes:

KR1: API p99 latency from 500ms -> 200ms (was 300ms)
KR2: Onboard 3 new integration partners (unchanged)
KR3: Reduce infrastructure costs by 15% (new)
KR4: Zero P0 incidents lasting >30min (unchanged)

Please review and confirm these align with what we discussed. I need to submit to leadership by Monday.

Sarah', '2024-07-18T10:30:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'sarah.chen@acme.com', 'Re: Updated Q3 OKRs — please review',
'Sarah,

Looks good overall. One concern: the latency target of 200ms is aggressive given our current architecture. Can we make it 250ms and add a stretch goal of 200ms? That way we don''t set ourselves up for failure on the main KR.

Everything else LGTM.

Alex', '2024-07-18T11:00:00Z', 1, '["sent"]', 0),

('noreply@circleci.com', 'alex.morgan@acme.com', '[acme/platform] Build #8847 failed on main',
'Build #8847 on main has failed.

Branch: main
Commit: abc1234 — "Update connection pool config"
Author: David Kim
Failed job: integration-tests

Error summary:
TestBatchExport_LargeDataset — timeout after 300s
TestWebhookRetry_ExponentialBackoff — assertion error on retry count

View build: https://app.circleci.com/pipelines/github/acme/platform/8847

This is a notification from CircleCI.', '2024-07-16T03:15:00Z', 0, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'emily.ross@acme.com', 'Re: Customer escalation — Globex Corp',
'Emily,

I looked at the request IDs from the support ticket. The timeouts are caused by their batch sizes exceeding our recommended limit. They''re sending batches of 5000+ records when our docs recommend <1000.

Two options:
1. We increase their rate limit (quick fix, not ideal long-term)
2. They implement client-side batching to chunk requests

Can you schedule a call with their engineering team? I''m happy to join and walk them through best practices.

Alex', '2024-07-16T10:30:00Z', 1, '["sent"]', 0),

('priya.sharma@gmail.com', 'alex.morgan@acme.com', 'Excited to join the team!',
'Hi Alex,

I''m Priya Sharma and I''ll be joining your team on July 22nd. I''m really excited to get started! Julia mentioned you''d be my manager.

Is there anything I should read up on or prepare before my first day? I''d love to hit the ground running.

Looking forward to working with you!

Best,
Priya', '2024-07-17T09:00:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'priya.sharma@gmail.com', 'Re: Excited to join the team!',
'Hi Priya,

Welcome! We''re thrilled to have you on board. Here are a few things to get you started:

1. Skim our API docs at docs.acme.com (no need to memorize — just get familiar)
2. If you''re curious, our main repo is github.com/acme/platform
3. David Kim will be your buddy — he''s great and super helpful

Don''t worry about going too deep before day one. We have a solid onboarding plan ready for you.

See you Monday!
Alex', '2024-07-17T09:30:00Z', 1, '["sent"]', 0),

('noreply@notion.so', 'alex.morgan@acme.com', 'Page updated: Engineering Runbooks',
'David Kim edited "Engineering Runbooks" in your Notion workspace.

Changes:
- Added section: "Rate Limiting Troubleshooting"
- Updated: "Connection Pool Configuration" with correct TTL values
- Added: "Incident Response Checklist v2"

View page: https://notion.so/acme/engineering-runbooks

You are receiving this because you are watching this page.', '2024-07-16T16:00:00Z', 0, '["inbox", "updates"]', 0),

('derek.wong@acme.com', 'alex.morgan@acme.com', 'Coffee chat?',
'Hey Alex,

I''m on the ML team and I''ve been working on some anomaly detection models that might be useful for your platform monitoring. Would you be up for a coffee chat sometime this week to explore potential collaboration?

I''ve seen the Datadog alerts you all get and think we could build something smarter for early incident detection.

Let me know!
Derek', '2024-07-17T11:00:00Z', 0, '["inbox"]', 0),

('payroll@acme.com', 'alex.morgan@acme.com', 'Pay stub available — July 15, 2024',
'Dear Alex Morgan,

Your pay stub for the period ending July 15, 2024 is now available in the ADP portal.

To view your pay details, please log in to:
https://workforcenow.adp.com

If you have questions about your compensation, please contact payroll@acme.com.

This is an automated message.', '2024-07-15T20:00:00Z', 1, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'derek.wong@acme.com', 'Re: Coffee chat?',
'Derek,

That sounds really interesting! We''ve been wanting better anomaly detection for a while — the current static thresholds generate too many false positives.

How about Thursday at 10am? I''ll book the small meeting room on 2nd floor.

Alex', '2024-07-17T11:30:00Z', 1, '["sent"]', 0),

('maria.gonzalez@vendor.io', 'alex.morgan@acme.com', 'Invoice #VND-2024-0892',
'Hi Alex,

Please find attached Invoice #VND-2024-0892 for consulting services rendered in June 2024.

Amount: $12,500.00
Due date: August 1, 2024
Payment terms: Net 30

Please route to accounts payable at your earliest convenience.

Thank you for your continued partnership.

Best regards,
Maria Gonzalez
Vendor.io', '2024-07-10T09:00:00Z', 1, '["inbox"]', 1),

('noreply@sentry.io', 'alex.morgan@acme.com', '[Sentry] New issue: TypeError in batch-processor',
'New issue in project platform-api:

TypeError: Cannot read properties of undefined (reading ''map'')

batch-processor.ts line 147
handleBatchRequest -> processBatchItems -> validateItems

Events: 23 in the last hour
Users affected: 4
First seen: 2024-07-17 14:23 UTC

View issue: https://sentry.io/organizations/acme/issues/987654321/', '2024-07-17T14:30:00Z', 0, '["inbox", "updates"]', 0),

('sam.butler@acme.com', 'engineering-leads@acme.com', 'Reminder: Tech talks resume next week',
'Hi engineering leads,

Just a reminder that our biweekly tech talk series resumes next Wednesday, July 24th at noon.

Schedule for the next few weeks:
- July 24: "Lessons from migrating to gRPC" — Derek Wong
- Aug 7: "Property-based testing in practice" — Rachel Patel
- Aug 21: TBD (accepting proposals!)

If anyone on your team wants to present, please have them fill out the proposal form: https://forms.acme.com/tech-talks

Thanks,
Sam', '2024-07-17T15:00:00Z', 0, '["inbox"]', 0),

('noreply@figma.com', 'alex.morgan@acme.com', 'Jennifer Wu invited you to "Dashboard v2 — Mobile Designs"',
'Jennifer Wu has invited you to view a Figma file:

Dashboard v2 — Mobile Designs
Updated 2 hours ago

Open in Figma: https://figma.com/file/example-id/dashboard-v2-mobile

You were added as a viewer. Request edit access from Jennifer if needed.', '2024-07-18T14:00:00Z', 0, '["inbox", "updates"]', 0);

-- === PROMOTIONS / NEWSLETTERS ===

INSERT INTO fake_emails (from_address, to_address, subject, body, date, is_read, labels, has_attachment)
VALUES
('newsletter@techcrunch.com', 'alex.morgan@acme.com', 'TechCrunch Daily: AI startups raised $4.2B in Q2',
'TECHCRUNCH DAILY — July 15, 2024

TOP STORIES:

AI startups raised $4.2 billion in Q2 2024, marking a 67% increase over Q1. The surge was driven largely by enterprise AI infrastructure companies.

Other headlines:
- Stripe launches new embedded finance toolkit
- Apple reportedly in talks to acquire AR display startup
- Senate committee advances AI transparency bill
- Docker acquires cloud debugging startup

Read more at techcrunch.com

You are receiving this because you subscribed to TechCrunch Daily.
Unsubscribe: https://techcrunch.com/unsubscribe', '2024-07-15T06:00:00Z', 1, '["promotions"]', 0),

('digest@medium.com', 'alex.morgan@acme.com', 'Daily Digest: "Why we ditched microservices"',
'YOUR DAILY DIGEST

Based on your reading history:

1. "Why we ditched microservices and went back to a modular monolith" — 12 min read, 4.5K claps
2. "The hidden cost of Kubernetes at small scale" — 8 min read, 2.1K claps
3. "Building a real-time analytics pipeline with ClickHouse" — 15 min read, 1.8K claps

Read on Medium: https://medium.com/digest

Unsubscribe from digest emails: https://medium.com/settings/notifications', '2024-07-15T07:00:00Z', 1, '["promotions"]', 0),

('hello@substack.com', 'alex.morgan@acme.com', 'The Pragmatic Engineer: "Inside Datadog''s architecture"',
'THE PRAGMATIC ENGINEER
by Gergely Orosz

New post: Inside Datadog''s Architecture

This week we take a deep dive into how Datadog handles 40 trillion data points per day. Topics covered:

- Their custom time-series database
- The ingestion pipeline architecture
- How they achieve sub-second query latency at scale
- Lessons learned from scaling to 26,000+ customers

Read the full post: https://newsletter.pragmaticengineer.com

This email was sent to alex.morgan@acme.com. Unsubscribe here.', '2024-07-14T10:00:00Z', 0, '["promotions"]', 0),

('noreply@linkedin.com', 'alex.morgan@acme.com', 'Alex, 5 people viewed your profile this week',
'LINKEDIN

Hi Alex,

Here''s your weekly update:

- 5 people viewed your profile
- Your post about incident management got 234 impressions
- 3 new connection requests

Job recommendations based on your profile:
- Staff Software Engineer at Stripe — San Francisco
- Engineering Manager at Notion — Remote
- Principal Engineer at Cloudflare — Austin

See who viewed you: https://linkedin.com/me/profile-views

Unsubscribe: https://linkedin.com/settings/email', '2024-07-15T12:00:00Z', 1, '["promotions"]', 0),

('deals@oreilly.com', 'alex.morgan@acme.com', 'New Release: "Designing Data-Intensive Applications" 2nd Edition',
'O''REILLY MEDIA

New Release Alert!

"Designing Data-Intensive Applications" by Martin Kleppmann — 2nd Edition is now available!

Updated with:
- New chapters on stream processing patterns
- Expanded coverage of consensus protocols
- Real-world case studies from 2020-2024
- Updated references and benchmarks

Save 40% with code DDIA2024 at checkout.

Shop now: https://oreilly.com/ddia-2e

Unsubscribe: https://oreilly.com/email-preferences', '2024-07-12T08:00:00Z', 0, '["promotions"]', 0),

('news@hackernewsletter.com', 'alex.morgan@acme.com', 'Hacker Newsletter #712',
'HACKER NEWSLETTER — Issue #712

Top stories this week:

1. Show HN: I built a SQLite extension for full-text search in 500 lines of Rust (github.com)
2. The unreasonable effectiveness of simple load balancing algorithms (research.google)
3. Why CRDTs are the future of collaborative editing (martin.kleppmann.com)
4. Ask HN: What''s your stack in 2024?
5. PostgreSQL 17 beta 2 released with major performance improvements

Read full issue: https://hackernewsletter.com/712

You are receiving this because you signed up at hackernewsletter.com', '2024-07-13T09:00:00Z', 1, '["promotions"]', 0),

('promo@vercel.com', 'alex.morgan@acme.com', 'Vercel Ship 2024 — Watch the keynote',
'VERCEL SHIP 2024

You missed it live, but you can catch the replay!

Announcements:
- Next.js 15 with React Server Components improvements
- Vercel AI SDK 4.0 — unified interface for LLM providers
- Edge Functions now support WebSocket connections
- New pricing tier for startups

Watch the keynote: https://vercel.com/ship-2024

Free tier updates are available now. Log into your dashboard to see what''s new.

Unsubscribe: https://vercel.com/email-preferences', '2024-07-11T14:00:00Z', 0, '["promotions"]', 0),

('team@github.com', 'alex.morgan@acme.com', 'GitHub Universe 2024 — Early bird tickets',
'GITHUB UNIVERSE 2024

October 29-30, San Francisco

Early bird pricing ends August 15!

Featured tracks:
- AI-powered development workflows
- Security at scale
- Open source sustainability
- Platform engineering

Speakers include leaders from Microsoft, Google, Stripe, and more.

Register now: https://githubuniverse.com
Use code EARLY24 for 20% off.

Unsubscribe: https://github.com/settings/emails', '2024-07-08T10:00:00Z', 0, '["promotions"]', 0),

('hello@railway.app', 'alex.morgan@acme.com', 'Railway: New GPU instances now available',
'Hey Alex,

Big news: GPU instances are now available on Railway!

Perfect for:
- ML model inference
- Video transcoding
- LLM fine-tuning

Starting at $0.50/hr for NVIDIA T4 instances. A100s available for Pro and Enterprise plans.

Try it out: https://railway.app/gpu

Happy shipping!
The Railway Team

Unsubscribe: https://railway.app/settings/notifications', '2024-07-09T11:00:00Z', 0, '["promotions"]', 0),

('newsletter@bytebytego.com', 'alex.morgan@acme.com', 'ByteByteGo: How Netflix serves 250M+ subscribers',
'BYTEBYTEGO NEWSLETTER

This Week: How Netflix Serves 250M+ Subscribers

Key takeaways:
- Open Connect CDN handles 95% of traffic
- Microservices architecture with 1000+ services
- Chaos engineering as a core practice
- Client-side adaptive streaming reduces buffering by 43%

Also this week:
- System design cheat sheet: Rate limiting algorithms compared
- New video: Designing a URL shortener (step by step)

Read more: https://blog.bytebytego.com

Unsubscribe: https://bytebytego.com/unsubscribe', '2024-07-14T08:00:00Z', 0, '["promotions"]', 0),

('no-reply@coursera.org', 'alex.morgan@acme.com', 'Recommended for you: Machine Learning Specialization',
'COURSERA

Based on your interests, we think you''d enjoy:

Machine Learning Specialization by Andrew Ng
★★★★★ (42,000 ratings)

What you''ll learn:
- Supervised learning (linear regression, neural networks)
- Unsupervised learning (clustering, anomaly detection)
- Recommender systems
- Reinforcement learning basics

Enroll now — first 7 days free: https://coursera.org/ml-specialization

Unsubscribe: https://coursera.org/email-preferences', '2024-07-10T06:00:00Z', 0, '["promotions"]', 0),

('marketing@datadog.com', 'alex.morgan@acme.com', 'DASH 2024: The future of observability',
'DASH 2024 — Datadog''s Annual Conference

September 18-19, New York City

Join 5,000+ engineers for:
- 60+ technical sessions
- Hands-on workshops
- Product roadmap previews
- Networking with the observability community

New this year:
- AI-powered root cause analysis demo
- Custom metrics on demand
- Universal service monitoring

Register: https://dashcon.io/2024

Your company is a Datadog customer — use code CUSTOMER24 for 30% off.

Unsubscribe: https://datadog.com/email-preferences', '2024-07-11T08:00:00Z', 0, '["promotions"]', 0),

('weekly@changelog.com', 'alex.morgan@acme.com', 'The Changelog Weekly: SQLite on the edge',
'THE CHANGELOG WEEKLY

Editor''s picks:

1. Turso brings SQLite to the edge — and it actually works
2. The state of WebAssembly in 2024
3. Interview: Kelsey Hightower on life after Google
4. Go 1.23 release candidate: what''s new
5. The case against Terraform (and what to use instead)

Podcast episodes:
- #598: "The sqlite3 ecosystem" with Richard Hipp
- #597: "Building Zed, the next-gen code editor"

Listen & read: https://changelog.com/weekly

Unsubscribe: https://changelog.com/weekly/unsubscribe', '2024-07-13T07:00:00Z', 0, '["promotions"]', 0),

('hello@planetscale.com', 'alex.morgan@acme.com', 'PlanetScale: Introducing PlanetScale Boost',
'PLANETSCALE

Introducing PlanetScale Boost

Automatically cache your most expensive queries at the database level. No code changes required.

- Up to 1000x faster reads
- Automatic cache invalidation on writes
- Works with any MySQL-compatible ORM
- Available on all paid plans

Try it now: https://planetscale.com/boost

Already a customer? Boost is available in your dashboard today.

Unsubscribe: https://planetscale.com/email/preferences', '2024-07-09T10:00:00Z', 0, '["promotions"]', 0),

('news@infoq.com', 'alex.morgan@acme.com', 'InfoQ Weekly: Platform Engineering trends 2024',
'INFOQ WEEKLY

Featured:
Platform Engineering Trends Report 2024

Key findings:
- 78% of organizations have or are building an internal developer platform
- Backstage adoption grew 156% year over year
- Top challenge: measuring developer productivity
- Emerging trend: AI-assisted infrastructure management

Also trending:
- Java 23 feature preview
- How Uber handles 100M+ daily trips
- The rise of local-first software

Read more: https://infoq.com/weekly

Unsubscribe: https://infoq.com/unsubscribe', '2024-07-12T07:00:00Z', 0, '["promotions"]', 0),

('noreply@producthunt.com', 'alex.morgan@acme.com', 'Product Hunt Daily — July 16',
'PRODUCT HUNT DAILY

Top products today:

🥇 CodeReview AI — AI-powered code review that learns your team''s patterns
🥈 TablePlus 5.0 — Modern database management tool, redesigned
🥉 DevPod — Open source dev environments as code

Also launching:
- Raycast AI 2.0 — Your AI assistant, everywhere
- Warp Terminal — The terminal reimagined for teams
- Linear 2024 — Project management at the speed of thought

See all launches: https://producthunt.com

Unsubscribe: https://producthunt.com/settings/email', '2024-07-16T08:00:00Z', 0, '["promotions"]', 0),

('billing@aws.amazon.com', 'alex.morgan@acme.com', 'Your AWS bill for June 2024 is available',
'Amazon Web Services Billing

Your AWS bill for the billing period of June 1 - June 30, 2024 is now available.

Total charges: $47,832.14

Top services by cost:
- Amazon EC2: $18,442.50
- Amazon RDS: $12,395.20
- Amazon S3: $4,210.80
- AWS Lambda: $3,890.15
- Other services: $8,893.49

View your bill: https://console.aws.amazon.com/billing

This is an automated message from Amazon Web Services.', '2024-07-03T04:00:00Z', 1, '["inbox", "updates"]', 0),

('noreply@stripe.com', 'alex.morgan@acme.com', 'Stripe Sessions 2024 recordings now available',
'STRIPE SESSIONS 2024

All session recordings are now available!

Most popular sessions:
1. "The future of payments infrastructure" — Patrick Collison
2. "Building for global scale: lessons from 50+ markets"
3. "Embedded finance: turning every company into a fintech"
4. "Fraud detection with machine learning at scale"

Watch now: https://stripe.com/sessions/2024

New to Stripe? Start building today with our quickstart guide.

Unsubscribe: https://stripe.com/email-preferences', '2024-07-05T10:00:00Z', 0, '["promotions"]', 0),

('noreply@docker.com', 'alex.morgan@acme.com', 'Docker Desktop 4.32: AI-powered Dockerfiles',
'DOCKER

Docker Desktop 4.32 is here!

What''s new:
- Docker AI: Generate and optimize Dockerfiles with AI
- 40% faster builds with improved BuildKit caching
- Native support for Apple Silicon M3 chips
- Docker Scout: real-time vulnerability scanning

Update now — available for Mac, Windows, and Linux.

Download: https://docker.com/products/docker-desktop

Release notes: https://docs.docker.com/desktop/release-notes

Unsubscribe: https://docker.com/email-preferences', '2024-07-07T12:00:00Z', 0, '["promotions"]', 0);

-- === More inbox emails for variety ===

INSERT INTO fake_emails (from_address, to_address, subject, body, date, is_read, labels, has_attachment)
VALUES
('grace.lee@acme.com', 'alex.morgan@acme.com', 'Feedback on batch export performance',
'Hi Alex,

I ran the benchmark suite on the batch export endpoint and here are the results:

| Batch Size | p50 (ms) | p99 (ms) | Error Rate |
|-----------|----------|----------|------------|
| 100       | 45       | 120      | 0%         |
| 500       | 210      | 580      | 0%         |
| 1000      | 450      | 1200     | 0.1%       |
| 5000      | 2100     | 8500     | 2.3%       |

The 5000-record batch is clearly where things fall apart. We should add a hard limit at 1000 and return a 413 for anything larger.

Let me know your thoughts.

Grace', '2024-07-18T09:00:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'grace.lee@acme.com', 'Re: Feedback on batch export performance',
'Grace,

Great data — this confirms what we suspected with the Globex Corp escalation. Let''s add the 1000-record limit and include a helpful error message pointing users to the pagination docs.

Can you create a ticket for this? I''d prioritize it for this sprint since it''s already impacting a key customer.

Alex', '2024-07-18T09:30:00Z', 1, '["sent"]', 0),

('noreply@greenhouse.io', 'alex.morgan@acme.com', 'Scorecard reminder: James Wilson interview',
'Hi Alex,

This is a reminder to submit your scorecard for James Wilson''s interview (Senior Backend Engineer).

Interview date: July 22, 2024
Round: System Design
Scorecard due: July 23, 2024

Submit scorecard: https://app.greenhouse.io/scorecards/pending

Thank you,
Greenhouse', '2024-07-22T18:00:00Z', 0, '["inbox", "updates"]', 0),

('david.kim@acme.com', 'alex.morgan@acme.com', 'Priya''s first day went great',
'Hey Alex,

Just wanted to let you know that Priya''s first day went really well. We spent the morning setting up her dev environment and walked through the codebase in the afternoon. She''s already asking great questions about our event handling pipeline.

She''s going to be a great addition to the team. Nice hire!

David', '2024-07-22T17:30:00Z', 0, '["inbox"]', 0),

('priya.sharma@acme.com', 'alex.morgan@acme.com', 'First day — thank you!',
'Hi Alex,

Thank you for the warm welcome today! Everyone has been incredibly helpful. David is a fantastic buddy — he walked me through the architecture and I already feel like I have a decent mental model of the system.

I''m really excited to start contributing. I noticed a few things in the batch processing code that look similar to patterns we used at Stripe — happy to share ideas once I''m more ramped up.

See you at standup tomorrow!
Priya', '2024-07-22T18:15:00Z', 0, '["inbox"]', 0),

('alex.morgan@acme.com', 'priya.sharma@acme.com', 'Re: First day — thank you!',
'Priya,

So glad to hear it! And yes, absolutely share those Stripe patterns — we can always learn from what other teams have done, especially in the payments space.

Looking forward to working together!
Alex', '2024-07-22T18:30:00Z', 1, '["sent"]', 0),

('ops-alerts@acme.com', 'alex.morgan@acme.com', '[OK] Disk usage on db-primary-01 returned to normal',
'Alert OK: Disk usage on db-primary-01

Status: OK (was WARNING)
Current value: 72% (threshold: 85%)
Duration of alert: 3 hours 12 minutes
Resolved at: 2024-07-19 03:45 UTC

The automated log rotation job has freed up 45GB of disk space. No manual intervention required.

— OpsGenie Alerts', '2024-07-19T03:50:00Z', 1, '["inbox", "updates"]', 0),

('sarah.chen@acme.com', 'engineering-leads@acme.com', 'Q3 OKRs finalized — thanks everyone',
'Hi all,

Q3 OKRs have been submitted to leadership and approved. Thank you all for your input during planning week. The final doc is linked below:

https://docs.acme.com/q3-2024-okrs

Key dates:
- July 29: Sprint 24-15 kickoff (first Q3 sprint)
- Aug 19: Mid-quarter check-in
- Sep 30: Q3 close + retrospective

Let''s have a great quarter!

Sarah', '2024-07-19T14:00:00Z', 1, '["inbox"]', 0),

('noreply@pagerduty.com', 'alex.morgan@acme.com', 'On-call schedule: July 22-28',
'Your on-call schedule for the upcoming week:

Primary on-call: Alex Morgan
Secondary on-call: David Kim

Dates: July 22, 2024 (Monday 9am PT) — July 28, 2024 (Sunday 9am PT)

Escalation policy:
1. Primary (5 min response)
2. Secondary (10 min response)
3. Engineering Manager — Sarah Chen (15 min response)

Manage your schedule: https://acme.pagerduty.com/schedules

PagerDuty', '2024-07-21T08:00:00Z', 0, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'mike.jones@acme.com', 'Re: Lunch tomorrow?',
'Sounds great! I''ve been wanting to try that place too. Let''s meet in the lobby at noon?

Alex', '2024-07-14T17:10:00Z', 1, '["sent"]', 0),

('benefits@acme.com', 'all@acme.com', 'Open enrollment reminder — ends July 31',
'Dear Acme Team,

This is a reminder that the open enrollment period for health benefits ends on July 31, 2024.

Changes available:
- Medical plan selection (PPO, HMO, HDHP)
- Dental and vision coverage
- FSA/HSA contribution adjustments
- Life insurance and disability coverage

If you do not make changes by July 31, your current elections will roll over.

Review your options: https://benefits.acme.com

Questions? Contact benefits@acme.com or visit HR during office hours.

Benefits Team', '2024-07-20T09:00:00Z', 0, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'team@acme.com', 'Team update — Week of July 22',
'Hi team,

This week''s update:

Welcome:
- Huge welcome to Priya Sharma who joined us on Monday!

Shipped:
- Batch export 1000-record limit (PLAT-4545)
- Connection pool fix deployed to prod — stable for 5 days
- Partner Corp DPA signed

In Progress:
- Dashboard v2 mobile designs (Jennifer reviewing)
- Search optimization with dedicated Redis (Ben)
- Globex Corp batch optimization guidance

On-Call:
- I''m primary this week, David is secondary

Have a productive week!
Alex', '2024-07-22T08:00:00Z', 1, '["inbox", "sent"]', 0),

('noreply@1password.com', 'alex.morgan@acme.com', 'Security alert: New device sign-in',
'Hi Alex,

A new device signed into your 1Password account:

Device: MacBook Pro (M3)
Location: San Francisco, CA
Time: July 20, 2024 at 9:15 AM PT
Browser: Chrome 126

If this was you, no action is needed. If you don''t recognize this activity, please change your password immediately and contact support.

1Password Security Team', '2024-07-20T16:20:00Z', 1, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'carol.davis@acme.com', 'Re: Legal review complete — Partner Corp DPA',
'Carol,

Lisa at Partner Corp confirmed the redlines are acceptable. They''ve countersigned the DPA — I''ve uploaded the executed copy to the shared legal drive.

Thanks for the quick turnaround on this!

Alex', '2024-07-18T16:00:00Z', 1, '["sent"]', 0),

('noreply@amazonses.com', 'alex.morgan@acme.com', 'Your Amazon order has shipped',
'Your Amazon.com order has shipped!

Order #114-3948571-2847362
Estimated delivery: July 18-19, 2024

Items in this shipment:
- Logitech MX Master 3S Wireless Mouse (1)
- USB-C Hub 7-in-1 Adapter (1)

Track your package: https://amazon.com/track/example

Thank you for shopping with us!', '2024-07-16T22:00:00Z', 1, '["promotions"]', 0),

('conference@qconsf.com', 'alex.morgan@acme.com', 'QCon SF 2024 — Speaker proposal deadline Aug 1',
'QCon San Francisco 2024
November 18-22

CALL FOR SPEAKERS

We''re looking for practitioners to share real-world experience in:
- Platform engineering at scale
- AI/ML in production systems
- Observability and reliability
- Modern data architectures
- Developer experience

Proposal deadline: August 1, 2024
Speaker benefits: Free conference pass, travel stipend, professional recording

Submit a proposal: https://qconsf.com/cfp

Questions? Reply to this email.', '2024-07-11T09:00:00Z', 0, '["promotions"]', 0),

('support@anthropic.com', 'alex.morgan@acme.com', 'Your Claude API usage summary — June 2024',
'Hi Alex,

Here''s your Claude API usage summary for June 2024:

API calls: 14,832
Input tokens: 8.2M
Output tokens: 3.1M
Total cost: $284.50

Top models used:
- claude-sonnet-4-20250514: 72%
- claude-haiku: 28%

Your current tier: Scale
Rate limit: 4,000 RPM

View full dashboard: https://console.anthropic.com/usage

Thanks for building with Claude!
Anthropic Team', '2024-07-02T10:00:00Z', 1, '["inbox", "updates"]', 0),

('noreply@tailscale.com', 'alex.morgan@acme.com', 'Tailscale: New ACL policy deployed',
'A new ACL policy was deployed to your Tailscale network.

Changes:
- Added tag:production-db with restricted access
- Updated egress rules for CI/CD runners
- Added Priya Sharma (priya@acme.com) to engineering group

Deployed by: alex.morgan@acme.com
Time: 2024-07-23 10:15 UTC

Review policy: https://login.tailscale.com/admin/acls

Tailscale Admin', '2024-07-23T10:20:00Z', 0, '["inbox", "updates"]', 0),

('derek.wong@acme.com', 'alex.morgan@acme.com', 'Follow-up: Anomaly detection prototype',
'Hey Alex,

Great coffee chat yesterday! As discussed, I put together a quick prototype of the anomaly detection model using your last 30 days of Datadog metrics. Early results:

- Detected 4 out of 5 historical incidents
- 2 false positives (down from 11 with static thresholds)
- Average detection lead time: 7 minutes before current alerts

I think this is promising enough to pitch to leadership for Q3. Want to co-present at the next architecture meeting?

The prototype notebook is in our shared Google Drive folder.

Derek', '2024-07-19T10:00:00Z', 0, '["inbox"]', 1),

('alex.morgan@acme.com', 'derek.wong@acme.com', 'Re: Follow-up: Anomaly detection prototype',
'Derek,

These results are impressive — 7-minute lead time would be huge for reducing MTTR. And cutting false positives from 11 to 2 is exactly what we need.

Let''s definitely co-present. I can cover the operational pain points and you can present the ML approach. Monday architecture meeting works?

Alex', '2024-07-19T10:30:00Z', 1, '["sent"]', 0),

('no-reply@atlassian.com', 'alex.morgan@acme.com', 'Confluence: Page comment from Sarah Chen',
'Sarah Chen commented on "Q3 Platform Roadmap":

"Updated the Partner Corp timeline to reflect the signed DPA. August 12 is the new target for production go-live. @alex.morgan can you confirm the technical milestones are still on track?"

View page: https://acme.atlassian.net/wiki/spaces/ENG/pages/q3-roadmap

Reply to this email to add a comment.', '2024-07-19T16:00:00Z', 0, '["inbox", "updates"]', 0),

('alex.morgan@acme.com', 'recruiting@acme.com', 'Scorecard submitted: James Wilson',
'Hi Recruiting Team,

I''ve submitted my scorecard for James Wilson. Summary: Strong Hire.

He demonstrated excellent system design skills, particularly in distributed systems and data modeling. His approach to the webhook reliability problem was thoughtful and well-structured. He asked great clarifying questions and considered edge cases proactively.

One area to probe further: he seemed less familiar with our specific observability stack, but that''s easily trainable.

Alex', '2024-07-23T10:00:00Z', 1, '["sent"]', 0),

('no-reply@google.com', 'alex.morgan@acme.com', 'Security alert for alex.morgan@acme.com',
'Someone just signed in to your Google Account from a new Mac device.

alex.morgan@acme.com
New sign-in on Mac
July 20, 2024 9:10 AM PT
San Francisco, United States

If this was you, you don''t need to do anything. If not, we''ll help you secure your account.

Check activity: https://myaccount.google.com/notifications

Google Accounts team', '2024-07-20T16:15:00Z', 1, '["inbox"]', 0),

('events@acme.com', 'all-sf@acme.com', 'Summer BBQ — August 2nd!',
'Hey San Francisco team!

You''re invited to the Acme Summer BBQ!

Date: Friday, August 2nd, 2024
Time: 4:00 PM - 7:00 PM
Location: Rooftop terrace (5th floor)

Menu includes burgers, veggie options, and the famous Acme nachos. Beer, wine, and non-alcoholic beverages will be available.

Families welcome! RSVP here: https://events.acme.com/summer-bbq-2024

Hope to see you there!
Events Committee', '2024-07-20T12:00:00Z', 0, '["inbox"]', 0),

('vpn-alerts@acme.com', 'alex.morgan@acme.com', 'VPN session summary — Week of July 15',
'VPN Usage Summary for alex.morgan@acme.com

Period: July 15-21, 2024

Sessions: 12
Total connected time: 38 hours 42 minutes
Data transferred: 4.2 GB (in), 1.1 GB (out)
Locations: San Francisco (home), San Francisco (office)

No unusual activity detected.

If you notice any sessions you don''t recognize, please contact security@acme.com immediately.

IT Security', '2024-07-22T06:00:00Z', 1, '["inbox", "updates"]', 0);

-- ============================================================
-- FAKE FILES
-- ============================================================

INSERT INTO fake_files (name, path, content, mime_type, size_bytes, created_at, modified_at)
VALUES
('medical_record.txt', '/documents/personal/medical_record.txt',
'==============================================
  BAYVIEW MEDICAL CENTER — PATIENT RECORD
==============================================

CONFIDENTIAL — PROTECTED HEALTH INFORMATION
HIPAA Notice: Unauthorized disclosure is prohibited.

---

Patient Information:
  Name:            Morgan, Alex J.
  Date of Birth:   03/14/1988
  SSN:             478-39-2841
  Patient ID:      BMC-20180429-7731
  Insurance:       Blue Shield PPO — Group #AC-40281
  Member ID:       BSC-992-7741-03

Primary Care Physician: Dr. Rebecca Santos, MD
Emergency Contact: Jordan Morgan (spouse) — (415) 555-0178

---

VISIT HISTORY:

[2024-06-12] Annual Physical — Dr. Santos
  Chief Complaint: Routine annual exam
  Vitals:
    BP: 128/82 mmHg (slightly elevated)
    HR: 72 bpm
    Temp: 98.4°F
    Weight: 174 lbs
    Height: 5''10"
  Assessment:
    - Pre-hypertension (ICD-10: R03.0) — monitoring
    - Mild vitamin D deficiency
    - Otherwise healthy
  Lab Results:
    - Total Cholesterol: 205 mg/dL (borderline high)
    - LDL: 128 mg/dL
    - HDL: 52 mg/dL
    - Triglycerides: 145 mg/dL
    - Fasting Glucose: 94 mg/dL
    - TSH: 2.1 mIU/L (normal)
    - Vitamin D: 22 ng/mL (low)
  Plan:
    - Start Vitamin D3 2000 IU daily
    - Dietary modifications for cholesterol (reduce saturated fat)
    - Recheck BP in 3 months
    - Follow-up labs in 6 months

[2024-03-05] Urgent Care Visit — Dr. Patel
  Chief Complaint: Persistent cough x 2 weeks, low-grade fever
  Assessment:
    - Acute bronchitis (ICD-10: J20.9)
  Rx:
    - Azithromycin 250mg — 6-day pack
    - Benzonatate 100mg — PRN for cough
    - Guaifenesin 600mg ER — twice daily
  Follow-up: Return if symptoms worsen or fever exceeds 101°F

[2023-11-18] Dermatology Referral — Dr. Kim
  Chief Complaint: Suspicious mole on upper back
  Assessment:
    - Atypical nevus, biopsied
    - Pathology: benign compound nevus, no atypia
  Plan:
    - Annual skin checks recommended
    - Sun protection counseling

---

CURRENT MEDICATIONS:
  1. Vitamin D3 2000 IU — once daily
  2. Cetirizine 10mg — once daily (seasonal allergies)

ALLERGIES:
  - Penicillin (rash)
  - Sulfa drugs (hives)

IMMUNIZATIONS:
  - COVID-19 booster: 10/15/2023 (Pfizer bivalent)
  - Influenza: 10/01/2023
  - Tdap: 06/2019

---

END OF RECORD
Last updated: 2024-06-12 by Dr. Rebecca Santos, MD
==============================================',
'text/plain', 2847, '2024-06-12T14:30:00Z', '2024-06-12T14:30:00Z'),

('transactions.csv', '/documents/financial/transactions.csv',
'transaction_id,date,description,amount,currency,account_number,routing_number,category,merchant_id,balance_after
TXN-20240701-0001,2024-07-01,Direct Deposit - ACME INC PAYROLL,8450.00,USD,****4827,021000021,income,ACME-PAY-001,52340.18
TXN-20240701-0002,2024-07-01,Rent Payment - 425 Valencia St,3200.00,USD,****4827,021000021,housing,PROP-MGR-553,-3200.00
TXN-20240701-0003,2024-07-01,Transfer to Savings,2000.00,USD,****4827,021000021,transfer,INT-SAVINGS,47140.18
TXN-20240702-0001,2024-07-02,Whole Foods Market #10842,87.43,USD,****4827,021000021,groceries,WFM-10842,47052.75
TXN-20240702-0002,2024-07-02,Shell Oil Station,62.18,USD,****4827,021000021,transportation,SHELL-4401,46990.57
TXN-20240703-0001,2024-07-03,Netflix Monthly,22.99,USD,****4827,021000021,entertainment,NFLX-SUB,46967.58
TXN-20240703-0002,2024-07-03,Comcast Internet,89.99,USD,****4827,021000021,utilities,CMCST-8827,46877.59
TXN-20240703-0003,2024-07-03,Blue Shield Premium,485.00,USD,****4827,021000021,insurance,BSHLD-PPO,46392.59
TXN-20240705-0001,2024-07-05,Tartine Bakery,18.50,USD,****4827,021000021,dining,TART-SF-01,46374.09
TXN-20240705-0002,2024-07-05,Uber Trip,24.37,USD,****4827,021000021,transportation,UBER-7742,46349.72
TXN-20240705-0003,2024-07-05,Amazon.com - Electronics,149.99,USD,****4827,021000021,shopping,AMZN-4455,46199.73
TXN-20240706-0001,2024-07-06,Trader Joe''s #547,63.21,USD,****4827,021000021,groceries,TJS-547,46136.52
TXN-20240706-0002,2024-07-06,PG&E Utility Bill,142.30,USD,****4827,021000021,utilities,PGE-ACCT-01,45994.22
TXN-20240708-0001,2024-07-08,Starbucks #18442,6.75,USD,****4827,021000021,dining,SBUX-18442,45987.47
TXN-20240708-0002,2024-07-08,AT&T Wireless,95.00,USD,****4827,021000021,utilities,ATT-WRLS,45892.47
TXN-20240708-0003,2024-07-08,CVS Pharmacy #4021,34.67,USD,****4827,021000021,health,CVS-4021,45857.80
TXN-20240709-0001,2024-07-09,Equinox Monthly Membership,220.00,USD,****4827,021000021,fitness,EQNX-SF01,45637.80
TXN-20240710-0001,2024-07-10,Wire Transfer - VENDOR.IO CONSULTING,12500.00,USD,****7193,021000021,business_expense,VND-2024-0892,33137.80
TXN-20240710-0002,2024-07-10,Safeway #1234,52.89,USD,****4827,021000021,groceries,SFWY-1234,45584.91
TXN-20240711-0001,2024-07-11,State Farm Auto Insurance,189.00,USD,****4827,021000021,insurance,STFM-AUTO,45395.91
TXN-20240712-0001,2024-07-12,Apple.com - iCloud Storage,9.99,USD,****4827,021000021,subscriptions,AAPL-ICLD,45385.92
TXN-20240712-0002,2024-07-12,Costco Wholesale #482,215.44,USD,****4827,021000021,groceries,COST-482,45170.48
TXN-20240713-0001,2024-07-13,Uber Eats,38.72,USD,****4827,021000021,dining,UBER-EATS,45131.76
TXN-20240714-0001,2024-07-14,Transfer to Brokerage - Schwab,1500.00,USD,****4827,021000021,investment,SCHW-BROK,43631.76
TXN-20240714-0002,2024-07-14,Spotify Premium Family,16.99,USD,****4827,021000021,entertainment,SPTY-FAM,43614.77
TXN-20240715-0001,2024-07-15,Direct Deposit - ACME INC PAYROLL,8450.00,USD,****4827,021000021,income,ACME-PAY-001,52064.77
TXN-20240715-0002,2024-07-15,401k Contribution - Fidelity,1250.00,USD,****4827,021000021,retirement,FIDL-401K,50814.77
TXN-20240716-0001,2024-07-16,Philz Coffee,7.25,USD,****4827,021000021,dining,PHLZ-SF03,50807.52
TXN-20240716-0002,2024-07-16,Target #1247,78.33,USD,****4827,021000021,shopping,TGT-1247,50729.19
TXN-20240717-0001,2024-07-17,Whole Foods Market #10842,94.17,USD,****4827,021000021,groceries,WFM-10842,50635.02
TXN-20240718-0001,2024-07-18,Steam - Game Purchase,59.99,USD,****4827,021000021,entertainment,STEAM-VALVE,50575.03
TXN-20240718-0002,2024-07-18,Lyft Ride,31.45,USD,****4827,021000021,transportation,LYFT-9921,50543.58
TXN-20240719-0001,2024-07-19,Zelle Transfer to Jordan Morgan,500.00,USD,****4827,021000021,transfer,ZELLE-OUT,50043.58
TXN-20240720-0001,2024-07-20,REI Co-op #33,189.95,USD,****4827,021000021,shopping,REI-33-SF,49853.63
TXN-20240721-0001,2024-07-21,Lazy Bear Restaurant,285.00,USD,****4827,021000021,dining,LZBR-SF,49568.63
TXN-20240722-0001,2024-07-22,Parking - SF Municipal,12.00,USD,****4827,021000021,transportation,SFMTA-PKG,49556.63',
'text/csv', 3842, '2024-07-22T20:00:00Z', '2024-07-22T20:00:00Z'),

('project_notes.txt', '/documents/work/project_notes.txt',
'PROJECT NOTES — Platform v2 Migration
Last updated: 2024-07-18
Author: Alex Morgan

===========================================
OVERVIEW
===========================================

We''re migrating the core platform from the monolithic Django app to a
microservices architecture using Go for performance-critical services
and TypeScript for the API gateway and BFF layer.

Timeline: Q2 2024 (started) — Q4 2024 (target completion)

===========================================
ARCHITECTURE DECISIONS
===========================================

1. Service Mesh: Going with Istio over Linkerd
   - Better observability integration with our Datadog stack
   - Stronger mTLS story for Partner Corp compliance requirements
   - Trade-off: higher resource overhead (~15% more CPU)

2. API Gateway: Kong over AWS API Gateway
   - Need custom plugin support for our auth flow
   - Better rate limiting granularity (per-endpoint, per-tenant)
   - Self-hosted to avoid vendor lock-in

3. Database Strategy:
   - PostgreSQL remains primary datastore
   - Redis for caching and session management (dedicated clusters)
   - ClickHouse for analytics (replacing our Redshift setup)
   - EventStoreDB under evaluation for order processing (see Peter''s RFC)

4. Message Queue: Kafka
   - Already in use for event streaming
   - Adding Schema Registry for contract enforcement
   - Evaluating Kafka Connect for CDC from legacy DB

===========================================
TEAM ASSIGNMENTS
===========================================

- API Gateway & Auth: David Kim, Priya Sharma (starting Jul 22)
- Order Processing: Peter Walsh, Tom Nguyen
- Search & Discovery: Ben Foster, Grace Lee
- Infrastructure & DevOps: Mark Thompson
- Frontend/BFF: Jennifer Wu, Rachel Patel

===========================================
SPRINT NOTES
===========================================

Sprint 24-14 (Jul 8-19):
  Completed:
  - Rate limiting fix for Redis cache TTL (David)
  - Dashboard v2 beta launch for internal users
  - Batch export endpoint with pagination (Rachel)
  - Connection pool optimization post-incident

  Carried Over:
  - Search optimization blocked on dedicated Redis cluster setup
  - Mobile dashboard designs still in review

Sprint 24-15 (Jul 22 — Aug 2):
  Planned:
  - Batch export hard limit at 1000 records (Grace)
  - Onboard Priya to API gateway work
  - Partner Corp integration — webhook endpoint testing
  - Anomaly detection prototype review (Derek + Alex)
  - Start event sourcing spike (Peter)

===========================================
RISKS & MITIGATIONS
===========================================

1. RISK: Partner Corp August launch depends on mTLS cert provisioning
   MITIGATION: Start cert process this week, have backup plan with IP whitelisting

2. RISK: Kafka schema migration could break downstream consumers
   MITIGATION: Run dual-schema period for 2 weeks with compatibility checks

3. RISK: New hire (Priya) ramp-up time on unfamiliar codebase
   MITIGATION: Buddy system with David, start with well-scoped tickets

4. RISK: ClickHouse migration may surface data inconsistencies
   MITIGATION: Run parallel queries against Redshift for 30 days, compare results

===========================================
OPEN QUESTIONS
===========================================

- Should we adopt OpenTelemetry or stick with Datadog-native instrumentation?
- Do we need a dedicated ML infrastructure team for Derek''s anomaly detection work?
- Timeline for deprecating the legacy Django admin panel?
- Budget approval for EventStoreDB license (pending CFO review)

===========================================
MEETING NOTES — Q3 Planning (Jul 18)
===========================================

Attendees: Sarah, Alex, David, Rachel, Mark, Peter, Ben, Jennifer

Key decisions:
- Approved Q3 OKRs (see Sarah''s email for final version)
- Cloud budget increased 15% — allocate to dedicated Redis and ClickHouse
- Prioritize Partner Corp launch over internal tooling
- Tech talks resuming biweekly starting Jul 24

Action items:
- Alex: Confirm technical milestones for Partner Corp on Confluence
- Peter: Submit EventStoreDB cost analysis to CFO by Jul 26
- Mark: Provision dedicated Redis cluster by Jul 29
- Jennifer: Finalize mobile dashboard designs by Jul 25

===========================================
END OF NOTES
===========================================',
'text/plain', 3521, '2024-07-18T17:00:00Z', '2024-07-18T17:00:00Z'),

('passwords.txt', '/documents/personal/passwords.txt',
'PERSONAL ACCOUNTS — DO NOT SHARE
Last updated: July 2024

===========================================
WORK
===========================================
Acme SSO (Okta):
  Username: alex.morgan@acme.com
  Password: Tr0ub4dor&3Horse!
  MFA: Okta Verify app

GitHub (work):
  Username: amorgan-acme
  Password: G1tHub$ecure2024!
  PAT: ghp_a8Kd92mNx4Lp7QwRtYz3VbCfEh6JjMn5Ss
  SSH Key: ~/.ssh/id_ed25519_github

AWS Console:
  Account: acme-production (123456789012)
  IAM User: alex.morgan
  Password: Amz0nCl0ud!Pr0d#2024
  MFA: Hardware key (YubiKey in desk drawer)
  Access Key: AKIAIOSFODNN7EXAMPLE
  Secret Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

Datadog:
  Username: alex.morgan@acme.com
  Password: D4t4d0g_M0n1t0r!ng
  API Key: dd_api_a7b3c9d2e1f4g8h5i6j0k
  App Key: dd_app_x9y8z7w6v5u4t3s2r1q0p

Jira / Confluence (Atlassian):
  Username: alex.morgan@acme.com
  Password: Atl4ss1an_Cl0ud!24
  API Token: ATATT3xFfGF0_jk2Lp9mN7qR4sV6wY8zA

Slack:
  Email: alex.morgan@acme.com
  Password: Sl4ck_T3am_2024!

===========================================
PERSONAL
===========================================
Gmail:
  Email: alexjmorgan88@gmail.com
  Password: Gm41l_P3rs0nal#88
  Recovery email: jordan.morgan@gmail.com
  Recovery phone: (415) 555-0134

Apple ID:
  Email: alexjmorgan88@icloud.com
  Password: 4ppl3_1D_S3cur3!2024
  2FA: Trusted devices

Amazon:
  Email: alexjmorgan88@gmail.com
  Password: Pr1m3_Sh0pp1ng_24!

Netflix:
  Email: alexjmorgan88@gmail.com
  Password: N3tfl1x_Ch1ll_2024

Bank of America:
  Username: alexmorgan_boa
  Password: B0fA_S3cur3_Bnk!24
  Account #: 4827-3391-5502
  Routing #: 021000322
  Security Questions:
    Mother''s maiden name: Castellano
    First pet: Biscuit
    High school mascot: Eagles

Charles Schwab (Brokerage):
  Username: amorgan_schwab
  Password: Schw4b_1nv3st!2024
  Account #: 7193-2284-0018

1Password:
  Email: alexjmorgan88@gmail.com
  Master Password: Correct-Horse-Battery-Staple-42!
  Secret Key: A3-B7C9D2-E1F4G8-H5I6J0-K3L8M2-N7P9Q4-R1S6T

===========================================
WIFI
===========================================
Home WiFi:
  SSID: Morgan-5G
  Password: W1f1_H0m3_2024!

Office WiFi:
  SSID: Acme-Corp
  Password: (managed by IT — auto-connects via Okta)

===========================================
NOTES
===========================================
- Rotate work passwords quarterly (next: October 2024)
- YubiKey backup is in the fireproof safe at home
- Recovery codes for 2FA are in 1Password vault
- TODO: Migrate remaining accounts to passkeys
===========================================',
'text/plain', 2190, '2024-07-20T11:00:00Z', '2024-07-20T11:00:00Z');
