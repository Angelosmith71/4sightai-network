import type { Course, Lesson } from "./types"

function lesson(id: string, title: string, minutes: string, ...body: string[]): Lesson {
  return { id, title, minutes, body }
}

export const COURSES: Course[] = [
  {
    id: "fundamentals",
    title: "AI Fundamentals",
    track: "Foundations",
    hours: "8h",
    seedProgress: 75,
    instructorId: "mateo",
    blurb: "What a model is, what it is not, and how to talk about both without the hype.",
    lessons: [
      lesson(
        "l1",
        "Models vs products",
        "12 min",
        "A model predicts the next token. A product is everything wrapped around that guess: retrieval, tools, logs, a human who can say no, and a story you are willing to defend.",
        "When a demo fails, people blame “the AI.” Name the layer. Was it the weights, the prompt, the retrieved document, the tool schema, or the person who shipped without an eval?",
        "Write the distinction down before you prompt. If you cannot say whether you are changing the model or the product, you are not ready to change either."
      ),
      lesson(
        "l2",
        "Tokens, context, and cost",
        "14 min",
        "Context is rent. Every token you send is paid for twice: once in money, once in attention the model might spend on the wrong sentence.",
        "Paste less. Point at evidence. If a policy, ticket, or eval trace matters, retrieve the paragraph — do not dump the archive.",
        "Cost is a trust issue here. Hidden spend shows up as silent retries, bloated system prompts, and logs nobody reads until an incident."
      ),
      lesson(
        "l3",
        "Hallucination as a process",
        "15 min",
        "Hallucination is not a personality flaw. It is what next-token prediction does when the prompt asks for a fact the context does not contain.",
        "Your job is to make “I don’t have that” cheaper than a fluent lie. Ask for quotes. Require IDs. Fail closed when the source is missing.",
        "In this network we treat an unsourced claim the way we treat an unsigned commit: it does not ship."
      ),
      lesson(
        "l4",
        "Talking about AI without the hype",
        "12 min",
        "Say what the system did, on which inputs, with which checks. Skip “understands,” “thinks,” and “knows” unless you can point at a metric.",
        "Guardian standing is earned in that language. People who inflate capability also inflate incident blast radius.",
        "Finish this path by rewriting one of your own product sentences in evidence form. If it still sounds like a keynote, cut it again."
      ),
    ],
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering",
    track: "Craft",
    hours: "6h",
    seedProgress: 40,
    instructorId: "angelo",
    blurb: "From a single prompt to a multi-agent workflow you can defend in a review.",
    lessons: [
      lesson(
        "l1",
        "Spec before prompt",
        "10 min",
        "A prompt is a spec with worse version control. Write the job first: audience, inputs, outputs, failure mode, and who reviews.",
        "If two reviewers would grade the output differently, the spec is unfinished. The model will pick a side at random and sound confident.",
        "Keep the spec in the same file as the prompt. When the output drifts, you want one diff, not folklore."
      ),
      lesson(
        "l2",
        "Few-shot with receipts",
        "12 min",
        "Examples work when they are real. Invented few-shots teach the model your wish. Pasted tickets, redacted logs, and graded answers teach the job.",
        "Label why each example is good or bad. Models copy the surface pattern; they need the grading rule in the open.",
        "Three tight examples beat twelve vague ones. If you cannot explain an example in one sentence, drop it."
      ),
      lesson(
        "l3",
        "Tool-shaped prompts",
        "14 min",
        "If the model can call a tool, describe the tool like an API, not a vibe. Name, arguments, side effects, and when not to call it.",
        "Never hide a write behind a “helpful” sentence. Confirmation belongs in the product, but the prompt should not pretend the write is a thought.",
        "This is the bridge into AI Agents. The prompt ends where the tool schema begins."
      ),
      lesson(
        "l4",
        "Multi-step workflows",
        "14 min",
        "Chain steps with named artifacts: extract, check, draft, cite. Do not ask one completion to plan, retrieve, and send the email.",
        "Each step should be eval-able. If you cannot unit-test a step, you cannot trust a chain of them.",
        "Angelo’s rule: a workflow you cannot replay from logs is a demo, not a system."
      ),
      lesson(
        "l5",
        "Reviewing a prompt in public",
        "10 min",
        "Post the spec, the prompt, one failing input, and the fix. That is how Prompt Engineering Foundations became a feed post instead of a private notebook.",
        "Invite disagreement on the spec, not the adjectives. “Make it nicer” is not a review.",
        "Ship the prompt only after someone who did not write it can run the eval."
      ),
    ],
  },
  {
    id: "agents",
    title: "AI Agents",
    track: "Systems",
    hours: "10h",
    seedProgress: 20,
    instructorId: "jules",
    blurb: "Tool use, memory, and the kill switch. Lesson 3 of 10 is where it gets real.",
    lessons: [
      lesson(
        "l1",
        "What an agent is allowed to be",
        "12 min",
        "An agent is a loop with tools and a stop condition. If it cannot stop, it is not an agent. It is a batch job you forgot to bound.",
        "Write the loop on paper: observe, decide, act, record. Circle the act that leaves your laptop. That circle needs a human or a policy.",
        "We do not ship agents that “just figure it out.” We ship agents that fail into a queue."
      ),
      lesson(
        "l2",
        "Tool use without theater",
        "14 min",
        "A tool call is a function call. Log the name, arguments, and result. If you cannot replay it, you cannot debug it.",
        "Prefer tools that return structured data over tools that return prose. Prose is where invented IDs hide.",
        "If the model narrates a tool call it did not make, treat that as a failed eval, not a cute quirk."
      ),
      lesson(
        "l3",
        "Confirmations and the kill switch",
        "16 min",
        "This is the lesson the network keeps telling you to finish. Any action that sends, pays, deletes, or impersonates waits for a confirmation you can audit.",
        "The kill switch is not a red button in a slide. It is a hard stop in code: max steps, max spend, max tools, and a human who can freeze the run.",
        "Write the confirmation copy before the happy path. If you cannot explain the action in one sentence to the person it affects, do not automate it.",
        "When you mark this complete, you are saying you will not ship an agent that talks like a CEO. Sarah’s voice-cloning alert is the exam question."
      ),
      lesson(
        "l4",
        "Memory that does not leak",
        "12 min",
        "Memory is data with a retention policy. Session scratch, user preferences, and incident notes are three stores — not one vector bucket.",
        "Never put secrets in embeddings “because the model might need them later.” Later is how leaks happen.",
        "Expire memory on purpose. An agent that remembers a retracted document is a liability."
      ),
      lesson(
        "l5",
        "Planning vs looping",
        "12 min",
        "A plan is a list you can show a reviewer. A loop that re-plans every turn is how agents spend a budget on circling.",
        "Cap replans. If the plan fails twice, escalate. Persistence is not the same as competence.",
        "Store the plan next to the trace. Future-you will not remember why step four existed."
      ),
      lesson(
        "l6",
        "Eval before demo",
        "14 min",
        "Jules’s bar: if the eval does not replay raw tool JSON, you missed the incident. Golden transcripts beat vibe checks.",
        "Score tool choice, argument validity, and stop behavior separately. A fluent summary of a wrong tool call is a double miss.",
        "Run the eval on the last production trace, not only the lab set."
      ),
      lesson(
        "l7",
        "Human in the loop",
        "12 min",
        "Humans are not a fallback cartoon. They are a named role with a queue, an SLA, and the right to reverse the agent.",
        "Design the handoff: what the human sees, what they can edit, what gets logged when they override.",
        "Trust in this network is mostly those overrides done in public, without humiliation."
      ),
      lesson(
        "l8",
        "Multi-agent handoffs",
        "14 min",
        "Two agents should exchange artifacts, not vibes. Pass the ticket, the citations, and the open questions. Do not pass “context.”",
        "One agent writes. One agent checks. Mixing both in one loop is how you get a committee of one.",
        "If they share a memory store, they share a blast radius. Split it."
      ),
      lesson(
        "l9",
        "Incident notes",
        "10 min",
        "When an agent misfires, write: trigger, tool, impact, freeze, fix, eval gap. Post it where the group can reuse it.",
        "Do not wait for a perfect postmortem. A dated paragraph beats a silent retry.",
        "Cybersecurity and AI Builders both need those notes. Duplicate the link, not the folklore."
      ),
      lesson(
        "l10",
        "Ship checklist",
        "10 min",
        "Before production: eval on traces, confirmation on writes, kill switch tested, logs replayable, owner on-call, user-facing copy that does not impersonate.",
        "If any box is theater, it is not shipped. It is hosted.",
        "Mark this complete only if you would put your Guardian standing on the run."
      ),
    ],
  },
  {
    id: "cyber-basics",
    title: "Cybersecurity Basics",
    track: "Safety",
    hours: "5h",
    seedProgress: 60,
    instructorId: "sarah",
    blurb: "Threat models for people who ship copilots, not just for the CISO slide.",
    lessons: [
      lesson(
        "l1",
        "Threat model for copilots",
        "12 min",
        "Start with who can prompt, what the copilot can touch, and what a prompt injection would try to do. Draw it. If it does not fit on one page, you do not have a model — you have a hope.",
        "Assume the untrusted text is in the retrieved document, the ticket, and the user’s paste. Treat those as hostile until parsed.",
        "Copilots fail at the boundary between “help” and “authority.” Mark that boundary in the product, not the brand."
      ),
      lesson(
        "l2",
        "Voice, identity, and the CEO call",
        "14 min",
        "Sarah’s alert: cloned-voice calls claiming to be the CEO, asking staff to move money or reset access. Voice is not authentication.",
        "Policy: unexpected voice instructions get a second channel. A known phrase is not enough. A ticket with a named approver is.",
        "If your agent can place a call or send a voice note, it can impersonate. That is a write. It needs a confirmation."
      ),
      lesson(
        "l3",
        "Data that should never leave",
        "12 min",
        "Source code, credentials, health, children’s data, and unpublished incidents do not go to a model you do not operate — and they do not go into logs you cannot delete.",
        "Redact before retrieve. If the chunking pipeline can see it, the prompt can leak it.",
        "When in doubt, leave it out and tell the user what you refused. Silence looks like a bug; a refusal looks like a Guardian."
      ),
      lesson(
        "l4",
        "Supply chain of models",
        "12 min",
        "You inherit the vendor’s incidents. Know the model ID, the region, the retention, and who can train on your prompts.",
        "Pin versions. A silent upgrade is a change you did not review.",
        "If a plugin can read your tickets, it is in your threat model even when the logo is friendly."
      ),
      lesson(
        "l5",
        "Incident write-up",
        "10 min",
        "Same shape as an agent note: trigger, impact, freeze, users told, eval added. Post it in Cybersecurity. Link it from Startup Founders if money moved.",
        "Do not wait for legal’s polish to warn operators. You can revise. You cannot un-call the fake CEO.",
        "Completing this course means you will treat a cloned voice as a verified threat, not a fun demo."
      ),
    ],
  },
]
