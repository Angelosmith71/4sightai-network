"use client"

import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { Button } from "@/components/ui/button"
import { useNetwork } from "@/lib/network-store"
import type { Course, Lesson, Notice } from "@/lib/types"
import { cn } from "@/lib/utils"

const KIND: Record<string, string> = {
  mention: "Mention",
  group: "Group",
  trust: "Trust",
  learn: "Learn",
}

function NoticeCard({ n, seen }: { n: Notice; seen: boolean }) {
  return (
    <Glass className={cn("p-4", !seen && "ring-1 ring-electric/35")}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] tracking-wide text-electric uppercase">{KIND[n.kind]}</span>
        <span className="text-xs text-muted-foreground">{n.time}</span>
      </div>
      <p className="mt-1 text-sm font-medium">{n.title}</p>
      <p className="text-sm text-muted-foreground">{n.body}</p>
    </Glass>
  )
}

function withLiveLearn(
  n: Notice,
  href: string,
  courses: Course[],
  nextOf: (course: Course) => Lesson | undefined
): Notice {
  if (n.kind !== "learn") return n.href ? n : { ...n, href }
  const agents = courses.find((c) => c.id === "agents")
  if (!agents) return { ...n, href }
  const next = nextOf(agents)
  if (!next) {
    return {
      ...n,
      title: "AI Agents complete",
      body: "Path finished. Review any lesson or open another course.",
      href: `/learn/${agents.id}`,
    }
  }
  const index = agents.lessons.findIndex((l) => l.id === next.id)
  return {
    ...n,
    title: `Continue ${agents.title}`,
    body: `You left off at lesson ${index + 1} of ${agents.lessons.length} — ${next.title.toLowerCase()}.`,
    href: `/learn/${agents.id}/${next.id}`,
  }
}

export function NotificationsView() {
  const { notices, read, markRead, courses, nextOf, continueHref } = useNetwork()
  const unread = notices.filter((n) => !read.includes(n.id))

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <SectionLabel>Inbox</SectionLabel>
          <h1 className="font-heading text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unread.length === 0 ? "Caught up." : `${unread.length} unread.`}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => markRead()} disabled={unread.length === 0}>
          Mark all read
        </Button>
      </header>

      {notices.length === 0 ? (
        <EmptyNote title="No notices" body="When someone mentions you or a trust event lands, it shows here." />
      ) : (
        <ul className="flex flex-col gap-2">
          {notices.map((raw) => {
            const n = withLiveLearn(raw, continueHref, courses, nextOf)
            const seen = read.includes(n.id)
            return (
              <li key={n.id}>
                {n.href ? (
                  <Link href={n.href} onClick={() => markRead(n.id)} className="block">
                    <NoticeCard n={n} seen={seen} />
                  </Link>
                ) : (
                  <button type="button" onClick={() => markRead(n.id)} className="w-full text-left">
                    <NoticeCard n={n} seen={seen} />
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
