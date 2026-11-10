"use client"

import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { useNetwork } from "@/lib/network-store"

export function GroupsView() {
  const { groups, joined, toggleJoin } = useNetwork()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <SectionLabel>Directory</SectionLabel>
        <h1 className="font-heading text-3xl">Groups</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Rooms with a trust floor. Join the ones you can actually contribute to.
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <li key={g.id}>
            <Glass className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{g.topic}</p>
                  <Link href={`/groups/${g.id}`} className="font-heading text-2xl hover:text-electric">
                    {g.name}
                  </Link>
                </div>
                <span
                  className="mt-1 size-2.5 rounded-full"
                  style={{ background: g.hue, boxShadow: `0 0 12px ${g.hue}` }}
                />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
              <div className="mt-4 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  {g.members.toLocaleString()} members · trust ≥ {g.trustFloor}
                </span>
                <Button size="sm" variant={joined.includes(g.id) ? "outline" : "default"} onClick={() => toggleJoin(g.id)}>
                  {joined.includes(g.id) ? "Leave" : "Join"}
                </Button>
              </div>
            </Glass>
          </li>
        ))}
      </ul>
    </div>
  )
}
