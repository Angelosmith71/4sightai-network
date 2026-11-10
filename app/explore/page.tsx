import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"

export const metadata = { title: "Explore" }

const LANES = [
  { href: "/learn", title: "Learn", body: "Academy paths from fundamentals to agents." },
  { href: "/feed", title: "Collaborate", body: "The live feed, groups, and 673 open projects." },
  { href: "/explore", title: "Innovate", body: "Devices, data, cloud, and AI agents on the emblem." },
  { href: "/trust", title: "Stay Safe", body: "Guardian standing and verified threat alerts." },
  { href: "/groups", title: "Grow Together", body: "127 active groups. Join the ones you can contribute to." },
]

export default function Page() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <SectionLabel>Watch our story</SectionLabel>
        <h1 className="font-heading text-3xl">People. Ideas. Technology. A safer world.</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          AI has the power to transform lives. 4SightAI Network exists so it does — safely, together.
        </p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {LANES.map((lane) => (
          <li key={lane.title}>
            <Link href={lane.href}>
              <Glass className="h-full p-5 transition hover:border-electric/40">
                <p className="font-heading text-xl">{lane.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lane.body}</p>
              </Glass>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
