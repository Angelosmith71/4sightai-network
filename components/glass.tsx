import { cn } from "@/lib/utils"

export function Glass({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_0_48px_-16px_rgba(77,184,255,0.45)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.22em] text-electric/80 uppercase">
      {children}
    </p>
  )
}
