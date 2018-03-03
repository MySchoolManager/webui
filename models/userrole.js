module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  });

  return UserRole;
};
