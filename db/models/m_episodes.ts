const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "episodes",
  {
    episodes_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    series_id: {
      type: DataTypes.INTEGER
    },
    episode_number: {
      type: DataTypes.INTEGER
    },
    video_id: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    release_date: {
      type: DataTypes.DATE
    },
    duration: {
      type: DataTypes.TIME
    },
	img_cover: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
