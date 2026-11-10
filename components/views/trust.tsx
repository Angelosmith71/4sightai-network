"use client"

import { Glass, SectionLabel } from "@/components/glass"
import { TrustRing } from "@/components/trust-ring"
import { useNetwork } from "@/lib/network-store"

const FACTORS = [
  { label: "Endorsements", value: "128", note: "Top Contributor this month" },
  { label: "Signed reviews", value: "24", note: "Threat alerts + evals" },
  { label: "Academy complete", value: "1", note: "Prompt Engineering Foundations" },
  { label: "Reports against you", value: "0", note: "Guardian clean" },
  { label: "Tenure", value: "Founder", note: "Network origin" },
  { label: "Floor you clear", value: "80+", note: "Every public room" },
]

export function TrustView() {
  const { me } = useNetwork()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel>Guardian</SectionLabel>
          <h1 className="font-heading text-3xl">Trust dashboard</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Trust is earned in reviews and incidents, not in likes. Weaponizing a score is a Guardian offense.
          </p>
        </div>
        <TrustRing value={me.trust} guardian={me.guardian} size={110} />
      </header>

      <Glass className="p-5">
        <p className="text-sm leading-relaxed">
          {me.name} holds <span className="text-electric">Founder</span> standing at {me.trust}. Trust is earned in
          reviews and incidents, not likes. The live graph is moving on Sarah Chen’s voice-cloning alert.
        </p>
      </Glass>

      <ul className="grid gap-3 sm:grid-cols-2">
        {FACTORS.map((f) => (
          <li key={f.label}>
            <Glass className="p-4">
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="font-heading text-2xl">{f.value}</p>
              <p className="text-xs text-muted-foreground">{f.note}</p>
            </Glass>
          </li>
        ))}
      </ul>
    </div>
  )
}
