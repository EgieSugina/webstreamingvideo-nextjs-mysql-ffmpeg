/* eslint-disable no-case-declarations */
import Models from '@/db/models/m_tv_series_detail'

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  const { series_id: FileName } = params
  const FilePath = path.join(process.cwd(), 'videos', 'series_cover', FileName)
  if (!fs.existsSync(FilePath)) {
    return new NextResponse('file not found: %s\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
  switch (path.extname(FileName)) {
    case '.png':
      // const _stat_png = fs.statSync(FilePath);
      const png = fs.readFileSync(FilePath)

      // const png = createReadStream(FilePath);
      return new NextResponse(png, {
        headers: {
          'Content-Type': 'image/png',
          // "Content-Length": _stat_png.size
        },
      })
    default:
      return new NextResponse(null, {
        status: 500,
      })
  }
}
export async function DELETE(request, context) {
  const { params } = context
  try {
    const data = await Models.findByPk(params.series_id)
    if (!data) {
      return NextResponse.json(
        { message: 'Content not found' },
        { status: 404 },
      )
    }
    await data.destroy()
    return NextResponse.json({ message: 'Content deleted successfully' })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
