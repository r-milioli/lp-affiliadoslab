import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const assetsDir = path.resolve('src/assets')

const jobs = [
  // Tool screenshots: SVG wrappers with embedded PNG — crop to original viewBox (left portion)
  { from: 'provision.svg', to: 'provision.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  { from: 'wavro.svg', to: 'wavro.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  { from: 'zynklink.svg', to: 'zynklink.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  { from: 'fluxclik.svg', to: 'fluxclik.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  { from: 'multilink.svg', to: 'multilink.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  { from: 'smartShowcase.svg', to: 'smartShowcase.webp', maxWidth: 1600, quality: 80, cropToViewBox: true },
  // Raster assets
  { from: 'hero-ecossistema.jpg', to: 'hero-ecossistema.webp', maxWidth: 1920, quality: 78 },
  { from: 'GARANTIAS.png', to: 'garantias.webp', maxWidth: 800, quality: 82 },
  { from: 'BG06.png', to: 'garantia-bg.webp', maxWidth: 1200, quality: 75 },
  { from: 'logo-magnific.png', to: 'logo-magnific.webp', maxWidth: 256, quality: 85 },
]

function extractFromSvg(svgText) {
  const match = svgText.match(/xlink:href="data:img(?:age)?\/[^;]+;base64,([^"]+)"/i)
    || svgText.match(/href="data:img(?:age)?\/[^;]+;base64,([^"]+)"/i)
  if (!match) throw new Error('No embedded base64 image found in SVG')
  return Buffer.from(match[1], 'base64')
}

function parseViewBoxCrop(svgText, imageWidth, imageHeight) {
  const vb = svgText.match(/viewBox="([^"]+)"/i)
  if (!vb) return null
  const parts = vb[1].trim().split(/[\s,]+/).map(Number)
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null

  const [, , vbW, vbH] = parts

  // Image element may declare its own width/height in SVG user units
  const imgEl = svgText.match(/<image\b[^>]*>/i)?.[0] || ''
  const declaredW = Number((imgEl.match(/\bwidth="([0-9.]+)"/i) || [])[1])
  const declaredH = Number((imgEl.match(/\bheight="([0-9.]+)"/i) || [])[1])
  const declaredX = Number((imgEl.match(/\bx="([0-9.-]+)"/i) || [])[1] || 0)
  const declaredY = Number((imgEl.match(/\by="([0-9.-]+)"/i) || [])[1] || 0)

  const svgImgW = declaredW || imageWidth
  const svgImgH = declaredH || imageHeight

  // Map viewBox crop from SVG user units into source pixels
  const scaleX = imageWidth / svgImgW
  const scaleY = imageHeight / svgImgH

  let left = Math.max(0, Math.round((0 - declaredX) * scaleX))
  let top = Math.max(0, Math.round((0 - declaredY) * scaleY))
  let width = Math.round(vbW * scaleX)
  let height = Math.round(vbH * scaleY)

  // Clamp to image bounds
  if (left + width > imageWidth) width = imageWidth - left
  if (top + height > imageHeight) height = imageHeight - top

  if (width <= 0 || height <= 0) return null
  return { left, top, width, height }
}

async function convert({ from, to, maxWidth, quality, cropToViewBox = false }) {
  const inputPath = path.join(assetsDir, from)
  const outputPath = path.join(assetsDir, to)
  const inputStat = fs.statSync(inputPath)

  let inputBuffer
  let crop = null
  if (from.endsWith('.svg')) {
    const svgText = fs.readFileSync(inputPath, 'utf8')
    inputBuffer = extractFromSvg(svgText)
    if (cropToViewBox) {
      const meta = await sharp(inputBuffer, { failOn: 'none' }).metadata()
      crop = parseViewBoxCrop(svgText, meta.width, meta.height)
    }
  } else {
    inputBuffer = fs.readFileSync(inputPath)
  }

  const meta = await sharp(inputBuffer, { failOn: 'none' }).metadata()
  let pipeline = sharp(inputBuffer, { failOn: 'none' })

  if (crop) {
    pipeline = pipeline.extract(crop)
  }

  const afterCropMeta = crop
    ? { width: crop.width, height: crop.height }
    : { width: meta.width, height: meta.height }

  if (afterCropMeta.width && afterCropMeta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  await pipeline.webp({ quality, effort: 6 }).toFile(outputPath)

  const outStat = fs.statSync(outputPath)
  const outMeta = await sharp(outputPath).metadata()

  return {
    from,
    to,
    fromKb: +(inputStat.size / 1024).toFixed(1),
    toKb: +(outStat.size / 1024).toFixed(1),
    savedKb: +((inputStat.size - outStat.size) / 1024).toFixed(1),
    fromDim: `${meta.width || '?'}x${meta.height || '?'}`,
    crop: crop ? `${crop.width}x${crop.height}+${crop.left}+${crop.top}` : 'none',
    toDim: `${outMeta.width}x${outMeta.height}`,
  }
}

const rows = []
for (const job of jobs) {
  try {
    const row = await convert(job)
    rows.push(row)
    console.log(
      `${row.from} (${row.fromKb} KB, ${row.fromDim}) crop=${row.crop} -> ${row.to} (${row.toKb} KB, ${row.toDim})  saved ${row.savedKb} KB`,
    )
  } catch (err) {
    console.error(`FAIL ${job.from}:`, err.message)
    process.exitCode = 1
  }
}

const totalFrom = rows.reduce((s, r) => s + r.fromKb, 0)
const totalTo = rows.reduce((s, r) => s + r.toKb, 0)
console.log('---')
console.log(`TOTAL ${totalFrom.toFixed(1)} KB -> ${totalTo.toFixed(1)} KB (saved ${(totalFrom - totalTo).toFixed(1)} KB)`)
