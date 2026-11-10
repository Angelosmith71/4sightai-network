"use client"

import Link from "next/link"
import { Heart, Lightbulb, MessageCircle, ThumbsUp } from "lucide-react"
import { Avatar } from "@/components/avatar"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { group, person } from "@/lib/data"
import { useNetwork } from "@/lib/network-store"
import type { Post } from "@/lib/types"
import { cn } from "@/lib/utils"

export function PostCard({ post, compact }: { post: Post; compact?: boolean }) {
  const { liked, toggleLike } = useNetwork()
  const author = person(post.authorId)
  const g = post.groupId ? group(post.groupId) : undefined
  if (!author) return null
  const isLiked = liked.includes(post.id)

  return (
    <Glass className={cn(compact ? "p-3" : "p-4 sm:p-5")}>
      <div className="flex gap-3">
        <Avatar person={author} size={compact ? "sm" : "md"} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {author.id === "angelo" ? (
              <Link href="/profile" className="text-sm font-medium hover:text-electric">
                {author.name}
              </Link>
            ) : (
              <span className="text-sm font-medium">{author.name}</span>
            )}
            {author.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-electric/15 px-1.5 py-0.5 text-[10px] text-electric"
              >
                {b}
              </span>
            ))}
            <span className="text-xs text-muted-foreground">{post.time}</span>
          </div>
          {g && !compact ? (
            <Link href={`/groups/${g.id}`} className="text-[11px] text-electric/80 hover:text-electric">
              {g.name}
            </Link>
          ) : null}
          <p className={cn("mt-1 leading-relaxed text-foreground/90", compact ? "text-xs" : "text-sm")}>
            {post.body}
          </p>
          {post.threat ? (
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-guardian/15 px-2 py-0.5 text-[10px] text-guardian">
              Verified Threat
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1">
            <Button
              variant="ghost"
              size="xs"
              className={cn("gap-1", isLiked && "text-guardian")}
              onClick={() => toggleLike(post.id)}
            >
              <Heart className={cn("size-3", isLiked && "fill-current")} />
              {post.likes}
            </Button>
            <span className="inline-flex items-center gap-1 px-1 text-[11px] text-muted-foreground">
              <ThumbsUp className="size-3" />
              Helpful {post.helpful}
            </span>
            <span className="inline-flex items-center gap-1 px-1 text-[11px] text-muted-foreground">
              <Lightbulb className="size-3" />
              Insightful {post.insightful}
            </span>
            {!compact ? (
              <span className="inline-flex items-center gap-1 px-1 text-[11px] text-muted-foreground">
                <MessageCircle className="size-3" />
                {post.comments}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Glass>
  )
}
