const { DataTypes } = require("sequelize");

import sequelize from "../sequelize";
import Video from "../models/m_videos";

const MyList = sequelize.define(
  "my_list",
  {
    id_mylist: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    video_id: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    mylistadd_date: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

export default MyList;
