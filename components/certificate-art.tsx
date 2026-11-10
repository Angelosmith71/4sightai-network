"use client"

import { BrandMark } from "@/components/brand-mark"
import {
  CAFP_ABBR,
  CAFP_NAME,
  publicVerifyUrl,
  type IssuedCertificate,
} from "@/lib/certificate"
import { cn } from "@/lib/utils"

function Seal({ code }: { code: string }) {
  const bits = []
  let h = 0
  for (let i = 0; i < code.length; i++) h = (h * 33 + code.charCodeAt(i)) >>> 0
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const finder =
        (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      const finderOn =
        finder &&
        ((x < 7 && y < 7 && (x === 0 || y === 0 || x === 6 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5))) ||
          (x > 13 && y < 7 && (x === 14 || y === 0 || x === 20 || y === 6 || (x > 15 && x < 19 && y > 1 && y < 5))) ||
          (x < 7 && y > 13 && (x === 0 || y === 14 || x === 6 || y === 20 || (x > 1 && x < 5 && y > 15 && y < 19))))
      const timing = (x === 6 || y === 6) && !finder && (x + y) % 2 === 0
      const data = !finder && x !== 6 && y !== 6 && ((h >> ((x * 21 + y) % 31)) & 1) === 1
      bits.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1"
          height="1"
          fill={finderOn || timing || data ? "#e8f1fb" : "#071018"}
        />
      )
    }
  }
  return (
    <svg viewBox="0 0 21 21" className="size-24 rounded-sm ring-1 ring-electric/40" aria-hidden>
      {bits}
    </svg>
  )
}

export function CertificateArt({
  studentName,
  certificate,
  preview,
}: {
  studentName: string
  certificate: IssuedCertificate | null
  preview?: boolean
}) {
  const issued = certificate
  const id = issued?.id ?? "4SA-CAFP-XXXX-XXXX"
  const issueDate = issued?.issueDate ?? "Pending issuance"
  const signatureDate = issued?.signatureDate ?? "Pending issuance"
  const verify = publicVerifyUrl(issued?.id ?? "pending")

  return (
    <article
      id="cafp-certificate"
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-electric/35 bg-[#070c14] p-6 shadow-[0_0_80px_-20px_rgba(77,184,255,0.55)] sm:p-10",
        preview && "opacity-95"
      )}
    >
      <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/10" />
      <div className="pointer-events-none absolute inset-5 rounded-[18px] border border-electric/20" />
      {preview ? (
        <p className="pointer-events-none absolute inset-0 grid place-items-center font-heading text-4xl tracking-[0.3em] text-electric/20 uppercase sm:text-6xl">
          Preview
        </p>
      ) : null}
      <header className="relative flex flex-col items-center gap-3 text-center">
        <BrandMark size={72} />
        <p className="text-[11px] tracking-[0.42em] text-electric uppercase">4SightAI Academy</p>
        <h2 className="font-heading text-3xl tracking-wide text-white sm:text-4xl">
          Certificate of Completion
        </h2>
        <p className="max-w-xl text-sm text-electric">
          {CAFP_NAME} ({CAFP_ABBR})
        </p>
      </header>
      <p className="relative mt-8 text-center text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
        This certifies that
      </p>
      <p className="relative mt-2 text-center font-heading text-3xl text-white sm:text-5xl">
        {studentName}
      </p>
      <p className="relative mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-sky-100/80">
        has successfully completed the requirements of the 4SightAI Certified AI Foundations
        Professional Program and demonstrated competency in Artificial Intelligence Fundamentals,
        Prompt Engineering, AI Agents &amp; Automation Concepts, and Cybersecurity Fundamentals.
      </p>
      <dl className="relative mx-auto mt-8 grid max-w-3xl gap-4 text-left text-xs sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <dt className="tracking-wide text-muted-foreground uppercase">Certificate ID</dt>
          <dd className="mt-1 font-mono text-sm text-electric">{id}</dd>
          <dt className="mt-3 tracking-wide text-muted-foreground uppercase">Issue date</dt>
          <dd className="mt-1">{issueDate}</dd>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Seal code={id} />
          <p className="text-[10px] tracking-wide text-muted-foreground uppercase">QR verification</p>
        </div>
        <div className="sm:text-right">
          <dt className="tracking-wide text-muted-foreground uppercase">Verification URL</dt>
          <dd className="mt-1 break-all text-electric">{verify}</dd>
          <dt className="mt-3 tracking-wide text-muted-foreground uppercase">Website</dt>
          <dd className="mt-1">www.4sightai.net</dd>
        </div>
      </dl>
      <footer className="relative mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="font-heading text-2xl italic text-sky-100">Angelo Smith</p>
          <p className="mt-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Founder signature
          </p>
          <p className="text-xs text-muted-foreground">Signature date: {signatureDate}</p>
        </div>
        <p className="text-[11px] tracking-[0.28em] text-electric/80 uppercase">
          Intelligence · Automation · Connectivity
        </p>
      </footer>
    </article>
  )
}
