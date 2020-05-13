'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.STRING,
    createdAt: DataTypes.DATEONLY,
    updatedAt: DataTypes.DATEONLY
  }, {});
  Task.associate = function(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.Column);
  };
  return Task;
};