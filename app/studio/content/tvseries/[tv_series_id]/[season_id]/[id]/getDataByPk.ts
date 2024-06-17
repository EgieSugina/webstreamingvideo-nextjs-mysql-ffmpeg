'use server'

import Models from '@/db/models/m_videos'
import EpisodeModel from '@/db/models/m_episodes'

export default async function getDataByPk(userId) {
  const user = await Models.findByPk(userId, {
    raw: true,
    include: [
      {
        model: EpisodeModel,
        required: true,
      },
    ],
  })
  return user
}
