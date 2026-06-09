const MAX_PX = 4000
const QUALITY = 0.85
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB — matches server-side upload limit

export async function compressImage(file: File): Promise<File> {
  if (!ALLOWED_TYPES.has(file.type)) throw new Error('Unsupported image type')
  if (file.size > MAX_BYTES) throw new Error('File too large — maximum size is 10 MB')
  if (file.type === 'image/gif') return file

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error('Could not read image — file may be corrupt')
  }

  let { width, height } = bitmap

  if (width === 0 || height === 0) {
    bitmap.close()
    throw new Error('Image has zero dimensions')
  }

  if (width > MAX_PX || height > MAX_PX) {
    const ratio = Math.min(MAX_PX / width, MAX_PX / height)
    width  = Math.round(width  * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width  = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Canvas 2D context unavailable')
  }

  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) { reject(new Error('Canvas toBlob failed')); return }
        const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'
        resolve(new File([blob], `${baseName}.webp`, { type: 'image/webp' }))
      },
      'image/webp',
      QUALITY
    )
  })
}
