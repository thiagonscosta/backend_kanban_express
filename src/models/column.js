'use strict';
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Column.associate = function(models) {
    Column.hasMany(models.Task, {
      foreignKey: 'columnId',
      as: 'tasks',
      onDelete: 'CASCADE'
    });
  };
  return Column;
};