import { cn } from "@/lib/utils"
import type { Person } from "@/lib/types"

export function Avatar({
  person,
  size = "md",
}: {
  person: Person
  size?: "sm" | "md" | "lg"
}) {
  const dim = size === "sm" ? "size-8 text-[11px]" : size === "lg" ? "size-16 text-xl" : "size-10 text-sm"
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white ring-2 ring-white/15",
        dim
      )}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${person.hue}, color-mix(in srgb, ${person.hue} 40%, #05070c))`,
      }}
      aria-hidden
    >
      {person.initials}
    </span>
  )
}
