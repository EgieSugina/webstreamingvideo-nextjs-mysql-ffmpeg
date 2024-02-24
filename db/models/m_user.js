const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.STRING,
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
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
export default Model;
