"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { group as findGroup } from "@/lib/data"
import { useNetwork } from "@/lib/network-store"

export function GroupDetailView() {
  const params = useParams<{ id: string }>()
  const id = String(params?.id ?? "")
  const g = findGroup(id)
  const { posts, joined, toggleJoin, me } = useNetwork()
  if (!g) {
    return (
      <EmptyNote
        title="Group not on the graph"
        body="That room does not exist in this network snapshot."
      />
    )
  }
  const inGroup = joined.includes(g.id)
  const blocked = me.trust < g.trustFloor
  const groupPosts = posts.filter((p) => p.groupId === g.id)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <Link href="/groups" className="text-sm text-electric hover:underline">
        ← Directory
      </Link>
      <Glass className="p-6">
        <SectionLabel>{g.topic}</SectionLabel>
        <h1 className="font-heading text-3xl">{g.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {g.members.toLocaleString()} members · trust floor {g.trustFloor}
        </p>
        <div className="mt-4">
          <Button
            disabled={blocked && !inGroup}
            variant={inGroup ? "outline" : "default"}
            onClick={() => toggleJoin(g.id)}
          >
            {inGroup ? "Leave group" : blocked ? `Need trust ${g.trustFloor}` : "Join group"}
          </Button>
        </div>
      </Glass>
      {groupPosts.length === 0 ? (
        <EmptyNote title="No posts yet" body="When members publish here, they will land on this wall." />
      ) : (
        groupPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}
