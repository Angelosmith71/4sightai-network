import { cn } from "@/lib/utils"

export function TrustRing({
  value,
  size = 88,
  guardian,
}: {
  value: number
  size?: number
  guardian?: boolean
}) {
  const r = 36
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(100, Math.max(0, value)) / 100)
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 88 88" className="size-full -rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke={guardian ? "url(#guardian)" : "url(#electric)"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="electric" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ae0ff" />
            <stop offset="100%" stopColor="#3d9eff" />
          </linearGradient>
          <linearGradient id="guardian" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b81" />
            <stop offset="100%" stopColor="#4db8ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-lg leading-none">{value}</span>
        <span className={cn("text-[9px] tracking-widest uppercase", guardian ? "text-guardian" : "text-muted-foreground")}>
          {guardian ? "Guard" : "Trust"}
        </span>
      </div>
    </div>
  )
}
