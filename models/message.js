module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    timestamp: {
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

  Message.associate = function(models) {
    Message.hasOne(models.User, {as: "sender"});
    Message.belongsTo(models.School);    
  };
  
  return Message;
};
