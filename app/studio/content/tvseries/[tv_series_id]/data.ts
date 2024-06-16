'use server'
import TVSeriesDetail from '@/db/models/m_tv_series_detail'
import Episodes from "@/db/models/m_episodes";
import Season from "@/db/models/m_season"; 
import Video from "@/db/models/m_videos";
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
  });
  return episodes;
}

export async function getVideoById(videoId) {
  const video = await Video.findByPk(videoId, {
    raw: true,
  });
  return video;
}