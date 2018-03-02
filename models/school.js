
var User = require("./user")

module.exports = function(sequelize, DataTypes) {
    var School = sequelize.define("School", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 140]
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 127]
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 127]
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      guid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      }
    });
    School.hasMany(User);
    return School;
  };
