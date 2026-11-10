export type Person = {
  id: string
  name: string
  handle: string
  role: string
  org: string
  bio: string
  location: string
  trust: number
  guardian: boolean
  initials: string
  hue: string
  badges: string[]
}

export type Post = {
  id: string
  authorId: string
  groupId?: string
  body: string
  time: string
  likes: number
  comments: number
  helpful: number
  insightful: number
  tags: string[]
  threat?: boolean
  tab: "all" | "following" | "popular" | "threat" | "projects"
}

export type Group = {
  id: string
  name: string
  topic: string
  members: number
  description: string
  trustFloor: number
  hue: string
  icon: "cpu" | "shield" | "rocket" | "spark" | "lock"
}

export type Lesson = {
  id: string
  title: string
  minutes: string
  body: string[]
}

export type Course = {
  id: string
  title: string
  track: string
  hours: string
  seedProgress: number
  instructorId: string
  blurb: string
  lessons: Lesson[]
}

export type Notice = {
  id: string
  kind: "mention" | "group" | "trust" | "learn"
  title: string
  body: string
  time: string
  href?: string
}

export type CopilotMsg = {
  id: string
  role: "user" | "copilot"
  text: string
}

export type OrbitNode = {
  id: string
  label: string
  href: string
  x: number
  y: number
}
