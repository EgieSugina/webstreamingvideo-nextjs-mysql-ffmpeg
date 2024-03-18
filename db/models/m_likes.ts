const { DataTypes } = require("sequelize");

import Video from "../models/m_videos"
import sequelize from "../sequelize";

const Like = sequelize.define(
  "likes",
  {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    like_date: {
      type: DataTypes.DATE
    },
      },
  {
    timestamps: false,
    freezeTableName: true
  }
);
Like.belongsTo(Video, { foreignKey: 'video_id' });
Video.hasMany(Like, { foreignKey: 'video_id' });
export default Like;
