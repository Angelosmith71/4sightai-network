import type { Person } from "./types"

export const PROFILE_STORAGE_KEY = "4sight-profile"

export type ProfileDraft = {
  name: string
  handle: string
  role: string
  org: string
  bio: string
  location: string
  photo: string | null
}

export function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function applyProfile(base: Person, draft: ProfileDraft | null): Person {
  if (!draft) return base
  const name = draft.name.trim() || base.name
  const handle = draft.handle.replace(/^@/, "").trim() || base.handle
  return {
    ...base,
    name,
    handle,
    role: draft.role.trim() || base.role,
    org: draft.org.trim() || base.org,
    bio: draft.bio.trim(),
    location: draft.location.trim() || base.location,
    initials: initialsFrom(name),
    photo: draft.photo || undefined,
  }
}

export function draftFromPerson(person: Person): ProfileDraft {
  return {
    name: person.name,
    handle: person.handle,
    role: person.role,
    org: person.org,
    bio: person.bio,
    location: person.location,
    photo: person.photo ?? null,
  }
}

export async function photoFromFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose a JPG, PNG, or WebP photo.")
  }
  const bitmap = await createImageBitmap(file)
  const max = 640
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not read that photo.")
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL("image/jpeg", 0.86)
}

const listeners = new Set<() => void>()
let snapshot: ProfileDraft | null = null
let clientReady = false

function emit() {
  for (const listener of listeners) listener()
}

function readStored(): ProfileDraft | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ProfileDraft
    if (!parsed || typeof parsed.name !== "string") return null
    return parsed
  } catch {
    return null
  }
}

export function subscribeProfile(onStoreChange: () => void) {
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

export function getProfileSnapshot() {
  return snapshot
}

export function getProfileServerSnapshot(): ProfileDraft | null {
  return null
}

export function saveProfile(draft: ProfileDraft) {
  snapshot = draft
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draft))
  } catch {
    /* private mode or quota */
  }
  emit()
}
