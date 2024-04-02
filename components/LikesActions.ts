"use server";
import Like from "@/db/models/m_likes";

export async function findOne(userID, videoID) {
  const liked = await Like.findOne({
    raw:true,
    where: {
      video_id: videoID,
      user_id: userID
    }
  });
  console.log("COUNT:",liked)
  if (liked) {
    return true;
  } else {
    return false;
  }
}

export async function Count(videoID) {
  const LikeTotal = await Like.count({
    where: {
      video_id: videoID
    }
  });
  return Number(LikeTotal);
}

export async function create(userID, videoID) {
  Like.create({
    video_id: videoID,
    user_id: userID,
    like_date: new Date() // Set the like date to the current date
  });
}
export async function destroy(userID, videoID) {
  Like.destroy({
    where: {
      video_id: videoID,
      user_id: userID
    }
  });
}
