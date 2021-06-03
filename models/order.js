'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Product}) {  
      Order.belongsTo(User, {foreignKey: 'user_id'});
      Order.belongsTo(Product,{foreignKey: 'product_id'});
      
    }
    // toJson(){
    //   return {...this.get(), user_id: undefined};
    // }

  };
  Order.init({
    order_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  //Order.sync({force: true});
  return Order;
};