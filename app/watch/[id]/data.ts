import Videos from "@/db/models/m_videos";
import History from "@/db/models/m_history";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import sequelize from "@/db/sequelize"; // Import sequelize
export async function getTitle(id) {
  const session = await getServerSession(authOptions);

  const data = await Videos.findByPk(id, {
    raw: true,
  });
  const _filter = { video_id: id, user_id: session.user.id };
  const historyEntry = await History.findOne({
    where: _filter,
  });

  if (historyEntry) {
    await History.update(
      { last_watch: sequelize.literal("CURRENT_TIMESTAMP") },
      { where: _filter }
    );
  } else {
    const A = await History.create(_filter);
    console.log(A);
    
  }

  // Update last_watch using ON UPDATE CURRENT_TIMESTAMP()

  return data;
}
