module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    term: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [4, 4]
      }
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Course.associate = function(models) {
    Course.belongsTo(models.CourseCatalog);
    Course.hasMany(models.User)
  }

  return Course;
};
