const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "movie_detail",
  {
    movie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    release_date: {
      type: DataTypes.DATE
    },
    duration: {
      type: DataTypes.TIME
    },
    img_cover: {
      type: DataTypes.STRING
    },
      },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
