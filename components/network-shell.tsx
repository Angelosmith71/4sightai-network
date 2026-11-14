"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  GraduationCap,
  Home,
  Search,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"
import { Avatar } from "@/components/avatar"
import { Wordmark } from "@/components/brand-mark"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNetwork } from "@/lib/network-store"
import { cn } from "@/lib/utils"

const DESKTOP = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/groups", label: "Groups" },
  { href: "/learn", label: "Learning" },
  { href: "/events", label: "Events" },
  { href: "/trust", label: "Trust" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About Us" },
  { href: "https://www.4sightai.net", label: "Security" },
] as const

const MOBILE = [
  { href: "/", label: "Home", icon: Home },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/copilot", label: "Copilot", icon: Sparkles },
  { href: "/profile", label: "Profile", icon: UserRound },
] as const

function activePath(pathname: string, href: string) {
  if (href.startsWith("http")) return false
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export function NetworkShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { me, notices, read } = useNetwork()
  const unread = notices.filter((n) => !read.includes(n.id)).length
  const home = pathname === "/"

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#03060d]/75 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="shrink-0" aria-label="4SightAI Network home">
            <Wordmark compact />
          </Link>
          <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
            {DESKTOP.map((item) => {
              const isExternal = item.href.startsWith("http")
              const className = cn(
                "rounded-full px-2.5 py-1.5 text-sm transition-colors xl:px-3",
                item.label === "Security"
                  ? "bg-guardian/15 text-guardian hover:bg-guardian/25 border border-guardian/30 font-medium"
                  : activePath(pathname, item.href)
                  ? "bg-white/10 text-white"
                  : "text-sky-100/70 hover:bg-white/5 hover:text-white"
              )
              return isExternal ? (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchPalette />
            <Link
              href="/notifications"
              className="relative grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground hover:text-white"
            >
              <Bell className="size-4" />
              {unread > 0 ? (
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-guardian" />
              ) : null}
              <span className="sr-only">Notifications</span>
            </Link>
            <Link href="/profile" className="hidden items-center gap-2 sm:flex">
              <Avatar person={me} size="sm" />
              <span className="hidden leading-tight lg:block">
                <span className="block text-[10px] text-muted-foreground">Welcome,</span>
                <span className="text-sm font-medium">{me.name.split(" ")[0]}</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main
        className={cn(
          "mx-auto w-full flex-1",
          home
            ? "max-w-none px-0 pb-8 print:max-w-none print:p-0"
            : "max-w-[1280px] px-4 py-6 pb-8 sm:px-6 lg:pb-10 print:max-w-none print:p-0"
        )}
      >
        {children}
      </main>

      <footer className="mt-auto border-t border-white/10 print:hidden">
        <p className="mx-auto max-w-[1440px] px-4 py-4 pb-[4.75rem] text-center text-xs text-muted-foreground sm:px-6 lg:pb-4">
          © {new Date().getFullYear()} 4Sight AI Guardian. All rights reserved.
        </p>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#03060d]/90 backdrop-blur-xl print:hidden lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5 px-2 py-1.5">
          {MOBILE.map((item) => {
            const Icon = item.icon
            const on = activePath(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-lg py-1 text-[10px]",
                    on ? "text-electric" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

function SearchPalette() {
  const { people, groups, courses } = useNetwork()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const needle = q.trim().toLowerCase()
  const hits = useMemo(() => {
    if (!needle) return []
    const rows: { href: string; kind: string; title: string }[] = []
    for (const p of people) {
      if (`${p.name} ${p.role} ${p.org}`.toLowerCase().includes(needle)) {
        rows.push({
          href: p.id === "angelo" ? "/profile" : "/feed",
          kind: "Member",
          title: p.name,
        })
      }
    }
    for (const g of groups) {
      if (`${g.name} ${g.topic} ${g.description}`.toLowerCase().includes(needle)) {
        rows.push({ href: `/groups/${g.id}`, kind: "Group", title: g.name })
      }
    }
    for (const c of courses) {
      if (`${c.title} ${c.track} ${c.blurb}`.toLowerCase().includes(needle)) {
        rows.push({ href: `/learn/${c.id}`, kind: "Course", title: c.title })
      }
    }
    if ("certificate cafp academy".includes(needle) || needle.includes("certif")) {
      rows.push({ href: "/certificate", kind: "Academy", title: "CAFP certificate" })
    }
    if ("about us mission founder 4sightai".includes(needle) || needle.includes("about")) {
      rows.push({ href: "/about", kind: "Network", title: "About Us" })
    }
    return rows.slice(0, 8)
  }, [needle, people, groups, courses])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-56 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-left text-sm text-muted-foreground md:flex xl:w-72"
      >
        <Search className="size-3.5" />
        Search people, groups, topics…
      </button>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setQ("")
        }}
      >
        <DialogContent className="border-white/10 bg-[#0b1018]/95 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search the network</DialogTitle>
            <DialogDescription>People, groups, topics.</DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            placeholder="Search people, groups, topics…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="max-h-72 overflow-auto">
            {needle && hits.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nothing matches “{q.trim()}”.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {hits.map((hit) => (
                  <li key={hit.kind + hit.title}>
                    <Link
                      href={hit.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 hover:bg-white/5"
                    >
                      <p className="text-[11px] tracking-wide text-electric uppercase">{hit.kind}</p>
                      <p className="text-sm">{hit.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function EmptyNote({ title, body }: { title: string; body: string }) {
  return (
    <Glass className="p-8">
      <p className="font-heading text-xl">{title}</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
    </Glass>
  )
}
