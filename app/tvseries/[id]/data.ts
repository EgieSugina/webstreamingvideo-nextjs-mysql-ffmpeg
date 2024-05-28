"use server";
import { Op } from "sequelize";
import TVSeriesDetail from "@/db/models/m_tv_series_detail";
import Episodes from "@/db/models/m_episodes";
import Video from "@/db/models/m_videos";
import Season from "@/db/models/m_season"; // Added import for m_season model

export async function getTVSeriesByid(id) {
  const tvSeries = await TVSeriesDetail.findByPk(id, {
    raw: true,
  });
  return tvSeries;
}
export async function getSeasonBySeries(id) {
  const season = await Season.findAll({
    where: {
      series_id: id,
    },
    raw: true,
  });
  return season;
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

export async function getTVSeriesWithSeasonsAndEpisodes(id) {
  const tvSeries = await TVSeriesDetail.findAll({
    include: [
      {
        required: true,

        model: Season,
        include: [
          {
            required: true,

            model: Episodes,
            include: [
              {
                required: true,
                model: Video,
                where: {
                  video_id: id,
                },
              },
            ],
          },
        ],
      },
    ],
    raw: true,
  });
  if (tvSeries.length > 0) {
    const { series_id } = tvSeries[0];
    return series_id;
  }
  return null
}
