# Architecture

Next.js App Router (16), React 19, Tailwind 4, and a client store. The package name is `4sightai-network`. Dev and start bind `0.0.0.0:43147`.

`app/layout.tsx` wraps every page in `NetworkProvider` and `NetworkShell`. Pages under `app/` are thin route files. The views live in `components/views/`. Seed content lives in `lib/data.ts`, `lib/courses.ts`, and `lib/events.ts`.

## Routes

| Path | View | Role |
| --- | --- | --- |
| `/` | `HomeView` | Hero, emblem, four-column board |
| `/feed` | `FeedView` | Composer and the full post list |
| `/groups` | `GroupsView` | Directory with trust floors |
| `/groups/[id]` | `GroupDetailView` | One room; join is blocked under the floor |
| `/learn` | `LearnView` | Four academy cards and the CAFP banner |
| `/learn/[id]` | `CourseView` | Lesson list for one path |
| `/learn/[id]/[lessonId]` | `LessonView` | Objective, reading, practice, takeaways, mark complete |
| `/certificate` | `CertificateView` | Pricing and the issued certificate |
| `/certificate/verify/[id]` | `CertificateVerifyView` | Looks up the certificate stored in this browser |
| `/events` | events page | Three upcoming sessions |
| `/trust` | `TrustView` | Guardian ring and standing factors |
| `/explore` | explore page | Five story lanes |
| `/about` | about page | Mission, pillars, founder |
| `/copilot` | `CopilotView` | Full transcript of scripted replies |
| `/notifications` | `NotificationsView` | Seeded notices; the learn notice follows the next lesson |
| `/profile` | `ProfileView` | Photo, edit form, your posts, groups, finished paths |
| `/api/tech-news` | `GET` | Live RSS mix, or the seeded brief |

Unknown paths hit `app/not-found.tsx`.

Desktop nav (lg and up): Home, Feed, Groups, Learning, Events, Trust, Explore, About Us. Copilot, Profile, and Notifications are header or in-page links, not top-nav items. Search opens a dialog.

Mobile nav (under lg): Home, Groups, Learn, Copilot, Profile. Feed, Events, Trust, Explore, About, and Notifications stay reachable from the home board, search, or the header bell.

## Shell

`NetworkShell` is a sticky header (`#03060d` at 75% opacity, blur), a main column (`max-w-[1440px]` on home, `1280px` elsewhere), a footer, and the mobile bar.

The footer on every page reads `© {year} 4Sight AI Guardian. All rights reserved.` It is hidden in print, as is the chrome, so the certificate can print landscape.

Search matches people, groups, and courses by name and description, and adds hits for the CAFP certificate and About Us. Other members link to `/feed`. Only the signed-in member has `/profile`.

## State

`useNetwork()` is the only client store. It throws if a view renders outside `NetworkProvider`.

| Data | Where it lives | Key |
| --- | --- | --- |
| Profile draft (name, handle, role, org, bio, location, photo) | `localStorage` | `4sight-profile` |
| Completed lessons (`courseId:lessonId`) | `localStorage` | `4sight-learn-progress-v2` |
| Issued certificate | `localStorage` | `4sight-certificate` |
| Posts, likes, joins, read notices, Copilot messages | React state | — |

The signed-in person is always `ME_ID` (`angelo`) with the saved profile applied on top. Other people, groups, courses, notices, and the opening Copilot line are constants. New posts are prepended with `tab: "all"`. Likes toggle a count. Joins start with `builders` already joined and `p1` already liked.

Profile photos are read in the browser, scaled so the long edge is at most 640px, and stored as a JPEG data URL. Non-images are rejected.

Lesson completion is append-only in this build. There is no “mark incomplete.”

## Tech news

`GET /api/tech-news` is `force-dynamic`. `loadTechNews()` fetches four feeds with an 8 second timeout and a 300 second revalidate hint:

- BBC News technology
- Ars Technica
- The Verge
- Hacker News frontpage

Items are classified by title into Threat, Agents, Models, Policy, Security, or Tech. The picker keeps six items, prefers two per source, and drops near-duplicate titles. If every feed fails, the response is `{ live: false, items: TECH_NEWS }` from `lib/data.ts`. The home panel subscribes on the client and refetches through that route. External links must be `http` or `https`.

## Copilot

`ask()` appends the user line and a reply from `replyTo()` in `lib/data.ts`. The matcher looks for trust, groups, learning, threats, collaboration, and posts. Anything else gets the lane list: explain a topic, find a learning path, discover groups, analyze a threat, or look for a collaboration. Chips on the home card and the Copilot page send those phrases. The transcript resets on refresh.

## Jobs

`generateJobSearch()` in `lib/jobs.ts` maps a role track to a Boolean query and builds LinkedIn, Indeed, and Google URLs. Tracks follow academy progress: the suggested track is the course with the highest percent complete (AI Engineer if none are started). The pitch names the member and any in-progress paths. Openings are the three `NETWORK_JOBS` rows that best match the track. They link to groups or courses inside the app.

## Certificate lookup

`lookupCertificate(id)` returns the certificate only when it is the one stored in this browser and the id matches `4SA-CAFP-XXXX-XXXX`. The seal prints `www.4sightai.net/verify/{id}`. The in-app page is `/certificate/verify/[id]`. There is no public verification service behind that hostname in this repo.

## Seed graph

The home stats are fixed copy: 18,421 members, 4,832 discussions, 673 projects, 127 active groups.

The emblem orbit is seven nodes: AI Agents, Data, Devices, Community, Cloud, Businesses, People. They link to Explore, Feed, Groups, or Profile.

Groups and their trust floors:

| Id | Name | Floor |
| --- | --- | --- |
| `builders` | AI Builders | 40 |
| `cyber` | Cybersecurity | 50 |
| `founders` | Startup Founders | 45 |
| `prompt` | Prompt Engineering | 35 |
| `privacy` | Privacy & Ethics | 55 |

The group page disables Join when `me.trust` is under the floor. The home “Join” control does not apply that check. Angelo’s seed trust is 98, so every room is open for the default profile. Trust itself is not recomputed from activity.
