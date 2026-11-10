"use client"

import { useState } from "react"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNetwork } from "@/lib/network-store"

export function FeedView() {
  const { posts, groups, compose } = useNetwork()
  const [body, setBody] = useState("")
  const [groupId, setGroupId] = useState("")

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <SectionLabel>Community</SectionLabel>
        <h1 className="font-heading text-3xl">Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Incident notes, evals, and the occasional honest cost story. No growth-hack threads.
        </p>
      </header>

      <Glass className="p-4">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share something the graph should remember…"
          rows={3}
        />
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="h-8 rounded-lg border border-white/10 bg-transparent px-2.5 text-sm"
          >
            <option value="">Post to the network</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <Button
            disabled={!body.trim()}
            onClick={() => {
              compose(body.trim(), groupId || undefined)
              setBody("")
            }}
          >
            Publish
          </Button>
        </div>
      </Glass>

      {posts.length === 0 ? (
        <EmptyNote
          title="The feed is quiet"
          body="Publish the first note, or wait for Guardian Circle to drop the next digest."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
