const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";
import Video from "./m_videos"; 

const Model = sequelize.define(
  "history",
  {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    video_id: {
      type: DataTypes.INTEGER,
    },
    last_watch: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
// Model.belongsTo(Video, { foreignKey: 'video_id' }); 
export default Model;
