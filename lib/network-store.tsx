"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  academyComplete,
  completeLessonKey,
  continueHref,
  courseProgress,
  getLearnServerSnapshot,
  getLearnSnapshot,
  nextLesson,
  subscribeLearn,
} from "./academy"
import {
  getCertificateServerSnapshot,
  getCertificateSnapshot,
  issueCertificate,
  saveCertificate,
  subscribeCertificate,
  type IssuedCertificate,
} from "./certificate"
import {
  COPILOT_SEED,
  COURSES,
  GROUPS,
  ME_ID,
  NOTICES,
  PEOPLE,
  POSTS,
  replyTo,
} from "./data"
import {
  applyProfile,
  getProfileServerSnapshot,
  getProfileSnapshot,
  saveProfile,
  subscribeProfile,
  type ProfileDraft,
} from "./profile"
import type { CopilotMsg, Course, Group, Lesson, Notice, Person, Post } from "./types"

type NetworkState = {
  me: Person
  people: Person[]
  posts: Post[]
  groups: Group[]
  courses: Course[]
  notices: Notice[]
  joined: string[]
  liked: string[]
  read: string[]
  completed: string[]
  messages: CopilotMsg[]
  compose: (body: string, groupId?: string) => void
  toggleLike: (id: string) => void
  toggleJoin: (id: string) => void
  markRead: (id?: string) => void
  ask: (text: string) => void
  completeLesson: (courseId: string, lessonId: string) => void
  progressOf: (course: Course) => number
  nextOf: (course: Course) => Lesson | undefined
  continueHref: string
  academyDone: boolean
  certificate: IssuedCertificate | null
  purchaseCertificate: (paidCents: number, replace?: boolean) => IssuedCertificate
  orderMailedPrint: () => void
  saveMe: (draft: ProfileDraft) => void
}

const NetworkContext = createContext<NetworkState | null>(null)

export function NetworkProvider({ children }: { children: ReactNode }) {
  const seedMe = PEOPLE.find((p) => p.id === ME_ID)!
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getProfileServerSnapshot
  )
  const me = useMemo(() => applyProfile(seedMe, profile), [profile, seedMe])
  const people = useMemo(
    () => PEOPLE.map((p) => (p.id === ME_ID ? me : p)),
    [me]
  )
  const [posts, setPosts] = useState(POSTS)
  const [joined, setJoined] = useState<string[]>(["builders"])
  const [liked, setLiked] = useState<string[]>(["p1"])
  const [read, setRead] = useState<string[]>([])
  const [messages, setMessages] = useState(COPILOT_SEED)
  const completed = useSyncExternalStore(subscribeLearn, getLearnSnapshot, getLearnServerSnapshot)
  const certificate = useSyncExternalStore(
    subscribeCertificate,
    getCertificateSnapshot,
    getCertificateServerSnapshot
  )

  const compose = useCallback((body: string, groupId?: string) => {
    const post: Post = {
      id: `p-${Date.now()}`,
      authorId: ME_ID,
      groupId,
      body,
      time: "now",
      likes: 0,
      comments: 0,
      helpful: 0,
      insightful: 0,
      tags: [],
      tab: "all",
    }
    setPosts((prev) => [post, ...prev])
  }, [])

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const on = prev.includes(id)
      setPosts((current) =>
        current.map((p) =>
          p.id === id ? { ...p, likes: Math.max(0, p.likes + (on ? -1 : 1)) } : p
        )
      )
      return on ? prev.filter((x) => x !== id) : [...prev, id]
    })
  }, [])

  const toggleJoin = useCallback((id: string) => {
    setJoined((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const markRead = useCallback((id?: string) => {
    if (!id) {
      setRead(NOTICES.map((n) => n.id))
      return
    }
    setRead((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const ask = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const user: CopilotMsg = { id: `u-${Date.now()}`, role: "user", text: trimmed }
    const bot: CopilotMsg = {
      id: `b-${Date.now()}`,
      role: "copilot",
      text: replyTo(trimmed),
    }
    setMessages((prev) => [...prev, user, bot])
  }, [])

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    completeLessonKey(courseId, lessonId)
  }, [])

  const progressOf = useCallback(
    (course: Course) => courseProgress(course, completed),
    [completed]
  )

  const nextOf = useCallback((course: Course) => nextLesson(course, completed), [completed])

  const academyDone = academyComplete(COURSES, completed)

  const purchaseCertificate = useCallback(
    (paidCents: number, replace = false) => {
      if (certificate && !replace) return certificate
      const prior = replace ? certificate?.paidCents ?? 0 : 0
      const next = issueCertificate(me.name, prior + paidCents)
      saveCertificate({ ...next, mailed: replace ? certificate?.mailed : false })
      return next
    },
    [certificate, me.name]
  )

  const orderMailedPrint = useCallback(() => {
    if (!certificate) return
    saveCertificate({ ...certificate, mailed: true, paidCents: certificate.paidCents + 2500 })
  }, [certificate])

  const saveMe = useCallback((draft: ProfileDraft) => {
    saveProfile(draft)
  }, [])

  const value = useMemo(
    () => ({
      me,
      people,
      posts,
      groups: GROUPS,
      courses: COURSES,
      notices: NOTICES,
      joined,
      liked,
      read,
      completed,
      messages,
      compose,
      toggleLike,
      toggleJoin,
      markRead,
      ask,
      completeLesson,
      progressOf,
      nextOf,
      continueHref: continueHref(COURSES, completed),
      academyDone,
      certificate,
      purchaseCertificate,
      orderMailedPrint,
      saveMe,
    }),
    [
      me,
      people,
      posts,
      joined,
      liked,
      read,
      completed,
      messages,
      compose,
      toggleLike,
      toggleJoin,
      markRead,
      ask,
      completeLesson,
      progressOf,
      nextOf,
      academyDone,
      certificate,
      purchaseCertificate,
      orderMailedPrint,
      saveMe,
    ]
  )

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
}

export function useNetwork() {
  const ctx = useContext(NetworkContext)
  if (!ctx) throw new Error("useNetwork must be used within NetworkProvider")
  return ctx
}
