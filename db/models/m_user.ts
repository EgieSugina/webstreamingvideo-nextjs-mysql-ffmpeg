const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
