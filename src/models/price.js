'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Price extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {
            Price.hasMany(models.Schedule, { foreignKey: 'price', as: 'priceDataAll' })
            Price.hasMany(models.Buycombo, { foreignKey: 'price', as: 'priceDataCombo' })
        }
    }
    Price.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.DECIMAL(10, 2),
        valueVi: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Price',
    });
    return Price;
};