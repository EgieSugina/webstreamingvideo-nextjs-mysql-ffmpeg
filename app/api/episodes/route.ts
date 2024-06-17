import { NextRequest, NextResponse } from 'next/server'

import Comments from '@/db/models/m_comments'
import Like from '@/db/models/m_likes'
import Models from '@/db/models/m_videos'
import Videos from '@/db/models/m_videos'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import sequelize from '@/db/sequelize'
import { v4 as uuidv4 } from 'uuid'
import Episodes from '@/db/models/m_episodes'

const pump = promisify(pipeline)

export async function POST(request: NextRequest) {
  const uuid = uuidv4()
  const clean_uuid = 'tvs_ep-' + uuid.replace(/-/g, '').substring(0, 11)
  try {
    const formData: any = await request.formData()

    const data: any = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    data['video_id'] = clean_uuid
    data['type'] = 'tv_series'
    const file: any = formData.get('video_file')

    if (file.size > 0) {
      data['format_raw'] = file.name.split('.').pop()

      await pump(
        file.stream(),
        fs.createWriteStream(`videos/raw/${clean_uuid}.${data['format_raw']}`),
      )
    }
    const createdVideo = await Models.create(data)
    const episodeData = {
      season_id: formData.get('season_id'),
      video_id: createdVideo.video_id,
      episode_number: formData.get('episode_number'),
    }
    await Episodes.create(episodeData)

    return NextResponse.json(createdVideo)
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
