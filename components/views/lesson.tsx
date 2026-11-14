"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Glass, SectionLabel } from "@/components/glass"
import { EmptyNote } from "@/components/network-shell"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { isLessonDone } from "@/lib/academy"
import { course as findCourse } from "@/lib/data"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

export function LessonView() {
  const params = useParams<{ id: string; lessonId: string }>()
  const router = useRouter()
  const courseId = String(params?.id ?? "")
  const lessonId = String(params?.lessonId ?? "")
  const course = findCourse(courseId)
  const { completeLesson, completed, courses, progressOf, academyDone } = useNetwork()
  const lesson = course?.lessons.find((l) => l.id === lessonId)
  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  const prev = index > 0 ? course?.lessons[index - 1] : undefined
  const next = course && index >= 0 ? course.lessons[index + 1] : undefined
  const done = course ? isLessonDone(course.id, lessonId, completed) : false

  if (!course || !lesson) {
    return (
      <EmptyNote
        title="Lesson not on this path"
        body="That lesson is not in the academy snapshot. Go back to the learning center."
      />
    )
  }

  const current = course
  const currentLesson = lesson

  const finishingAcademy =
    !next && courses.every((c) => c.id === current.id || progressOf(c) === 100)

  function markComplete() {
    completeLesson(current.id, currentLesson.id)
    if (next) router.push(`/learn/${current.id}/${next.id}`)
    else router.push(finishingAcademy ? "/certificate" : `/learn/${current.id}`)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href={`/learn/${course.id}`} className="text-electric hover:underline">
          ← {course.title}
        </Link>
        <span className="text-muted-foreground">
          Lesson {index + 1} of {course.lessons.length} · {course.updated}
        </span>
      </div>
      <Glass className="p-6 sm:p-8">
        <SectionLabel>
          {course.track} · {course.level} · {lesson.minutes}
          {done ? " · Complete" : ""}
        </SectionLabel>
        <h1 className="font-heading text-3xl">{lesson.title}</h1>
        <p className="mt-3 rounded-xl border border-electric/25 bg-electric/10 px-4 py-3 text-sm leading-relaxed">
          <span className="block text-[11px] tracking-wide text-electric uppercase">Objective</span>
          {lesson.objective}
        </p>
        <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-sky-100/85">
          {lesson.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] tracking-wide text-electric uppercase">Practice</p>
          <p className="mt-1 text-sm leading-relaxed">{lesson.practice}</p>
        </div>
        <div className="mt-4">
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Takeaways</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-sky-100/85">
            {lesson.takeaways.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {done ? (
            <p className="mr-auto text-sm text-electric">Marked complete on this device.</p>
          ) : (
            <Button onClick={markComplete}>
              {next
                ? "Mark complete and continue"
                : finishingAcademy
                  ? "Mark complete and claim certificate"
                  : "Mark complete and finish"}
            </Button>
          )}
          {done && next ? (
            <Link href={`/learn/${course.id}/${next.id}`} className={cn(buttonVariants())}>
              Next lesson
            </Link>
          ) : null}
          {done && !next && academyDone ? (
            <Link href="/certificate" className={cn(buttonVariants())}>
              Open certificate
            </Link>
          ) : null}
        </div>
      </Glass>
      <div className="flex justify-between gap-3 text-sm">
        {prev ? (
          <Link href={`/learn/${course.id}/${prev.id}`} className="text-electric hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${course.id}/${next.id}`} className="ml-auto text-electric hover:underline">
            {next.title} →
          </Link>
        ) : (
          <Link href={`/learn/${course.id}`} className="ml-auto text-electric hover:underline">
            Back to course
          </Link>
        )}
      </div>
    </div>
  )
}
