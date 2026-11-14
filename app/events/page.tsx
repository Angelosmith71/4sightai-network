import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"
import { EVENTS } from "@/lib/events"

export const metadata = { title: "Events" }

export default function Page() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <SectionLabel>Calendar</SectionLabel>
        <h1 className="font-heading text-3xl">Events</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live studios, threat briefings, and office hours on the network.
        </p>
      </header>
      <ul className="flex flex-col gap-3">
        {EVENTS.map((event) => (
          <li key={event.title}>
            <Link href={event.href}>
              <Glass className="p-4 transition hover:border-electric/40">
                <p className="text-xs text-electric">{event.when}</p>
                <p className="font-heading text-xl">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.where}</p>
              </Glass>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
