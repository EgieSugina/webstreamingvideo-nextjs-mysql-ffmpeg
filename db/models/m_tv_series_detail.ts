const { DataTypes } = require('sequelize')

import sequelize from '../sequelize'
import Season from './m_season'

const Model = sequelize.define(
  'tv_series_details',
  {
    series_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    ongoing: {
      type: DataTypes.BOOLEAN,
    },
    public: {
      type: DataTypes.BOOLEAN,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

Model.hasMany(Season, { foreignKey: 'series_id' })

export default Model
