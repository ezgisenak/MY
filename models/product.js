'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Order}) {
      // define association here
      // this.hasMany(User,{foreignKey: 'user_id'});
      this.hasMany(Order,{foreignKey: 'product_id'});
    }
  };
  Product.init({
    product_name: {
      type : DataTypes.STRING,
      allowNull: false
    },
    product_count: {
      type : DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  //Product.sync({force: true});
  return Product;
};