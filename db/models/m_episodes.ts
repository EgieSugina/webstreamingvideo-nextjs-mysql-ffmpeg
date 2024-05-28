const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";
import TVSeriesDetail from "./m_tv_series_detail";

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

Episodes.hasMany(TVSeriesDetail, { foreignKey: "series_id" });
TVSeriesDetail.belongsTo(Episodes, { foreignKey: "series_id" });

export default Episodes;
