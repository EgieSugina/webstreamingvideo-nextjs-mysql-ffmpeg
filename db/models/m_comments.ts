const { DataTypes } = require("sequelize");

import Video from "../models/m_videos";
import sequelize from "../sequelize";

const Comment = sequelize.define(
  "comments",
  {
    comments_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    comment_text: {
      type: DataTypes.TEXT
    },
    comment_date: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
Comment.belongsTo(Video, { foreignKey: "video_id" });
Video.hasMany(Comment, { foreignKey: "video_id" });
export default Comment;
