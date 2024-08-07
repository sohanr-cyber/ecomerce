import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

function bufferToBase64 (buffer) {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferRemote (url) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

async function getPlaceholderImage (filepath) {
  try {
    const originalBuffer = await getFileBufferRemote(filepath)
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer)
    }
  } catch (err) {
    console.log(err)
    return {
      src: filepath,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
    }
  }
}
export default async function handler (req, res) {
  const { imagePath } = req.body

  if (!imagePath) {
    return res.status(400).json({ error: 'Image path is required' })
  }

  try {
    // const imagePathFull = path.join(process.cwd(), 'public', imagePath)
    const result = await getPlaceholderImage(imagePath)
    res.status(200).json({ blurDataURL: result })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: error.message })
  }
}
