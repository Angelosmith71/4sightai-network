import { TECH_NEWS } from "./data"
import type { TechNews, TechNewsFeed } from "./types"

const FEEDS = [
  { source: "BBC News", url: "https://feeds.bbci.co.uk/news/technology/rss.xml" },
  { source: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index" },
  { source: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { source: "Hacker News", url: "https://hnrss.org/frontpage" },
] as const

const UA = "4SightAI-Network/0.1 (tech news; +https://www.4sightai.net)"

type ParsedItem = TechNews & { published: number }

function decode(xml: string) {
  return xml
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function tagText(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"))
  return match ? decode(match[1]) : ""
}

function hrefOf(block: string) {
  const rss = tagText(block, "link")
  if (rss) return safeHref(rss)
  const atom = block.match(/<link[^>]+href=["']([^"']+)["']/i)
  return atom ? safeHref(atom[1]) : ""
}

export function safeHref(raw: string) {
  try {
    const url = new URL(raw.trim())
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString()
  } catch {
    /* ignore */
  }
  return ""
}

function publishedAt(block: string) {
  const raw = tagText(block, "pubDate") || tagText(block, "updated") || tagText(block, "published")
  const ms = Date.parse(raw)
  return Number.isFinite(ms) ? ms : 0
}

function relativeTime(ms: number) {
  if (!ms) return "now"
  const seconds = Math.max(0, Math.round((Date.now() - ms) / 1000))
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.round(minutes / 60)
  if (hours < 48) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

function classify(title: string): TechNews["tag"] {
  const t = title.toLowerCase()
  if (/\b(hack|breach|malware|ransomware|phishing|scam|exploit|vulnerability|cve)\b/.test(t)) {
    return "Threat"
  }
  if (/\b(agent|autonomous|copilot)\b/.test(t)) return "Agents"
  if (/\b(gpt|llm|openai|anthropic|gemini|model|transformer)\b/.test(t)) return "Models"
  if (/\b(law|act|regulat|policy|congress|eu ai)\b/.test(t)) return "Policy"
  if (/\b(security|privacy|encrypt|cyber)\b/.test(t)) return "Security"
  return "Tech"
}

function parseFeed(xml: string, source: string): ParsedItem[] {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? []
  const items: ParsedItem[] = []
  for (const block of blocks) {
    const title = tagText(block, "title")
    const href = hrefOf(block)
    if (!title || !href) continue
    const published = publishedAt(block)
    items.push({
      id: `${source}:${href}`,
      source,
      title,
      href,
      published,
      time: relativeTime(published),
      tag: classify(title),
    })
  }
  return items
}

async function pullFeed(source: string, url: string): Promise<ParsedItem[]> {
  const response = await fetch(url, {
    headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml", "User-Agent": UA },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 300 },
  })
  if (!response.ok) throw new Error(`${source} ${response.status}`)
  const xml = await response.text()
  return parseFeed(xml, source)
}

function tokens(title: string) {
  return new Set(
    title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3)
  )
}

function similarTitle(a: string, b: string) {
  const left = tokens(a)
  const right = tokens(b)
  let overlap = 0
  for (const word of left) {
    if (right.has(word)) overlap += 1
  }
  return overlap >= 3
}

function pick(items: ParsedItem[]) {
  const seen = new Set<string>()
  const sorted = [...items].sort((a, b) => b.published - a.published)
  const mixed: ParsedItem[] = []
  const counts = new Map<string, number>()

  function take(item: ParsedItem, cap: number) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
    if (seen.has(key)) return false
    if ((counts.get(item.source) ?? 0) >= cap) return false
    if (mixed.some((existing) => similarTitle(existing.title, item.title))) return false
    seen.add(key)
    counts.set(item.source, (counts.get(item.source) ?? 0) + 1)
    mixed.push(item)
    return true
  }

  for (const item of sorted) {
    take(item, 2)
    if (mixed.length >= 6) break
  }
  if (mixed.length < 6) {
    for (const item of sorted) {
      take(item, 99)
      if (mixed.length >= 6) break
    }
  }
  return mixed.map((item) => ({
    id: item.id,
    source: item.source,
    time: item.time,
    title: item.title,
    href: item.href,
    tag: item.tag,
  }))
}

export async function loadTechNews(): Promise<TechNewsFeed> {
  const results = await Promise.allSettled(FEEDS.map((feed) => pullFeed(feed.source, feed.url)))
  const items = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  if (items.length === 0) {
    return { live: false, updated: new Date().toISOString(), items: TECH_NEWS }
  }
  return { live: true, updated: new Date().toISOString(), items: pick(items) }
}
