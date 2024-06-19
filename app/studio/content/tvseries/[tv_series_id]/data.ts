'use server'
import TVSeriesDetail from '@/db/models/m_tv_series_detail'
import Episodes from '@/db/models/m_episodes'
import Season from '@/db/models/m_season'
import Video from '@/db/models/m_videos'
import { v4 as uuidv4 } from 'uuid'

export async function findByPk(id) {
  const _data = await TVSeriesDetail.findByPk(id, { raw: true })
  console.log('_data', _data)

  return _data
}

export async function getSeasonBySeries(id) {
  const season = await Season.findAll({
    where: {
      series_id: id,
    },
    raw: true,
  })
  return season
}

export async function getEpisodesBySeason(seasonId) {
  const episodes = await Episodes.findAll({
    where: {
      season_id: seasonId,
    },
    raw: true,
  })
  return episodes
}

export async function getVideoById(videoId) {
  const video = await Video.findByPk(videoId, {
    raw: true,
  })
  return video
}

export async function getSeasonById(SeasonId) {
  const _season = await Season.findByPk(SeasonId, {
    raw: true,
  })
  return _season
}
export async function contentVisibelity(id, visibelity) {
  console.log(id, visibelity);
  
  const _video = await Video.findByPk(id)

  await _video.update({ public: visibelity })
}

export async function createSeason(data) {
  const seasonData = { ...data }
  const season = await Season.create(seasonData)
  return JSON.stringify(season)
}

export async function updateSeason(id, data) {
  const season = await Season.findByPk(id)
  await season.update(data)
  return JSON.stringify(season)
}

export async function deleteSeason(id) {
  const season = await Season.findByPk(id)
  await season.destroy()
  return JSON.stringify({ message: 'Season deleted successfully' })
}
