const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Episodes = sequelize.define(
  "episodes",
  {
    episodes_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    season_id: {
      type: DataTypes.INTEGER,
    },
    episode_number: {
      type: DataTypes.INTEGER,
    },
    video_id: {
      type: DataTypes.STRING,
    },

  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


export default Episodes;
