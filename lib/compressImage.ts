/**
 * Compress and convert an image to WebP in the browser using the Canvas API.
 * Keeps GIFs untouched (canvas flattens animation).
 * Scales down if either dimension exceeds MAX_PX.
 * Target quality 0.85 — typically reduces a 7MB JPEG to ~1-2MB.
 */
const MAX_PX = 4000
const QUALITY = 0.85

export async function compressImage(file: File): Promise<File> {
  if (file.type === 'image/gif') return file

  const bitmap = await createImageBitmap(file)
  let { width, height } = bitmap

  if (width > MAX_PX || height > MAX_PX) {
    const ratio = Math.min(MAX_PX / width, MAX_PX / height)
    width  = Math.round(width  * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width  = width
  canvas.height = height
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) { reject(new Error('Canvas toBlob failed')); return }
        const name = file.name.replace(/\.[^.]+$/, '.webp')
        resolve(new File([blob], name, { type: 'image/webp' }))
      },
      'image/webp',
      QUALITY
    )
  })
}
