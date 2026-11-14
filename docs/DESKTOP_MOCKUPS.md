# Desktop screens

From the `lg` breakpoint up, the top nav is the way around. Home is full-bleed inside `max-w-[1440px]`. Other pages sit in a `1280px` column with page padding.

## Home

Three zones.

1. **Hero.** Left: eyebrow “A safer · smarter · more connected tomorrow”, the headline Learn AI / Build Trust / Connect the Future, Join the Network (`/groups`) and Start Learning (`/learn`), and the four network stats. Center: the interactive emblem. Right (lg only): “People. Ideas. Technology. A safer world.”, Watch Our Story (`/explore`), and the pillars Learn, Collaborate, Innovate, Stay Safe, Grow Together.
2. **Tiles.** Five glass shortcuts: AI Learning, Community, Trust Network, Opportunities, Real-World Impact. The last two both go to `/explore`.
3. **Board.** Four columns:
   - Trending Groups (join toggles) and the tech news wire under them
   - Live Community Feed with All, Following, Popular, Threat Alerts, Projects
   - My Learning Journey (progress bars, Start or Continue) and the job search generator
   - 4SightAI Copilot (chips, last reply, ask field) and Upcoming Events

Feed tabs filter on each post’s `tab`, with Threat Alerts also including `threat: true`. Following and Projects are empty until a post is tagged that way. Composed posts are tagged `all`. The home “Create Post” link goes to `/feed`.

## Feed

Composer (body plus an optional group) and the post list. Empty state copy comes from `EmptyNote` when nothing is in the list.

## Groups

Directory cards show member counts and the trust floor. A room page shows the description and Join or Leave. Join reads “Need trust {floor}” and stays disabled when the member is under the floor.

## Learning, certificate, profile, trust

Described in [Academy](ACADEMY.md). Profile adds the photo button, the edit dialog (name is required), your posts, joined groups, and finished paths. Trust shows the ring at `me.trust` (98 for the seed) and six standing factors that are fixed copy, not computed.

## Events

Three cards: Prompt Engineering live studio (Thu 18:00 ET, AI Builders), Voice-cloning threat briefing (Fri 12:00 ET, Cybersecurity), Founder office hours (Sat 10:00 ET, Startup Founders). Each card links to that group.

## Explore and About

Explore is the “Watch our story” page: five lanes back into Learn, Feed, Explore, Trust, and Groups. About is mission, the four pillars (Learn, Connect, Trust, Stay safe), the founder note, and links into the academy and the feed.

## Copilot and notifications

Copilot is a single column transcript with the same chips as home. Notifications lists the seed notices. Unread items get an electric ring. The header bell shows a guardian-red dot while any notice is unread. Mark-read clears one or all. The learn notice’s link follows `nextLesson` instead of staying on the original fundamentals lesson.

## Search

The header field (a icon button under `md`) opens “Search the network.” Up to eight hits. An empty query lists nothing. A miss says nothing matches.
