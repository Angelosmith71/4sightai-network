import type { Course, Lesson } from "./types"

export const LEARN_STORAGE_KEY = "4sight-learn-progress-v2"

export function lessonKey(courseId: string, lessonId: string) {
  return `${courseId}:${lessonId}`
}

export function courseProgress(course: Course, completed: string[]) {
  if (course.lessons.length === 0) return 0
  const done = course.lessons.filter((l) => completed.includes(lessonKey(course.id, l.id))).length
  return Math.round((done / course.lessons.length) * 100)
}

export function completedCount(course: Course, completed: string[]) {
  return course.lessons.filter((l) => completed.includes(lessonKey(course.id, l.id))).length
}

export function isLessonDone(courseId: string, lessonId: string, completed: string[]) {
  return completed.includes(lessonKey(courseId, lessonId))
}

export function nextLesson(course: Course, completed: string[]): Lesson | undefined {
  return course.lessons.find((l) => !completed.includes(lessonKey(course.id, l.id)))
}

export function academyComplete(courses: Course[], completed: string[]) {
  return courses.length > 0 && courses.every((course) => courseProgress(course, completed) === 100)
}

export function continueHref(courses: Course[], completed: string[]) {
  const inProgress = courses.find((course) => {
    const progress = courseProgress(course, completed)
    return progress > 0 && progress < 100
  })
  const fresh = courses.find((course) => courseProgress(course, completed) === 0)
  const target = inProgress ?? fresh
  if (!target) return "/learn"
  const lesson = nextLesson(target, completed)
  return lesson ? `/learn/${target.id}/${lesson.id}` : `/learn/${target.id}`
}

export function courseActionLabel(progress: number) {
  if (progress >= 100) return "Review"
  if (progress > 0) return "Continue"
  return "Start"
}

const SEED_COMPLETED: string[] = []
const listeners = new Set<() => void>()
let snapshot = SEED_COMPLETED
let clientReady = false

function emit() {
  for (const listener of listeners) listener()
}

function readStored(): string[] | null {
  try {
    const raw = localStorage.getItem(LEARN_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return null
    return parsed.filter((item): item is string => typeof item === "string")
  } catch {
    return null
  }
}

export function subscribeLearn(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  if (!clientReady) {
    clientReady = true
    const stored = readStored()
    if (stored) {
      snapshot = stored
      queueMicrotask(emit)
    }
  }
  return () => {
    listeners.delete(onStoreChange)
  }
}

export function getLearnSnapshot() {
  return snapshot
}

export function getLearnServerSnapshot() {
  return SEED_COMPLETED
}

export function completeLessonKey(courseId: string, lessonId: string) {
  const key = lessonKey(courseId, lessonId)
  if (snapshot.includes(key)) return
  snapshot = [...snapshot, key]
  try {
    localStorage.setItem(LEARN_STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    /* private mode */
  }
  emit()
}
