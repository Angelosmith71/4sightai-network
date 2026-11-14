import type { Course, JobOpening, JobSearch, Person } from "./types"

export const ROLE_TRACKS = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    courseId: "fundamentals",
    query: '("AI engineer" OR "machine learning engineer" OR "LLM engineer")',
  },
  {
    id: "prompt",
    label: "Prompt Engineer",
    courseId: "prompt-eng",
    query: '("prompt engineer" OR "LLM engineer" OR "applied AI")',
  },
  {
    id: "agents",
    label: "Agent Engineer",
    courseId: "agents",
    query: '("AI agent" OR "agent engineer" OR "autonomous agent")',
  },
  {
    id: "security",
    label: "AI Security",
    courseId: "cyber-basics",
    query: '("AI security" OR "ML security" OR "red team" OR "AI safety")',
  },
] as const

export type RoleTrackId = (typeof ROLE_TRACKS)[number]["id"]

export const NETWORK_JOBS: JobOpening[] = [
  {
    id: "j1",
    title: "AI Agent Engineer",
    org: "Northstar Institute",
    location: "Remote · London",
    track: "agents",
    href: "/groups/builders",
    blurb: "Bounded loops only. Confirmations on every write tool.",
  },
  {
    id: "j2",
    title: "Prompt Engineer",
    org: "Horizon Lab",
    location: "San Francisco",
    track: "prompt",
    href: "/groups/prompt",
    blurb: "Specs before prompts. Public evals, not vibe checks.",
  },
  {
    id: "j3",
    title: "AI Security Analyst",
    org: "Guardian Circle",
    location: "Remote",
    track: "security",
    href: "/groups/cyber",
    blurb: "Voice-cloning, injection, and incidents you can post the same day.",
  },
  {
    id: "j4",
    title: "Foundations Instructor",
    org: "4SightAI Academy",
    location: "Mexico City · Hybrid",
    track: "ai-engineer",
    href: "/learn/fundamentals",
    blurb: "Teach models vs products. No hype language in the classroom.",
  },
  {
    id: "j5",
    title: "Applied LLM Engineer",
    org: "Startup Founders room",
    location: "United States · Remote",
    track: "ai-engineer",
    href: "/groups/founders",
    blurb: "Ship retrieval that cites sources. Fail closed when the ID is missing.",
  },
  {
    id: "j6",
    title: "Red-team Agent Operator",
    org: "Cybersecurity",
    location: "Remote",
    track: "security",
    href: "/groups/cyber",
    blurb: "Break copilots on purpose, then write the control that holds.",
  },
]

function webQuery(booleanQuery: string, location: string) {
  const place = location.trim()
  if (!place || /^remote$/i.test(place)) return `${booleanQuery} remote`
  return `${booleanQuery} ${place}`
}

function searchLinks(q: string, location: string): JobSearch["links"] {
  const keywords = encodeURIComponent(q)
  const loc = encodeURIComponent(location.trim() || "Remote")
  return [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=${loc}`,
    },
    {
      label: "Indeed",
      href: `https://www.indeed.com/jobs?q=${keywords}&l=${loc}`,
    },
    {
      label: "Google",
      href: `https://www.google.com/search?q=${encodeURIComponent(`${q} jobs ${location}`.trim())}`,
    },
  ]
}

export function suggestedTrack(progressOf: (course: Course) => number, courses: Course[]): RoleTrackId {
  let best: RoleTrackId = "ai-engineer"
  let score = -1
  for (const track of ROLE_TRACKS) {
    const course = courses.find((item) => item.id === track.courseId)
    const progress = course ? progressOf(course) : 0
    if (progress > score) {
      score = progress
      best = track.id
    }
  }
  return best
}

export function generateJobSearch(
  trackId: string,
  location: string,
  me: Person,
  courses: Course[],
  progressOf: (course: Course) => number
): JobSearch {
  const track = ROLE_TRACKS.find((item) => item.id === trackId) ?? ROLE_TRACKS[0]
  const place = location.trim() || me.location || "Remote"
  const query = webQuery(track.query, place)
  const done = courses
    .filter((course) => progressOf(course) > 0)
    .map((course) => `${course.title} ${progressOf(course)}%`)
  const academy =
    done.length > 0 ? `Academy in progress: ${done.join("; ")}.` : "Academy not started — fundamentals is the first path."
  const pitch = [
    `${me.name} · ${me.role}${me.org ? ` at ${me.org}` : ""}. ${place}.`,
    academy,
    `Looking for ${track.label} roles where evals, confirmations, and a kill switch ship with the demo.`,
  ].join(" ")
  const openings = [
    ...NETWORK_JOBS.filter((job) => job.track === track.id),
    ...NETWORK_JOBS.filter((job) => job.track !== track.id),
  ].slice(0, 3)
  return {
    trackId: track.id,
    location: place,
    query,
    pitch,
    links: searchLinks(track.query, place),
    openings,
  }
}
