import Models from '@/db/models/m_videos'
import { NextResponse } from 'next/server'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import Episodes from '@/db/models/m_episodes'

const pump = promisify(pipeline)

export async function DELETE(request, context) {
  const { params } = context

  try {
    const data = await Models.findByPk(params.id)
    if (!data) {
      return NextResponse.json(
        { message: 'Content not found' },
        { status: 404 },
      )
    }
    await data.destroy()
    // Add episode deletion
    await Episodes.destroy({ where: { video_id: params.id } })
    return NextResponse.json({ message: 'Content deleted successfully' })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function POST(request, { params: { id } }) {
  try {
    const formData: any = await request.formData()
    const video_id = id
    const episodes_id = formData.get('episodes_id')
    const video = await Models.findByPk(video_id)
    if (!video) {
      return NextResponse.json(
        { message: 'Episode not found' },
        { status: 404 },
      )
    }
    const episodes = await Episodes.findByPk(episodes_id)
    if (!episodes) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 })
    }
    const data: any = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    data['type'] = 'tv_series'
    const file: any = formData.get('video_file')
    if (file.size > 0) {
      data['format_raw'] = file.name.split('.').pop()
      await pump(
        file.stream(),
        fs.createWriteStream(`videos/raw/${video_id}.${data['format_raw']}`),
      )
    }
    const updatedata = await video.update(data)
    // Add episode
    const episodeData = {
      season_id: formData.get('season_id'),
      video_id: video_id,
      episode_number: formData.get('episode_number'),
    }
    await episodes.update(episodeData)
    return NextResponse.json(updatedata)
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
