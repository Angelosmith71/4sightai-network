"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Avatar } from "@/components/avatar"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { buttonVariants } from "@/components/ui/button"
import { completedCount, isLessonDone } from "@/lib/academy"
import { course as findCourse, person } from "@/lib/data"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

export function CourseView() {
  const params = useParams<{ id: string }>()
  const id = String(params?.id ?? "")
  const course = findCourse(id)
  const { completed, progressOf, nextOf, academyDone, certificate } = useNetwork()

  if (!course) {
    return (
      <EmptyNote
        title="Course not in the academy"
        body="That path is not in this snapshot. Open the learning center and pick a listed course."
      />
    )
  }

  const instructor = person(course.instructorId)
  const progress = progressOf(course)
  const next = nextOf(course)
  const done = completedCount(course, completed)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <Link href="/learn" className="text-sm text-electric hover:underline">
        ← Learning center
      </Link>
      <Glass className="p-6">
        <SectionLabel>
          {course.track} · {course.hours}
        </SectionLabel>
        <h1 className="font-heading text-3xl">{course.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.blurb}</p>
        {instructor ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar person={instructor} size="sm" />
            {instructor.name} · {instructor.role}
          </p>
        ) : null}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-electric" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {done} of {course.lessons.length} lessons · {progress}%
        </p>
        {next ? (
          <Link href={`/learn/${course.id}/${next.id}`} className={cn(buttonVariants(), "mt-4")}>
            Continue · {next.title}
          </Link>
        ) : academyDone ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-electric">Academy complete.</p>
            <Link href="/certificate" className={cn(buttonVariants())}>
              {certificate ? "View certificate" : "Issue CAFP certificate · $10"}
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm text-electric">
            Path complete. Finish the remaining academy courses to issue the $10 CAFP certificate.
          </p>
        )}
      </Glass>
      <ol className="flex flex-col gap-2">
        {course.lessons.map((lesson, index) => {
          const complete = isLessonDone(course.id, lesson.id, completed)
          const current = next?.id === lesson.id
          return (
            <li key={lesson.id}>
              <Link href={`/learn/${course.id}/${lesson.id}`}>
                <Glass
                  className={cn(
                    "flex items-center justify-between gap-3 p-4 transition hover:border-electric/40",
                    current && "ring-1 ring-electric/40"
                  )}
                >
                  <span>
                    <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
                      Lesson {index + 1} · {lesson.minutes}
                    </span>
                    <span className="mt-0.5 block font-medium">{lesson.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-electric">
                    {complete ? "Done" : current ? "Up next" : "Open"}
                  </span>
                </Glass>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
