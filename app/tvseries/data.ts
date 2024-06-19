"use server";
import TVSeriesDetail from "@/db/models/m_tv_series_detail";
import { Op } from "sequelize";

export async function getTVSeries(genre) {
  const tvSeries = await TVSeriesDetail.findAll({
    where: {
      public: true,
      genre:
        genre !== "All" ? { [Op.like]: `%${genre}%` } : { [Op.like]: `%%` },
    },
    raw: true,
  });
  return tvSeries;
}
