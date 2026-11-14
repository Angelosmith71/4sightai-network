import { TECH_NEWS } from "@/lib/data"
import { loadTechNews } from "@/lib/tech-news"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const feed = await loadTechNews()
    return Response.json(feed)
  } catch {
    return Response.json({
      live: false,
      updated: new Date().toISOString(),
      items: TECH_NEWS,
    })
  }
}
