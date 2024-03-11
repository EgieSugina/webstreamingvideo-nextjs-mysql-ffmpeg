'use server'

import M_User from "@/db/models/m_user";

export default async function getDataByPk(userId) {
    const user = await M_User.findByPk(userId, {
      raw: true,
    });
    return user;
  }