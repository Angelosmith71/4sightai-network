import { Glass, SectionLabel } from "@/components/glass"

export const metadata = { title: "Events" }

const EVENTS = [
  {
    title: "Prompt Engineering live studio",
    when: "Thu · 18:00 ET",
    where: "AI Builders",
  },
  {
    title: "Voice-cloning threat briefing",
    when: "Fri · 12:00 ET",
    where: "Cybersecurity",
  },
  {
    title: "Founder office hours",
    when: "Sat · 10:00 ET",
    where: "Startup Founders",
  },
]

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
            <Glass className="p-4">
              <p className="text-xs text-electric">{event.when}</p>
              <p className="font-heading text-xl">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.where}</p>
            </Glass>
          </li>
        ))}
      </ul>
    </div>
  )
}
