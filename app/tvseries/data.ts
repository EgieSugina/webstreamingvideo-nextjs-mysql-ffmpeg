"use server";
import TVSeriesDetail from "@/db/models/m_tv_series_detail";
export async function getTVSeries() {
  const tvSeries = await TVSeriesDetail.findAll({
    raw: true,
  });
  return tvSeries;
}
