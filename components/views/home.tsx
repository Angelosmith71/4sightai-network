"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Briefcase,
  Cpu,
  GraduationCap,
  Lock,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Users,
} from "lucide-react"
import { HeroBackdrop } from "@/components/hero-backdrop"
import { NetworkEmblem } from "@/components/emblem"
import { Glass } from "@/components/glass"
import { PostCard } from "@/components/post-card"
import { JobSearchPanel } from "@/components/job-search"
import { TechNewsPanel } from "@/components/tech-news"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { COPILOT_CHIPS, NETWORK_STATS } from "@/lib/data"
import { EVENTS } from "@/lib/events"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

const TILES = [
  { href: "/learn", label: "AI Learning", hint: "Build skills for tomorrow", icon: GraduationCap },
  { href: "/feed", label: "Community", hint: "Join conversations", icon: Users },
  { href: "/trust", label: "Trust Network", hint: "Earn. Build. Belong.", icon: Shield },
  { href: "/explore", label: "Opportunities", hint: "Projects, Jobs, Partnerships", icon: Briefcase },
  { href: "/explore", label: "Real-World Impact", hint: "A safer, smarter future", icon: Sparkles },
]

const PILLARS = ["Learn", "Collaborate", "Innovate", "Stay Safe", "Grow Together"]

const FEED_TABS = [
  { id: "all", label: "All" },
  { id: "following", label: "Following" },
  { id: "popular", label: "Popular" },
  { id: "threat", label: "Threat Alerts" },
  { id: "projects", label: "Projects" },
] as const

const GROUP_ICONS = {
  cpu: Cpu,
  shield: Shield,
  rocket: Rocket,
  spark: Sparkles,
  lock: Lock,
} as const

export function HomeView() {
  const { posts, groups, courses, joined, toggleJoin, ask, progressOf, nextOf, continueHref, messages } =
    useNetwork()
  const [tab, setTab] = useState<(typeof FEED_TABS)[number]["id"]>("all")
  const [prompt, setPrompt] = useState("")
  const feed = posts.filter((p) => tab === "all" || p.tab === tab || (tab === "threat" && p.threat))
  const resumeCourse =
    courses.find((c) => {
      const progress = progressOf(c)
      return progress > 0 && progress < 100
    }) ?? courses.find((c) => progressOf(c) === 0)
  const resumeLesson = resumeCourse ? nextOf(resumeCourse) : undefined
  const resumeIndex = resumeCourse
    ? resumeCourse.lessons.findIndex((l) => l.id === resumeLesson?.id)
    : -1
  const resuming = Boolean(resumeCourse && progressOf(resumeCourse) > 0)

  return (
    <div className="hero-sky">
      <HeroBackdrop />
      <section className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-6 px-4 pt-8 pb-12 sm:px-6 lg:grid-cols-[1fr_minmax(280px,32rem)_1fr] lg:pt-10">
        <div className="relative z-10 max-w-md">
          <p className="text-[11px] font-medium tracking-[0.22em] text-electric uppercase">
            A safer · smarter · more connected tomorrow
          </p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Learn AI.
            <br />
            Build Trust.
            <br />
            Connect the Future.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-sky-100/75">
            The world’s first AI learning, networking, collaboration, and trust ecosystem.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/groups"
              className="inline-flex h-10 items-center rounded-full bg-electric px-5 text-sm font-medium text-[#041018] shadow-[0_0_24px_rgba(77,184,255,0.45)]"
            >
              Join the Network
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex h-10 items-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium"
            >
              Start Learning
            </Link>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {NETWORK_STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] text-muted-foreground">{s.label}</dt>
                <dd className="font-heading text-xl text-white sm:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <NetworkEmblem />

        <div className="relative z-10 hidden max-w-sm justify-self-end lg:block">
          <p className="font-heading text-2xl leading-tight tracking-wide text-white/90">
            PEOPLE
            <br />
            IDEAS
            <br />
            TECHNOLOGY
            <br />
            <span className="text-electric">A SAFER WORLD</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-sky-100/70">
            “AI has the power to transform lives. We’re here to make sure it does — safely, together.”
            <span className="mt-1 block text-xs text-muted-foreground">— 4SightAI Network</span>
          </p>
          <Link
            href="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm"
          >
            <span className="grid size-7 place-items-center rounded-full bg-electric text-[#041018]">
              <Play className="size-3.5 fill-current" />
            </span>
            Watch Our Story
          </Link>
          <ul className="mt-6 space-y-1.5 text-xs tracking-[0.18em] text-sky-100/70 uppercase">
            {PILLARS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-electric" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-[1440px] gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {TILES.map((tile) => {
          const Icon = tile.icon
          return (
            <Link key={tile.label} href={tile.href}>
              <Glass className="flex items-center gap-3 px-4 py-3 transition hover:border-electric/40">
                <span className="grid size-10 place-items-center rounded-xl bg-electric/15 text-electric">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{tile.label}</span>
                  <span className="text-xs text-muted-foreground">{tile.hint}</span>
                </span>
              </Glass>
            </Link>
          )
        })}
      </section>

      <section className="relative z-10 mx-auto mt-4 grid max-w-[1440px] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[1fr_1.25fr_1fr_1fr]">
        <div className="flex h-full flex-col gap-4">
          <Glass className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Trending Groups</h2>
              <Link href="/groups" className="text-xs text-electric">
                View All
              </Link>
            </div>
            <ul className="space-y-2">
              {groups.map((g) => {
                const Icon = GROUP_ICONS[g.icon]
                return (
                  <li key={g.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-2 py-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-electric/10 text-electric">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link href={`/groups/${g.id}`} className="block truncate text-sm hover:text-electric">
                        {g.name}
                      </Link>
                      <p className="text-[11px] text-muted-foreground">{g.members.toLocaleString()} members</p>
                    </div>
                    <Button
                      size="xs"
                      variant={joined.includes(g.id) ? "outline" : "default"}
                      onClick={() => toggleJoin(g.id)}
                    >
                      {joined.includes(g.id) ? "Joined" : "Join"}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </Glass>

          <TechNewsPanel />
        </div>

        <Glass className="flex h-full flex-col p-4 lg:col-span-1">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-medium">Live Community Feed</h2>
            <Link
              href="/feed"
              className="rounded-full bg-electric px-3 py-1 text-[11px] font-medium text-[#041018]"
            >
              Create Post
            </Link>
          </div>
          <div className="mb-3 flex flex-wrap gap-1">
            {FEED_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px]",
                  tab === t.id ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {feed.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">Nothing in this lane yet.</p>
            ) : (
              feed.map((post) => <PostCard key={post.id} post={post} compact />)
            )}
          </div>
        </Glass>

        <div className="flex h-full flex-col gap-4">
          <Glass className="flex flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">My Learning Journey</h2>
              <Link href="/learn" className="text-xs text-electric">
                View All
              </Link>
            </div>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link href={`/learn/${c.id}`} className="block">
                    <div className="flex items-center justify-between text-sm">
                      <span>{c.title}</span>
                      <span className="font-mono text-xs text-electric">{progressOf(c)}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-electric"
                        style={{ width: `${progressOf(c)}%` }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {resumeCourse && resumeLesson ? (
              <Link
                href={continueHref}
                className="mt-4 flex items-center justify-between rounded-xl border border-electric/30 bg-electric/10 px-3 py-2 text-sm"
              >
                <span>
                  <span className="block text-[11px] text-electric">
                    {resuming ? "Continue Learning" : "Start Learning"}
                  </span>
                  {resumeCourse.title} · Lesson {resumeIndex + 1} of {resumeCourse.lessons.length}
                </span>
                <Play className="size-4 text-electric" />
              </Link>
            ) : (
              <Link
                href="/learn"
                className="mt-4 flex items-center justify-between rounded-xl border border-white/15 px-3 py-2 text-sm"
              >
                <span>
                  <span className="block text-[11px] text-electric">Academy</span>
                  All paths complete — review any course
                </span>
              </Link>
            )}
          </Glass>

          <JobSearchPanel />
        </div>

        <div className="flex h-full flex-col gap-4">
          <Glass className="p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium">4SightAI Copilot</h2>
              <Link href="/copilot" className="text-xs text-electric">
                Open
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COPILOT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => ask(chip)}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-electric/40 hover:text-foreground"
                >
                  {chip}
                </button>
              ))}
            </div>
            {messages.length > 1 ? (
              <p className="mt-3 line-clamp-4 rounded-xl bg-white/5 px-3 py-2 text-xs leading-relaxed text-sky-100/80">
                {messages[messages.length - 1]?.text}
              </p>
            ) : null}
            <form
              className="mt-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                ask(prompt)
                setPrompt("")
              }}
            >
              <Input
                value={prompt}
                onValueChange={setPrompt}
                placeholder="Ask the network…"
                className="flex-1"
              />
              <Button type="submit" disabled={!prompt.trim()} size="sm">
                Ask
              </Button>
            </form>
          </Glass>

          <Glass className="flex flex-1 flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">Upcoming Events</h2>
              <Link href="/events" className="text-xs text-electric">
                View All
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              {EVENTS.map((event) => (
                <li key={event.title}>
                  <Link
                    href={event.href}
                    className="block rounded-xl bg-white/5 px-3 py-2 transition hover:bg-white/[0.08]"
                  >
                    <p className="text-[11px] text-electric">{event.when}</p>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-[11px] text-muted-foreground">{event.where}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Glass>
        </div>
      </section>
    </div>
  )
}
