import type {
  CopilotMsg,
  Group,
  Notice,
  OrbitNode,
  Person,
  Post,
} from "./types"
import { COURSES } from "./courses"

export { COURSES }

export const ME_ID = "angelo"

export const NETWORK_STATS = [
  { value: "18,421", label: "Members" },
  { value: "4,832", label: "Discussions" },
  { value: "673", label: "Projects" },
  { value: "127", label: "Active Groups" },
] as const

function orbit(angle: number, radius = 38.6) {
  const rad = (angle * Math.PI) / 180
  return {
    x: Number((50 + radius * Math.cos(rad)).toFixed(2)),
    y: Number((50 + radius * Math.sin(rad)).toFixed(2)),
  }
}

export const ORBIT_NODES: OrbitNode[] = [
  { id: "agents", label: "AI Agents", href: "/explore", ...orbit(-90) },
  { id: "data", label: "Data", href: "/explore", ...orbit(-48) },
  { id: "devices", label: "Devices", href: "/explore", ...orbit(6) },
  { id: "community", label: "Community", href: "/feed", ...orbit(50) },
  { id: "cloud", label: "Cloud", href: "/explore", ...orbit(130) },
  { id: "business", label: "Businesses", href: "/groups", ...orbit(180) },
  { id: "people", label: "People", href: "/profile", ...orbit(-132) },
]

export const PEOPLE: Person[] = [
  {
    id: "angelo",
    name: "Angelo Smith",
    handle: "angelo",
    role: "Founder",
    org: "4SightAI Network",
    bio: "Building the world’s first AI learning, networking, collaboration, and trust ecosystem. Safer, smarter, more connected.",
    location: "United States",
    trust: 98,
    guardian: true,
    initials: "AS",
    hue: "#4db8ff",
    badges: ["Founder", "Top Contributor"],
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    handle: "sarah",
    role: "AI Researcher",
    org: "Horizon Lab",
    bio: "Threat intel and model evaluation. I would rather be early than polite.",
    location: "San Francisco",
    trust: 91,
    guardian: true,
    initials: "SC",
    hue: "#ff6b81",
    badges: ["Verified Expert"],
  },
  {
    id: "jules",
    name: "Jules Okonkwo",
    handle: "jules",
    role: "Safety researcher",
    org: "Northstar Institute",
    bio: "Incident reports, red-team playbooks, and the occasional stubborn eval suite.",
    location: "London",
    trust: 88,
    guardian: true,
    initials: "JO",
    hue: "#7ae0ff",
    badges: ["Guardian"],
  },
  {
    id: "mateo",
    name: "Mateo Alvarez",
    handle: "mateo",
    role: "Instructor",
    org: "4SightAI Academy",
    bio: "Teaching people to ask models for evidence, not vibes.",
    location: "Mexico City",
    trust: 90,
    guardian: true,
    initials: "MA",
    hue: "#5ee0b5",
    badges: ["Instructor"],
  },
]

export const GROUPS: Group[] = [
  {
    id: "builders",
    name: "AI Builders",
    topic: "Builders",
    members: 12421,
    description: "People shipping agents, evals, and products. Show the work, not the slide.",
    trustFloor: 40,
    hue: "#4db8ff",
    icon: "cpu",
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    topic: "Security",
    members: 8201,
    description: "Threat alerts, red-team notes, and the boring controls that actually hold.",
    trustFloor: 50,
    hue: "#7ae0ff",
    icon: "shield",
  },
  {
    id: "founders",
    name: "Startup Founders",
    topic: "Founders",
    members: 4982,
    description: "Operators building AI companies. Capital, hiring, and what not to automate.",
    trustFloor: 45,
    hue: "#9b8afb",
    icon: "rocket",
  },
  {
    id: "prompt",
    name: "Prompt Engineering",
    topic: "Craft",
    members: 6103,
    description: "Multi-agent workflows, eval harnesses, and prompts that survive production.",
    trustFloor: 35,
    hue: "#5ee0b5",
    icon: "spark",
  },
  {
    id: "privacy",
    name: "Privacy & Ethics",
    topic: "Ethics",
    members: 3881,
    description: "Consent, data minimization, and the cases that should never have shipped.",
    trustFloor: 55,
    hue: "#ff6b81",
    icon: "lock",
  },
]

export const POSTS: Post[] = [
  {
    id: "p1",
    authorId: "angelo",
    groupId: "prompt",
    body: "Just completed the Prompt Engineering Foundations course and built my first multi-agent workflow. Excited to keep learning and share the process with the community!",
    time: "2h ago",
    likes: 47,
    comments: 12,
    helpful: 47,
    insightful: 23,
    tags: [],
    tab: "all",
  },
  {
    id: "p2",
    authorId: "sarah",
    groupId: "cyber",
    body: "New AI voice-cloning scam targeting small businesses reported in three states. Be cautious of phone calls claiming to be your CEO.",
    time: "4h ago",
    likes: 31,
    comments: 12,
    helpful: 12,
    insightful: 31,
    tags: ["threat"],
    threat: true,
    tab: "threat",
  },
  {
    id: "p3",
    authorId: "jules",
    groupId: "builders",
    body: "If your eval does not replay raw tool JSON, you missed last week’s tokenizer incident. We published the digest in Cybersecurity.",
    time: "6h ago",
    likes: 64,
    comments: 9,
    helpful: 64,
    insightful: 18,
    tags: ["eval"],
    tab: "popular",
  },
]

export const NOTICES: Notice[] = [
  {
    id: "n1",
    kind: "learn",
    title: "Continue AI Agents",
    body: "You left off at lesson 3 of 10 — tool use and confirmations.",
    time: "1h",
    href: "/learn/agents/l3",
  },
  {
    id: "n2",
    kind: "trust",
    title: "Top Contributor",
    body: "Your Prompt Engineering Foundations post is circulating in AI Builders.",
    time: "2h",
  },
  {
    id: "n3",
    kind: "group",
    title: "Threat alert",
    body: "Sarah Chen flagged a voice-cloning scam in three states.",
    time: "4h",
  },
]

export const COPILOT_SEED: CopilotMsg[] = [
  {
    id: "c1",
    role: "copilot",
    text: "How can I help you today?",
  },
]

export const COPILOT_CHIPS = [
  "Explain a topic",
  "Find a learning path",
  "Discover groups",
  "Analyze a potential threat",
  "Find collaboration opportunities",
]

export function person(id: string) {
  return PEOPLE.find((p) => p.id === id)
}

export function group(id: string) {
  return GROUPS.find((g) => g.id === id)
}

export function course(id: string) {
  return COURSES.find((c) => c.id === id)
}

export function replyTo(prompt: string) {
  const q = prompt.toLowerCase()
  if (q.includes("trust") || q.includes("guardian") || q.includes("score")) {
    return "Angelo, your standing is 98 as Founder and Top Contributor. Trust here is earned in reviews and incidents, not likes. The live threat in the feed — Sarah’s voice-cloning alert — is the kind of post that moves the graph."
  }
  if (q.includes("group") || q.includes("discover") || q.includes("join")) {
    return "You already sit in AI Builders. Cybersecurity is the hottest room this week because of the voice-cloning alert. Prompt Engineering matches the course you just finished. Privacy & Ethics is the quieter room if you want policy, not pages."
  }
  if (q.includes("learn") || q.includes("path") || q.includes("course") || q.includes("topic")) {
    return "You are 75% through AI Fundamentals, 40% Prompt Engineering, 20% AI Agents (lesson 3 of 10), and 60% Cybersecurity Basics. Finish Agents lesson 3 this week — tool confirmations — then close Fundamentals."
  }
  if (q.includes("threat") || q.includes("scam") || q.includes("voice")) {
    return "Sarah Chen flagged an AI voice-cloning scam hitting small businesses in three states: calls claiming to be the CEO. Treat unexpected voice instructions as unverified. I can draft a share-note for Cybersecurity and Startup Founders."
  }
  if (q.includes("collab") || q.includes("project") || q.includes("opportunit")) {
    return "673 projects are live. The strongest match for you is a multi-agent workflow write-up in AI Builders — you just finished Prompt Engineering Foundations. I can introduce you to Jules in that room."
  }
  if (q.includes("post") || q.includes("feed") || q.includes("write")) {
    return "Draft: ‘Just shipped my first multi-agent workflow from Prompt Engineering Foundations. Next: tool-call confirmations in AI Agents lesson 3.’ Want it in the composer?"
  }
  return "I can explain a topic, find a learning path, discover groups, analyze a threat, or look for a collaboration. Ask in those lanes — I stay on this network."
}
