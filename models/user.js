module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      }
    });
    return User;
  };
  