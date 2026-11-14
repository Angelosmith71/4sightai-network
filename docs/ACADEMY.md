# Academy and CAFP

Course access is free. Progress is stored on this device under `4sight-learn-progress-v2`. Each lesson is one key, `courseId:lessonId`. A path is complete at 100%. The academy is complete when all four paths are.

Buttons follow `courseActionLabel`: **Start** at 0%, **Continue** while in progress, **Review** at 100%. The home and learn “continue” link prefers a path that is partly done, otherwise the first untouched path, otherwise `/learn`.

Each course card shows only the signed-in member, not a roster. Lessons updated November 2026 include an objective, a reading, a practice prompt, and takeaways. Marking a lesson complete appends the key. It does not sync anywhere.

The official credential is **4SightAI Certified AI Foundations Professional (CAFP)**. It stays locked until all four paths are complete.

## Paths

### AI Fundamentals (`/learn/fundamentals`)

Foundations · Foundational · 10h · 6 lessons. How models work — chat, reasoning, retrieval, measurement — without the hype.

1. Models vs products (18 min)
2. Tokens, context, and cost (20 min)
3. Hallucination as a process (22 min)
4. Talking about AI without the hype (16 min)
5. Retrieval, not a bigger window (20 min)
6. Measuring models like products (18 min)

### Prompt Engineering (`/learn/prompt-eng`)

Craft · Practitioner · 8h · 7 lessons. From a written spec to structured outputs and an eval you can run in public.

1. Spec before prompt (16 min)
2. Few-shot with receipts (18 min)
3. Tool-shaped prompts (20 min)
4. Multi-step workflows (20 min)
5. Reviewing a prompt in public (14 min)
6. Structured outputs you can parse (18 min)
7. A prompt eval you can run on Monday (18 min)

### AI Agents (`/learn/agents`)

Systems · Advanced · 12h · 10 lessons. What an agent is allowed to do, and the controls that have to ship with it.

1. What an agent is allowed to be (18 min)
2. Tool use without theater (20 min)
3. Confirmations and the kill switch (22 min)
4. Memory that does not leak (18 min)
5. Planning vs looping (18 min)
6. Eval before demo (20 min)
7. Human in the loop (16 min)
8. Multi-agent handoffs (18 min)
9. Incident notes (14 min)
10. Ship checklist (14 min)

### Cybersecurity Basics (`/learn/cyber-basics`)

Safety · Practitioner · 7h · 7 lessons. Copilot threat models, identity, data that should not leave, and incidents you can write down.

1. Threat model for copilots (18 min)
2. Voice, identity, and the CEO call (20 min)
3. Data that should never leave (18 min)
4. Supply chain of models (16 min)
5. Incident write-up (14 min)
6. Prompt injection in the wild (20 min)
7. Deepfakes, images, and multimodal input (16 min)

## Certificate

`/certificate` lists three preview prices from `CERT_PRICING`:

| Kind | Price | When it is available |
| --- | --- | --- |
| Certificate download & print | $10 | Academy complete, and no certificate issued yet |
| Replacement certificate | $5 | A certificate is already issued. New id. |
| Printed certificate (mailed) | $25 | Issued, and not already marked mailed |

The pay dialog checks that the card number has at least 12 digits, the expiry at least 4 characters, and the CVC at least 3. It waits briefly, then writes `4sight-certificate`. The copy in the dialog states that nothing is charged. `paidCents` is the sum of preview charges (download or replacement, plus $25 if mailed).

An issued record has `id` (`4SA-CAFP-XXXX-XXXX`), `studentName` (the profile name at purchase), `issueDate` and `signatureDate` (America/New_York, long month form), `paidCents`, and optional `mailed`. Download renders a PNG via `downloadCertificatePng`. Print uses the landscape stylesheet.

`/certificate/verify/[id]` resolves only against the certificate in this browser. A different device, or a cleared site store, shows no match.
