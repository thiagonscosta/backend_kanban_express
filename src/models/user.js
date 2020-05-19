'use strict';
var bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      trim: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      trim: true,
    },
    avatarUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      } 
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Column, {
      foreingKey: 'userId',
      as: 'columns',
    });

    User.hasMany(models.Task, {
      foreingKey: 'userId',
      as: 'tasks',
    })
  };
  return User;
};