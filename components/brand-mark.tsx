import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/logo-mark.webp"
      alt=""
      width={size}
      height={size}
      unoptimized
      priority
      className={cn(
        "shrink-0 rounded-full ring-1 ring-electric/40 shadow-[0_0_16px_rgba(77,184,255,0.35)]",
        className
      )}
    />
  )
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark size={compact ? 40 : 44} />
      <span className="leading-none">
        <span className="block bg-gradient-to-b from-white to-sky-200/90 bg-clip-text font-heading text-[1.05rem] font-semibold tracking-tight text-transparent sm:text-xl">
          4SightAI
        </span>
        <span className="mt-0.5 hidden text-[9px] font-medium tracking-[0.36em] text-sky-200/85 uppercase sm:block">
          Network
        </span>
      </span>
    </span>
  )
}
