"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ORBIT_NODES } from "@/lib/data"
import { cn } from "@/lib/utils"

export function NetworkEmblem({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={cn("relative z-20 mx-auto w-full max-w-[min(32rem,78vw)]", className)}>
      <div className="emblem-glow pointer-events-none absolute inset-[-10%] rounded-full" />
      <div className="pointer-events-none absolute inset-x-[-6%] -bottom-[16%] h-24">
        <div className="holo-ellipse absolute inset-x-[2%] bottom-2 h-11" />
        <div className="holo-ellipse absolute inset-x-[12%] bottom-5 h-8 opacity-70" />
        <div className="holo-ellipse absolute inset-x-[22%] bottom-7 h-5 opacity-50" />
      </div>
      <div className="relative aspect-square overflow-hidden rounded-full">
        <Image
          src="/emblem.webp"
          alt="4SightAI Network emblem: Intelligence, Automation, Connectivity"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 78vw, 512px"
          className="pointer-events-none object-cover [clip-path:circle(50%_at_50%_50%)]"
        />
        {ORBIT_NODES.map((node) => {
          const on = active === node.id
          return (
            <Link
              key={node.id}
              href={node.href}
              title={node.label}
              aria-label={node.label}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none",
                "cursor-pointer focus-visible:ring-2 focus-visible:ring-electric",
                on
                  ? "bg-electric/25 shadow-[0_0_28px_rgba(77,184,255,0.8)] ring-2 ring-electric"
                  : "hover:bg-electric/15 hover:ring-2 hover:ring-electric/90"
              )}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: "16%",
                height: "16%",
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
