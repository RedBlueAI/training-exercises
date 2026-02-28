# Feature Request Brief: Service Status Notifications

## Source
Product Manager via Slack, forwarding customer feedback.

## The Request
> "Customers keep asking about getting notifications when their service request status changes. Can we look into this? Maybe email or push notifications or something?"

## Additional Context (gathered from PM follow-up)
- Top 3 customer complaint: "I never know what's happening with my request"
- Current process: Customers call the office to check status → ties up dispatch staff
- Competitors offer at minimum email notifications
- Some customers are not tech-savvy (older homeowners)
- Commercial customers want notifications to multiple people (facility manager + building owner)
- No existing notification infrastructure in the current Field Service Dashboard

## Constraints
- Budget: Must use existing infrastructure where possible (no new SaaS subscriptions)
- Timeline: Customers expect this "soon" (no specific date)
- Team: Current team of 3 developers (1 senior, 1 mid, 1 junior)
- Stack: Next.js, TypeScript, Tailwind (same as training repo)

## What's NOT in this brief (your job to figure out)
- Which notification channels to support
- What events trigger notifications
- How users manage preferences
- Security and privacy implications
- Technical architecture
- Performance requirements
- Phasing strategy (MVP vs full feature)
