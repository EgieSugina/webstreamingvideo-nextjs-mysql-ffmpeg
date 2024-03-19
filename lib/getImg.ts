"use server";
import M_User from "@/db/models/m_user";

export default async function getImage(id) {
    const user = await M_User.findByPk(id);
    console.log(user);
  
    if (!user) {
      return null;
    }
    return `data:image/png;base64,${user.img}`;
  }