import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 py-16">
      <p className="text-[11px] tracking-[0.2em] text-electric uppercase">404</p>
      <h1 className="font-heading text-3xl">Not on the graph</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        That URL is not a room in 4SightAI Network. Try home, the feed, groups, learn, Copilot, or
        your profile.
      </p>
      <div>
        <Link href="/" className={cn(buttonVariants(), "inline-flex")}>
          Back to the emblem
        </Link>
      </div>
    </div>
  )
}
