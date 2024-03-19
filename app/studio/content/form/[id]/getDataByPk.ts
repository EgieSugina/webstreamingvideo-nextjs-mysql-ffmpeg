'use server'

import Models from "@/db/models/m_videos";

export default async function getDataByPk(userId) {
    const user = await Models.findByPk(userId, {
      raw: true,
    });
    return user;
  }