const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListMovie = sequelize.define('ListMovie', {
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = ListMovie;
