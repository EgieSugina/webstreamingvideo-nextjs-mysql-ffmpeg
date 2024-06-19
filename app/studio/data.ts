"use server";

import Comments from "@/db/models/m_comments";
import User from "@/db/models/m_user"; // Added m_user model
import Video from "@/db/models/m_videos";
import sequelize from '@/db/sequelize'
import { Op } from 'sequelize'
import Like from '@/db/models/m_likes'
export async function getDataLatestComments() {
  const data = await Comments.findAll({
    include: [
      {
        model: Video,
        attributes: ["title"]
      },
      {
        model: User, // Added User model
        attributes: ["fullname", "username", "img"] // Added attributes to retrieve fullname, username, and img
      }
    ],
    raw: true,
    limit: 5, // Limit the result to top 5 recent comments
    order: [['comment_date', 'DESC']] // Order the comments by createdAt timestamp in descending order
  });
  return data;
}
export async function getDataLatestPublish() {
    const data = await Video.findAll({
      raw: true,
      where: {
        public:true
      },
      attributes: [
        'video_id',
        'title',
        'description',
        'status',
        'upload_date',
        'user_id',
        'duration',
        'genre',
        'release_date',
        'type',
        'views',
        'public',
        [sequelize.fn('COUNT', sequelize.col('likes.like_id')), 'like_count'],
        [
          sequelize.fn('COUNT', sequelize.col('comments.comments_id')),
          'comment_count',
        ],
      ],
      include: [
        {
          model: Like,
          attributes: [],
          required: false,
        },
        {
          model: Comments,
          attributes: [],
          required: false,
        },
      ],
      group: ['videos.video_id'],
    //   limit: 5, // Limit the result to top 5 new
      order: [['upload_date', 'DESC']] // Order the videos by upload_date timestamp in descending order
    })
    return data
  }