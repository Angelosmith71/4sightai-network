"use client"

import { useState } from "react"
import Link from "next/link"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateJobSearch, ROLE_TRACKS, suggestedTrack } from "@/lib/jobs"
import { useNetwork } from "@/lib/network-store"
import type { JobSearch } from "@/lib/types"

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function JobSearchPanel() {
  const { me, courses, progressOf } = useNetwork()
  const defaultTrack = suggestedTrack(progressOf, courses)
  const [trackId, setTrackId] = useState<string>(defaultTrack)
  const [location, setLocation] = useState(me.location || "Remote")
  const [result, setResult] = useState<JobSearch>(() =>
    generateJobSearch(defaultTrack, me.location || "Remote", me, courses, progressOf)
  )
  const [copied, setCopied] = useState<"query" | "pitch" | null>(null)

  const empty = result.openings.length === 0

  function generate() {
    setCopied(null)
    setResult(generateJobSearch(trackId, location, me, courses, progressOf))
  }

  async function copy(kind: "query" | "pitch") {
    const ok = await copyText(kind === "query" ? result.query : result.pitch)
    if (ok) {
      setCopied(kind)
      window.setTimeout(() => setCopied(null), 1600)
    }
  }

  return (
    <Glass className="flex flex-1 flex-col p-4">
      <div className="mb-3">
        <h2 className="text-sm font-medium">Job Search Generator</h2>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-muted-foreground">
          Role
          <select
            value={trackId}
            onChange={(event) => setTrackId(event.target.value)}
            className="mt-1 h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            {ROLE_TRACKS.map((track) => (
              <option key={track.id} value={track.id} className="bg-[#0b1018]">
                {track.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[11px] text-muted-foreground">
          Location
          <Input
            value={location}
            onValueChange={setLocation}
            placeholder="Remote, city, or region"
            className="mt-1"
          />
        </label>
        <Button type="button" onClick={generate} className="w-full">
          Generate search
        </Button>
      </div>
      <div className="mt-3 rounded-xl bg-white/5 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] tracking-wide text-electric uppercase">Boolean query</p>
          <button type="button" onClick={() => void copy("query")} className="text-[11px] text-electric hover:underline">
            {copied === "query" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-1 font-mono text-[11px] leading-relaxed break-words text-sky-100/85">{result.query}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {result.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-sky-100/80 hover:border-electric/40 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-white/5 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] tracking-wide text-electric uppercase">Outreach note</p>
          <button type="button" onClick={() => void copy("pitch")} className="text-[11px] text-electric hover:underline">
            {copied === "pitch" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-1 line-clamp-4 text-xs leading-relaxed text-sky-100/80">{result.pitch}</p>
      </div>
      <p className="mt-3 text-[11px] tracking-wide text-muted-foreground uppercase">Network openings</p>
      {empty ? (
        <p className="py-4 text-center text-xs text-muted-foreground">
          No openings in this lane yet. Use the web search links above.
        </p>
      ) : (
        <ul className="mt-2 flex flex-1 flex-col gap-2">
          {result.openings.map((job) => (
            <li key={job.id}>
              <Link
                href={job.href}
                className="block rounded-xl bg-white/5 px-3 py-2 transition hover:bg-white/[0.08]"
              >
                <p className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{job.title}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{job.location}</span>
                </p>
                <p className="text-[11px] text-electric">{job.org}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{job.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Glass>
  )
}
