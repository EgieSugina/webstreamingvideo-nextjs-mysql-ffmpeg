"use server";

import Videos from "@/db/models/m_videos";
import sequelize from "@/db/sequelize";

export async function findOne() {
  const data = await Videos.findOne({
    where: { public: true },
    raw: true,

    order: sequelize.random()
  });
  return data;
}
