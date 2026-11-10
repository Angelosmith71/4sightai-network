"use client"

import Link from "next/link"
import { Avatar } from "@/components/avatar"
import { Glass, SectionLabel } from "@/components/glass"
import { PostCard } from "@/components/post-card"
import { TrustRing } from "@/components/trust-ring"
import { useNetwork } from "@/lib/network-store"

export function ProfileView() {
  const { me, posts, groups, joined, courses, progressOf, academyDone, certificate } = useNetwork()
  const mine = posts.filter((p) => p.authorId === me.id)
  const myGroups = groups.filter((g) => joined.includes(g.id))
  const done = courses.filter((c) => progressOf(c) === 100)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Glass className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <Avatar person={me} size="lg" />
          <div className="min-w-0 flex-1">
            <SectionLabel>Profile</SectionLabel>
            <h1 className="font-heading text-3xl">{me.name}</h1>
            <p className="text-sm text-muted-foreground">
              @{me.handle} · {me.role} at {me.org} · {me.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {me.badges.map((b) => (
                <span key={b} className="rounded-full bg-electric/15 px-2 py-0.5 text-[11px] text-electric">
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed">{me.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {myGroups.map((g) => (
                <Link
                  key={g.id}
                  href={`/groups/${g.id}`}
                  className="rounded-full border border-white/10 px-2.5 py-1 hover:border-electric/40"
                >
                  {g.name}
                </Link>
              ))}
              {done.map((c) => (
                <Link
                  key={c.id}
                  href={`/learn/${c.id}`}
                  className="rounded-full bg-electric/10 px-2.5 py-1 text-electric"
                >
                  {c.title}
                </Link>
              ))}
              {academyDone ? (
                <Link
                  href="/certificate"
                  className="rounded-full bg-electric/10 px-2.5 py-1 text-electric"
                >
                  {certificate ? "CAFP certificate" : "Issue CAFP · $10"}
                </Link>
              ) : null}
            </div>
          </div>
          <TrustRing value={me.trust} guardian={me.guardian} />
        </div>
      </Glass>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl">Activity</h2>
        {mine.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  )
}
