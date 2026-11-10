import type { IssuedCertificate } from "./certificate"
import { CAFP_ABBR, CAFP_NAME, publicVerifyUrl } from "./certificate"

export async function downloadCertificatePng(
  studentName: string,
  certificate: IssuedCertificate
) {
  const width = 2000
  const height = 1414
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.fillStyle = "#070c14"
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = "rgba(77,184,255,0.55)"
  ctx.lineWidth = 8
  ctx.strokeRect(36, 36, width - 72, height - 72)
  ctx.strokeStyle = "rgba(255,255,255,0.12)"
  ctx.lineWidth = 2
  ctx.strokeRect(56, 56, width - 112, height - 112)

  try {
    const logo = new Image()
    logo.src = "/logo-mark.webp"
    await logo.decode()
    ctx.drawImage(logo, width / 2 - 56, 90, 112, 112)
  } catch {
    /* logo optional */
  }

  ctx.fillStyle = "#4db8ff"
  ctx.font = "600 22px sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("4SIGHTAI ACADEMY", width / 2, 250)

  ctx.fillStyle = "#ffffff"
  ctx.font = "700 64px sans-serif"
  ctx.fillText("Certificate of Completion", width / 2, 330)

  ctx.fillStyle = "#4db8ff"
  ctx.font = "500 28px sans-serif"
  ctx.fillText(`${CAFP_NAME} (${CAFP_ABBR})`, width / 2, 380)

  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 20px sans-serif"
  ctx.fillText("THIS CERTIFIES THAT", width / 2, 470)

  ctx.fillStyle = "#ffffff"
  ctx.font = "700 72px sans-serif"
  ctx.fillText(studentName, width / 2, 560)

  ctx.fillStyle = "rgba(232,241,251,0.82)"
  ctx.font = "400 26px sans-serif"
  const body =
    "has successfully completed the requirements of the 4SightAI Certified AI Foundations Professional Program and demonstrated competency in Artificial Intelligence Fundamentals, Prompt Engineering, AI Agents & Automation Concepts, and Cybersecurity Fundamentals."
  wrapText(ctx, body, width / 2, 620, 1500, 36)

  ctx.textAlign = "left"
  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 18px sans-serif"
  ctx.fillText("CERTIFICATE ID", 180, 860)
  ctx.fillStyle = "#4db8ff"
  ctx.font = "600 26px monospace"
  ctx.fillText(certificate.id, 180, 900)
  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 18px sans-serif"
  ctx.fillText("ISSUE DATE", 180, 960)
  ctx.fillStyle = "#e8f1fb"
  ctx.font = "400 24px sans-serif"
  ctx.fillText(certificate.issueDate, 180, 1000)

  ctx.textAlign = "right"
  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 18px sans-serif"
  ctx.fillText("VERIFICATION URL", width - 180, 860)
  ctx.fillStyle = "#4db8ff"
  ctx.font = "400 20px sans-serif"
  ctx.fillText(publicVerifyUrl(certificate.id), width - 180, 900)
  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 18px sans-serif"
  ctx.fillText("WEBSITE", width - 180, 960)
  ctx.fillStyle = "#e8f1fb"
  ctx.font = "400 24px sans-serif"
  ctx.fillText("www.4sightai.net", width - 180, 1000)

  ctx.textAlign = "left"
  ctx.fillStyle = "#e8f1fb"
  ctx.font = "italic 700 40px serif"
  ctx.fillText("Angelo Smith", 180, 1180)
  ctx.fillStyle = "#8aa0b8"
  ctx.font = "500 16px sans-serif"
  ctx.fillText("FOUNDER SIGNATURE", 180, 1218)
  ctx.fillText(`Signature date: ${certificate.signatureDate}`, 180, 1246)

  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(77,184,255,0.85)"
  ctx.font = "600 16px sans-serif"
  ctx.fillText("INTELLIGENCE  ·  AUTOMATION  ·  CONNECTIVITY", width - 180, 1218)

  const url = canvas.toDataURL("image/png")
  const a = document.createElement("a")
  a.href = url
  a.download = `4SightAI-${CAFP_ABBR}-${studentName.replace(/\s+/g, "-")}.png`
  a.click()
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ")
  let line = ""
  let yy = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, yy)
      line = word
      yy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, yy)
}
