export const CERT_STORAGE_KEY = "4sight-certificate"
export const CAFP_NAME = "4SightAI Certified AI Foundations Professional"
export const CAFP_ABBR = "CAFP"
export const CERT_WEBSITE = "www.4sightai.net"

export const CERT_PRICING = {
  download: { cents: 1000, label: "Certificate download & print", detail: "Official certificate, verification ID, and QR seal." },
  replacement: { cents: 500, label: "Replacement certificate", detail: "Reissue with a new certificate ID." },
  mail: { cents: 2500, label: "Printed certificate (mailed)", detail: "Printed and mailed copy of an issued certificate." },
} as const

export type CertificateKind = keyof typeof CERT_PRICING

export type IssuedCertificate = {
  id: string
  studentName: string
  issueDate: string
  signatureDate: string
  paidCents: number
  mailed?: boolean
}

function formatDate(iso = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(iso)
}

export function dollars(cents: number) {
  return `$${(cents / 100).toFixed(0)}`
}

export function generateCertificateId() {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes, (b) => b.toString(36).toUpperCase().padStart(2, "X"))
    .join("")
    .replace(/[^A-Z0-9]/g, "X")
    .slice(0, 8)
    .padEnd(8, "4")
  return `4SA-CAFP-${hex.slice(0, 4)}-${hex.slice(4)}`
}

export function isCertificateId(id: string) {
  return /^4SA-CAFP-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(id)
}

export function verificationPath(id: string) {
  return `/certificate/verify/${id}`
}

export function publicVerifyUrl(id: string) {
  return `www.4sightai.net/verify/${id}`
}

export function issueCertificate(studentName: string, paidCents: number): IssuedCertificate {
  const issued = formatDate()
  return {
    id: generateCertificateId(),
    studentName,
    issueDate: issued,
    signatureDate: issued,
    paidCents,
  }
}

const listeners = new Set<() => void>()
let snapshot: IssuedCertificate | null = null
let clientReady = false

function emit() {
  for (const listener of listeners) listener()
}

function readStored(): IssuedCertificate | null {
  try {
    const raw = localStorage.getItem(CERT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as IssuedCertificate
    if (!parsed || typeof parsed.id !== "string") return null
    return parsed
  } catch {
    return null
  }
}

export function subscribeCertificate(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  if (!clientReady) {
    clientReady = true
    const stored = readStored()
    if (stored) {
      snapshot = stored
      queueMicrotask(emit)
    }
  }
  return () => {
    listeners.delete(onStoreChange)
  }
}

export function getCertificateSnapshot() {
  return snapshot
}

export function getCertificateServerSnapshot(): IssuedCertificate | null {
  return null
}

function persist(next: IssuedCertificate | null) {
  snapshot = next
  try {
    if (next) localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(CERT_STORAGE_KEY)
  } catch {
    /* private mode */
  }
  emit()
}

export function saveCertificate(cert: IssuedCertificate) {
  persist(cert)
}

export function lookupCertificate(id: string) {
  if (snapshot?.id === id) return snapshot
  return null
}
