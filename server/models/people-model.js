const { sq, testDbConnection} = require("../config/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');


const People = sq.define('People', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateofbirth: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'people',
    timestamps: false 
  });

testDbConnection();

module.exports = People;