import { TECH_NEWS } from "./data"
import type { TechNewsFeed } from "./types"

export type TechNewsView = {
  status: "loading" | "ready" | "error"
  feed: TechNewsFeed
}

const listeners = new Set<() => void>()
let started = false
let snapshot: TechNewsView = {
  status: "loading",
  feed: { live: false, updated: "", items: TECH_NEWS },
}

function emit() {
  for (const listener of listeners) listener()
}

export async function refreshTechNews() {
  snapshot = { ...snapshot, status: "loading" }
  emit()
  try {
    const response = await fetch("/api/tech-news", { cache: "no-store" })
    if (!response.ok) throw new Error("wire down")
    const data = (await response.json()) as TechNewsFeed
    if (!Array.isArray(data.items) || data.items.length === 0) throw new Error("empty")
    snapshot = {
      status: "ready",
      feed: {
        live: Boolean(data.live),
        updated: typeof data.updated === "string" ? data.updated : "",
        items: data.items.filter((item) => item?.title && item?.href),
      },
    }
  } catch {
    snapshot = {
      status: "error",
      feed: { live: false, updated: "", items: TECH_NEWS },
    }
  }
  emit()
}

export function subscribeTechNews(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  if (!started) {
    started = true
    queueMicrotask(() => {
      void refreshTechNews()
    })
  }
  return () => {
    listeners.delete(onStoreChange)
  }
}

export function getTechNewsSnapshot() {
  return snapshot
}

const SERVER_SNAPSHOT: TechNewsView = {
  status: "loading",
  feed: { live: false, updated: "", items: TECH_NEWS },
}

export function getTechNewsServerSnapshot(): TechNewsView {
  return SERVER_SNAPSHOT
}
