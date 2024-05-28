const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";

const Model = sequelize.define(
  "tv_series_details",
  {
    series_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    
    ongoing: {
      type: DataTypes.BOOLEAN 
    },
    description: {
      type: DataTypes.TEXT
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
export default Model;
