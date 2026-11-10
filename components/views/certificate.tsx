"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CertificateArt } from "@/components/certificate-art"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { courseProgress } from "@/lib/academy"
import { downloadCertificatePng } from "@/lib/certificate-download"
import { CERT_PRICING, dollars, type CertificateKind } from "@/lib/certificate"
import { useNetwork } from "@/lib/network-store"

const ROWS: { kind: CertificateKind; note?: string }[] = [
  { kind: "download" },
  { kind: "replacement", note: "After an official copy is issued." },
  { kind: "mail", note: "Requires an issued certificate." },
]

export function CertificateView() {
  const {
    me,
    courses,
    completed,
    academyDone,
    certificate,
    purchaseCertificate,
    orderMailedPrint,
  } = useNetwork()
  const remaining = courses.filter((c) => courseProgress(c, completed) < 100)
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState<CertificateKind>("download")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [card, setCard] = useState({ name: me.name, number: "", expiry: "", cvc: "" })
  const issued = Boolean(certificate)
  const price = CERT_PRICING[kind]

  const canBuy = useMemo(() => {
    if (!academyDone) return false
    if (kind === "download") return !issued
    if (kind === "replacement") return issued
    if (kind === "mail") return issued && !certificate?.mailed
    return false
  }, [academyDone, certificate?.mailed, issued, kind])

  function startCheckout(next: CertificateKind) {
    setKind(next)
    setError("")
    setOpen(true)
  }

  async function pay() {
    if (!canBuy) return
    if (card.number.replace(/\s/g, "").length < 12 || card.expiry.length < 4 || card.cvc.length < 3) {
      setError("Enter a complete card number, expiry, and CVC. Nothing is charged in this preview.")
      return
    }
    setBusy(true)
    setError("")
    await new Promise((r) => setTimeout(r, 700))
    if (kind === "mail") orderMailedPrint()
    else purchaseCertificate(price.cents, kind === "replacement")
    setBusy(false)
    setOpen(false)
  }

  async function download() {
    if (!certificate) return
    await downloadCertificatePng(me.name, certificate)
  }

  if (!academyDone) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <Link href="/learn" className="text-sm text-electric hover:underline">
          ← Learning center
        </Link>
        <EmptyNote
          title="Certificate not ready"
          body="Finish every academy path — AI Fundamentals, Prompt Engineering, AI Agents, and Cybersecurity Basics — then 4SightAI can issue the CAFP certificate for $10."
        />
        <ul className="flex flex-col gap-2 text-sm">
          {remaining.map((c) => (
            <li key={c.id}>
              <Link href={`/learn/${c.id}`} className="text-electric hover:underline">
                Finish {c.title} ({courseProgress(c, completed)}%)
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="print:hidden">
        <Link href="/learn" className="text-sm text-electric hover:underline">
          ← Learning center
        </Link>
        <header className="mt-3">
          <SectionLabel>4SightAI Academy</SectionLabel>
          <h1 className="font-heading text-3xl">Certificate of completion</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Course access is free. The official CAFP print and download is {dollars(CERT_PRICING.download.cents)}{" "}
            per copy. This preview does not charge a real card.
          </p>
        </header>
      </div>

      <CertificateArt studentName={me.name} certificate={certificate} preview={!issued} />

      <div className="print:hidden grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Glass className="p-5">
          <SectionLabel>Official copy</SectionLabel>
          {issued ? (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Issued {certificate?.issueDate}. ID {certificate?.id}. Print or download this copy anytime.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => window.print()}>Print certificate</Button>
                <Button variant="outline" onClick={download}>
                  Download PNG
                </Button>
              </div>
              {certificate?.mailed ? (
                <p className="mt-3 text-sm text-electric">A mailed print is on order in this preview.</p>
              ) : null}
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Pay {dollars(CERT_PRICING.download.cents)} to issue the official certificate, then print or
                download it.
              </p>
              <Button className="mt-4" onClick={() => startCheckout("download")}>
                Pay {dollars(CERT_PRICING.download.cents)} and issue
              </Button>
            </>
          )}
        </Glass>
        <Glass className="p-5">
          <SectionLabel>Academy pricing</SectionLabel>
          <ul className="mt-3 flex flex-col gap-3 text-sm">
            <li className="flex justify-between gap-3">
              <span>
                <span className="block font-medium">Course access</span>
                <span className="text-muted-foreground">All four academy paths</span>
              </span>
              <span className="font-mono text-electric">$0</span>
            </li>
            {ROWS.map((row) => {
              const item = CERT_PRICING[row.kind]
              return (
                <li key={row.kind} className="flex justify-between gap-3">
                  <span>
                    <span className="block font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.detail}</span>
                  </span>
                  <span className="font-mono text-electric">{dollars(item.cents)}</span>
                </li>
              )
            })}
          </ul>
          {issued ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => startCheckout("replacement")}>
                Replacement {dollars(CERT_PRICING.replacement.cents)}
              </Button>
              {!certificate?.mailed ? (
                <Button variant="outline" size="sm" onClick={() => startCheckout("mail")}>
                  Mail a print {dollars(CERT_PRICING.mail.cents)}
                </Button>
              ) : null}
            </div>
          ) : null}
        </Glass>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-[#0b1018]/95 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay {dollars(price.cents)}</DialogTitle>
            <DialogDescription>
              {price.label}. No real card is charged in this 4SightAI preview.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="card-name">Name on card</Label>
              <Input
                id="card-name"
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="card-number">Card number</Label>
              <Input
                id="card-number"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={card.number}
                onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="card-exp">Expiry</Label>
                <Input
                  id="card-exp"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input
                  id="card-cvc"
                  placeholder="123"
                  value={card.cvc}
                  onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))}
                />
              </div>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={pay} disabled={busy || !canBuy}>
              {busy ? "Issuing…" : `Pay ${dollars(price.cents)}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
