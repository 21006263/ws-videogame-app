const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defining the model
  sequelize.define("genre", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    //! si se le quita el uuid, me trae el id de la api
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
};
