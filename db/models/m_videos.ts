const { DataTypes } = require("sequelize");

import MyList from "./m_my_list";

import sequelize from "../sequelize";

const Video = sequelize.define(
  "videos",
  {
    video_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM("done", "process")
    },
    upload_date: {
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    views: {
      type: DataTypes.INTEGER
    },
    public: {
      type: DataTypes.BOOLEAN
    },
    duration: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING
    },
    format_raw: {
      type: DataTypes.STRING
    },
    release_date: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM("movie", "tv_series")
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
// Video.hasMany(Like, { foreignKey: "video_id" });
Video.hasMany(MyList, { foreignKey: "video_id", sourceKey: "video_id" });
MyList.belongsTo(Video, { foreignKey: "video_id", targetKey: "video_id" });

export default Video;
