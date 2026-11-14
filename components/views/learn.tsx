"use client"

import Link from "next/link"
import { Glass, SectionLabel } from "@/components/glass"
import { Avatar } from "@/components/avatar"
import { buttonVariants } from "@/components/ui/button"
import { completedCount, courseActionLabel } from "@/lib/academy"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

export function LearnView() {
  const { me, courses, completed, progressOf, nextOf, academyDone, certificate } = useNetwork()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <SectionLabel>Academy</SectionLabel>
        <h1 className="font-heading text-3xl">Learning center</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Updated November 2026. Full academy paths with objectives, practice, and takeaways.
          Progress stays on this device. Course access is free. The official CAFP certificate is $10
          to print and download after you finish all four paths.
        </p>
      </header>
      <Glass className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] tracking-wide text-electric uppercase">Official certificate</p>
          <p className="font-heading text-xl">4SightAI CAFP · $10 print &amp; download</p>
          <p className="text-sm text-muted-foreground">
            {academyDone
              ? certificate
                ? "Your certificate is issued. Print or download it anytime."
                : "All four paths complete. Pay $10 to issue the official copy."
              : "Finish AI Fundamentals, Prompt Engineering, AI Agents, and Cybersecurity Basics to unlock it."}
          </p>
        </div>
        <Link
          href="/certificate"
          className={cn(buttonVariants(), "shrink-0")}
        >
          {certificate ? "View certificate" : academyDone ? "Issue certificate · $10" : "Certificate requirements"}
        </Link>
      </Glass>
      <ul className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => {
          const progress = progressOf(course)
          const next = nextOf(course)
          const done = completedCount(course, completed)
          const href = next ? `/learn/${course.id}/${next.id}` : `/learn/${course.id}`
          return (
            <li key={course.id}>
              <Glass className="flex h-full flex-col p-5">
                <p className="text-[11px] tracking-wide text-electric uppercase">
                  {course.track} · {course.level} · {course.hours} · {course.lessons.length} lessons
                </p>
                <Link href={`/learn/${course.id}`} className="mt-1 font-heading text-2xl hover:text-electric">
                  {course.title}
                </Link>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{course.blurb}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-electric" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Avatar person={me} size="sm" />
                    {me.name}
                  </span>
                  <span className="font-mono text-xs">
                    {done}/{course.lessons.length} · {progress}%
                  </span>
                </div>
                <Link href={href} className={cn(buttonVariants(), "mt-4 w-full")}>
                  {courseActionLabel(progress)}
                </Link>
              </Glass>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
