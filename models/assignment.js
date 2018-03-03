module.exports = function(sequelize, DataTypes) {
  var Assignment = sequelize.define("Assignment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 140]
      }
    },
    grade: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Assignment.associate = function(models) {
    Assignment.belongsTo(models.Course);
  }

  return Assignment;
};
