"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { Glass } from "@/components/glass"
import { TECH_NEWS } from "@/lib/data"
import {
  getTechNewsServerSnapshot,
  getTechNewsSnapshot,
  refreshTechNews,
  subscribeTechNews,
} from "@/lib/tech-news-client"
import type { TechNews } from "@/lib/types"
import { cn } from "@/lib/utils"

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

function NewsRow({ item }: { item: TechNews }) {
  const className =
    "block rounded-xl bg-white/5 px-3 py-2 transition hover:bg-white/[0.08]"
  const body = (
    <>
      <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className={item.tag === "Threat" ? "text-guardian" : "text-electric"}>{item.tag}</span>
        <span className="truncate">{item.source}</span>
        <span className="ml-auto shrink-0 font-mono">{item.time}</span>
      </p>
      <p className="mt-1 line-clamp-2 text-sm leading-snug">{item.title}</p>
    </>
  )
  if (isExternal(item.href)) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  )
}

export function TechNewsPanel() {
  const { status, feed } = useSyncExternalStore(
    subscribeTechNews,
    getTechNewsSnapshot,
    getTechNewsServerSnapshot
  )
  const items = feed.items.length > 0 ? feed.items : TECH_NEWS
  const showSkeleton = status === "loading" && !feed.live && items === TECH_NEWS

  return (
    <Glass className="flex flex-1 flex-col p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Tech News</h2>
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] tracking-wide uppercase",
              feed.live && status !== "error"
                ? "bg-electric/15 text-electric"
                : "bg-white/10 text-muted-foreground"
            )}
          >
            {status === "loading" ? "Updating" : feed.live ? "Live" : "Snapshot"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => void refreshTechNews()}
          className="text-xs text-electric hover:underline"
        >
          Refresh
        </button>
      </div>
      {status === "error" ? (
        <p className="mb-2 text-[11px] text-muted-foreground">
          Live wire unavailable. Showing the last snapshot.
        </p>
      ) : null}
      {showSkeleton ? (
        <ul className="flex flex-1 flex-col gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className="h-[4.25rem] animate-pulse rounded-xl bg-white/5" />
          ))}
        </ul>
      ) : items.length === 0 ? (
        <p className="py-6 text-center text-xs text-muted-foreground">No briefs in this snapshot yet.</p>
      ) : (
        <ul className="flex flex-1 flex-col gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <NewsRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </Glass>
  )
}
