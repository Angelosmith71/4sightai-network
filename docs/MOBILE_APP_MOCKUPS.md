# Mobile screens

Under the `lg` breakpoint the top nav is hidden. A fixed five-tab bar sits on the bottom:

**Home · Groups · Learn · Copilot · Profile**

The active tab is electric. The footer adds extra bottom padding so the copyright line clears the bar.

## What changes

- The home hero drops the right-hand “People. Ideas. Technology.” column. The emblem stacks under the headline. Stats stay a 2-column grid until `sm`, then four.
- The five tiles are two columns until `lg`, then five.
- The home board stacks: groups and news, feed, learning and jobs, Copilot and events.
- Search is an icon until `md`, then the rounded field.
- The welcome name beside the avatar is hidden until `lg`. The avatar itself shows from `sm` up; below that, Profile is the tab.

## Same pages

Feed, a group, a lesson, the certificate, events, trust, explore, about, and notifications use the same views. They are just narrower. Lesson and certificate actions stay full width. The certificate print stylesheet still strips the tab bar.

There is no separate native app in this repo. This is the responsive web shell.
