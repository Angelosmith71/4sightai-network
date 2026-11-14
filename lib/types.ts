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
  photo?: string
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
  objective: string
  body: string[]
  practice: string
  takeaways: string[]
}

export type Course = {
  id: string
  title: string
  track: string
  hours: string
  level: string
  updated: string
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

export type TechNews = {
  id: string
  source: string
  time: string
  title: string
  href: string
  tag: "Threat" | "Models" | "Agents" | "Policy" | "Security" | "Tech"
}

export type TechNewsFeed = {
  live: boolean
  updated: string
  items: TechNews[]
}

export type JobOpening = {
  id: string
  title: string
  org: string
  location: string
  track: string
  href: string
  blurb: string
}

export type JobSearch = {
  trackId: string
  location: string
  query: string
  pitch: string
  links: { label: string; href: string }[]
  openings: JobOpening[]
}
