'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      // define association here
     this.hasMany(Order,{foreignKey: 'user_id'});
    // this.belongsToMany(Product,{through: Order , foreignKey: 'user_id' })
    }
  }
  User.init({
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    } ,
    role: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User'
  });
  //User.sync({force: true});
  return User;
};