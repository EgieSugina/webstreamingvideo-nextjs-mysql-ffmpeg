const { DataTypes } = require("sequelize");

// import Like from "./m_likes";

import sequelize from "../sequelize";

const Model = sequelize.define(
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
    duration: {
      type: DataTypes.STRING
    },
    genre: {
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
// Model.hasMany(Like, { foreignKey: "video_id" });

export default Model;
