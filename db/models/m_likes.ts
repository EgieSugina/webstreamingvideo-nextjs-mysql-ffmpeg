const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
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
export default Model;
