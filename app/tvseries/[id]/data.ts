"use server";
// import { Op } from "sequelize";

import Episodes from "@/db/models/m_episodes";
import Season from "@/db/models/m_season"; 
import TVSeriesDetail from "@/db/models/m_tv_series_detail";
import Video from "@/db/models/m_videos";

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
    include: [
      {
        model: Video,
        where: {
          public: true,
        },
      },
    ],
    raw: true,
  });
  return episodes;
}
export async function getVideoById(videoId) {
  const video = await Video.findByPk(videoId, {
    raw: true,
    where: {
      public: 1,
    },
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
                  public: true,
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

