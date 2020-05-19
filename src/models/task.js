'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    columnId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: { 
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });

    Task.belongsTo(models.Column, {
      foreignKey: 'columnId',
      as: 'column'
    });
    
  };
  return Task;
};