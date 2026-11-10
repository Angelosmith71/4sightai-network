"use client"

import { useParams } from "next/navigation"
import { CertificateArt } from "@/components/certificate-art"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { isCertificateId, lookupCertificate } from "@/lib/certificate"
import { useNetwork } from "@/lib/network-store"

export function CertificateVerifyView() {
  const params = useParams<{ id: string }>()
  const id = String(params?.id ?? "")
  const { me, certificate } = useNetwork()
  const local = certificate?.id === id ? certificate : lookupCertificate(id)
  const wellFormed = isCertificateId(id)

  if (!wellFormed) {
    return (
      <EmptyNote
        title="Certificate not recognized"
        body="That ID is not a 4SightAI Academy CAFP number. Check the printed ID and try again."
      />
    )
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <header>
        <SectionLabel>Verification</SectionLabel>
        <h1 className="font-heading text-3xl">Certificate {id}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {local
            ? `Valid on this device. Issued ${local.issueDate} to ${local.studentName}.`
            : "This ID matches the 4SightAI CAFP format. Full public lookup lives at www.4sightai.net."}
        </p>
      </header>
      {local ? (
        <CertificateArt studentName={local.studentName} certificate={local} />
      ) : (
        <Glass className="p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {me.name} can re-open an issued copy from the academy certificate page on the device that
            paid the $10 fee.
          </p>
        </Glass>
      )}
    </div>
  )
}
