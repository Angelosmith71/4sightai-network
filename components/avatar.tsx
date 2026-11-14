import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Person } from "@/lib/types"

const SIZE = {
  sm: "size-8 text-[11px]",
  md: "size-10 text-sm",
  lg: "size-16 text-xl",
  xl: "size-24 text-2xl",
} as const

export function Avatar({
  person,
  size = "md",
}: {
  person: Person
  size?: keyof typeof SIZE
}) {
  const dim = SIZE[size]
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt=""
        width={96}
        height={96}
        unoptimized
        className={cn("inline-block shrink-0 rounded-full object-cover ring-2 ring-white/15", dim)}
      />
    )
  }
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
