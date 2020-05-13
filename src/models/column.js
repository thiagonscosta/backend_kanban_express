'use strict';
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    name: DataTypes.STRING
  }, {});
  Column.associate = function(models) {
    this.hasMany(models.Task);
  };
  return Column;
};