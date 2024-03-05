const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "tv_series_detail",
  {
    series_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    season: {
      type: DataTypes.INTEGER
    },
    episodes: {
      type: DataTypes.INTEGER
    },
    ongoing: {
      type: DataTypes.BOOLEAN 
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
