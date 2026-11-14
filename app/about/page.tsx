import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata = { title: "About Us" }

const PILLARS = [
  {
    title: "Learn",
    body: "Free academy paths in AI fundamentals, prompt engineering, agents, and cybersecurity — taught by people with Guardian standing.",
  },
  {
    title: "Connect",
    body: "Groups, projects, and a live feed for builders who would rather show an eval than a keynote.",
  },
  {
    title: "Trust",
    body: "Guardian standing is earned in reviews and incidents, not likes. Weaponizing a score is an offense.",
  },
  {
    title: "Stay safe",
    body: "Threat alerts — like cloned-voice CEO scams — sit next to the work, so operators can freeze a run before money moves.",
  },
]

export default function Page() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <SectionLabel>About us</SectionLabel>
        <h1 className="font-heading text-3xl sm:text-4xl">
          The world’s first AI learning, networking, collaboration, and trust ecosystem.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          4SightAI Network exists so people can learn AI, ship with a kill switch, and recognize each
          other by standing — not by a follower count. Safer. Smarter. More connected.
        </p>
      </header>

      <Glass className="p-6">
        <SectionLabel>Mission</SectionLabel>
        <p className="mt-2 text-sm leading-relaxed">
          AI has the power to transform lives. We built a network where that power is taught in public,
          reviewed in public, and stopped when it should be. The seven nodes on the emblem — AI Agents,
          People, Data, Devices, Community, Cloud, and Businesses — are the graph we actually operate,
          not a slide.
        </p>
      </Glass>

      <ul className="grid gap-3 sm:grid-cols-2">
        {PILLARS.map((pillar) => (
          <li key={pillar.title}>
            <Glass className="h-full p-5">
              <p className="font-heading text-xl">{pillar.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </Glass>
          </li>
        ))}
      </ul>

      <Glass className="p-6">
        <SectionLabel>Founder</SectionLabel>
        <h2 className="mt-1 font-heading text-2xl">Angelo Smith</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Angelo founded 4SightAI Network to put learning, collaboration, and Guardian standing in one
          place. The academy, the feed, and the CAFP certificate are how that shows up: evidence over
          hype, confirmations on writes, and a paper trail you can defend.
        </p>
      </Glass>

      <Glass className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-xl">Join the graph</p>
          <p className="text-sm text-muted-foreground">
            Course access is free. The official CAFP print and download is $10 after you finish the
            academy. www.4sightai.net
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn" className={cn(buttonVariants())}>
            Open the academy
          </Link>
          <Link href="/feed" className={cn(buttonVariants({ variant: "outline" }))}>
            Read the feed
          </Link>
        </div>
      </Glass>
    </div>
  )
}
