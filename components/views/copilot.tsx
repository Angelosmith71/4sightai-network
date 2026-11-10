"use client"

import { useState } from "react"
import { Glass, SectionLabel } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { COPILOT_CHIPS } from "@/lib/data"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

export function CopilotView() {
  const { messages, ask } = useNetwork()
  const [text, setText] = useState("")

  function send(value = text) {
    ask(value)
    setText("")
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <SectionLabel>Workspace</SectionLabel>
        <h1 className="font-heading text-3xl">4Sight Copilot</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Grounded in this network — trust, groups, courses, and the live feed. Not a general chatbot.
        </p>
      </header>

      <Glass className="flex min-h-[420px] flex-col">
        <div className="flex-1 space-y-3 overflow-auto p-4 sm:p-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                msg.role === "copilot"
                  ? "border border-electric/20 bg-electric/10"
                  : "ml-auto bg-white/8"
              )}
            >
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">
                {msg.role === "copilot" ? "Copilot" : "You"}
              </p>
              <p className="mt-1">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {COPILOT_CHIPS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-electric/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask about trust, groups, or a draft post…"
              rows={2}
              className="min-h-12"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
            />
            <Button className="sm:self-end" disabled={!text.trim()} onClick={() => send()}>
              Send
            </Button>
          </div>
        </div>
      </Glass>
    </div>
  )
}
