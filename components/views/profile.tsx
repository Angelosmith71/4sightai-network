"use client"

import { useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { Camera } from "lucide-react"
import { Avatar } from "@/components/avatar"
import { Glass, SectionLabel } from "@/components/glass"
import { PostCard } from "@/components/post-card"
import { TrustRing } from "@/components/trust-ring"
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
import { Textarea } from "@/components/ui/textarea"
import { useNetwork } from "@/lib/network-store"
import { draftFromPerson, photoFromFile, type ProfileDraft } from "@/lib/profile"
import { cn } from "@/lib/utils"

export function ProfileView() {
  const { me, posts, groups, joined, courses, progressOf, academyDone, certificate, saveMe } =
    useNetwork()
  const mine = posts.filter((p) => p.authorId === me.id)
  const myGroups = groups.filter((g) => joined.includes(g.id))
  const done = courses.filter((c) => progressOf(c) === 100)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromPerson(me))
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function openEditor() {
    setDraft(draftFromPerson(me))
    setError("")
    setOpen(true)
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return
    try {
      const photo = await photoFromFile(file)
      setDraft((d) => ({ ...d, photo }))
      setError("")
      if (!open) saveMe({ ...draftFromPerson(me), photo })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not use that photo.")
      setOpen(true)
    }
  }

  function save() {
    if (!draft.name.trim()) {
      setError("Add your name to save this profile.")
      return
    }
    saveMe({
      ...draft,
      handle: draft.handle.replace(/^@/, "").trim(),
    })
    setOpen(false)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Glass className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative rounded-full focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label={me.photo ? "Change profile photo" : "Add profile photo"}
            >
              <Avatar person={me} size="xl" />
              <span className="absolute inset-x-0 bottom-0 flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#041018]/90 px-2 py-0.5 text-[10px] text-electric ring-1 ring-electric/40">
                  <Camera className="size-3" />
                  {me.photo ? "Change" : "Add photo"}
                </span>
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ""
                void onPhoto(file)
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <SectionLabel>Profile</SectionLabel>
            <h1 className="font-heading text-3xl">{me.name}</h1>
            <p className="text-sm text-muted-foreground">
              @{me.handle} · {me.role} at {me.org} · {me.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {me.badges.map((b) => (
                <span key={b} className="rounded-full bg-electric/15 px-2 py-0.5 text-[11px] text-electric">
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed">{me.bio || "Tell the network who you are."}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={openEditor}>Edit profile</Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                {me.photo ? "Change photo" : "Add photo"}
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {myGroups.map((g) => (
                <Link
                  key={g.id}
                  href={`/groups/${g.id}`}
                  className="rounded-full border border-white/10 px-2.5 py-1 hover:border-electric/40"
                >
                  {g.name}
                </Link>
              ))}
              {done.map((c) => (
                <Link
                  key={c.id}
                  href={`/learn/${c.id}`}
                  className="rounded-full bg-electric/10 px-2.5 py-1 text-electric"
                >
                  {c.title}
                </Link>
              ))}
              {academyDone ? (
                <Link
                  href="/certificate"
                  className="rounded-full bg-electric/10 px-2.5 py-1 text-electric"
                >
                  {certificate ? "CAFP certificate" : "Issue CAFP · $10"}
                </Link>
              ) : null}
            </div>
          </div>
          <TrustRing value={me.trust} guardian={me.guardian} />
        </div>
      </Glass>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl">Activity</h2>
        {mine.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn("border-white/10 bg-[#0b1018]/95 sm:max-w-lg")}>
          <DialogHeader>
            <DialogTitle>Your profile</DialogTitle>
            <DialogDescription>
              Name, photo, and bio stay on this device. This is how you appear on the network.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative rounded-full"
                aria-label="Upload profile photo"
              >
                <Avatar person={{ ...me, photo: draft.photo || undefined }} size="lg" />
              </button>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  Upload photo
                </Button>
                {draft.photo ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDraft((d) => ({ ...d, photo: null }))}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            </div>
            <Field label="Name" htmlFor="profile-name">
              <Input
                id="profile-name"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            </Field>
            <Field label="Handle" htmlFor="profile-handle">
              <Input
                id="profile-handle"
                value={draft.handle}
                onChange={(e) => setDraft((d) => ({ ...d, handle: e.target.value }))}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Role" htmlFor="profile-role">
                <Input
                  id="profile-role"
                  value={draft.role}
                  onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))}
                />
              </Field>
              <Field label="Organization" htmlFor="profile-org">
                <Input
                  id="profile-org"
                  value={draft.org}
                  onChange={(e) => setDraft((d) => ({ ...d, org: e.target.value }))}
                />
              </Field>
            </div>
            <Field label="Location" htmlFor="profile-location">
              <Input
                id="profile-location"
                value={draft.location}
                onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
              />
            </Field>
            <Field label="Bio" htmlFor="profile-bio">
              <Textarea
                id="profile-bio"
                rows={4}
                value={draft.bio}
                onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              />
            </Field>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
