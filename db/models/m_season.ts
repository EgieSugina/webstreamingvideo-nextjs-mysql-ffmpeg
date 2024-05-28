const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Season = sequelize.define(
  "season",
  {
    season_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    series_id: {
      type: DataTypes.STRING
    },
    total_episode: {
      type: DataTypes.INTEGER
    },
    season_number: {
      type: DataTypes.INTEGER
    },
      },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Season;

