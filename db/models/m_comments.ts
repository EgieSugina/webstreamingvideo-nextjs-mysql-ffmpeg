const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "comments",
  {
    comments_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING
    },
    comment_text: {
      type: DataTypes.STRING
    },
    comment_date: {
      type: DataTypes.STRING
    },
      },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
