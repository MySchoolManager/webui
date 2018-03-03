module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Role.associations = function(models) {
    Role.belongsToMany(models.User, {
      through: {
        model: models.UserRole,
        unique: false
      },
      constraints: false
    });
  }

  return Role;
};
