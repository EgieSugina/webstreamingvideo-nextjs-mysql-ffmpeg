const { DataTypes } = require("sequelize");

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
      type: DataTypes.ENUM('done','process')
    },
    upload_date: {
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM('movie','tv_series')
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
