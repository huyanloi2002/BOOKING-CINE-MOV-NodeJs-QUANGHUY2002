'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Buycombo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {
            Buycombo.belongsTo(models.Price, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceDataCombo' })
        }
    }
    Buycombo.init({
        name: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        price: DataTypes.STRING,
        description: DataTypes.TEXT('long'),
        cout: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Buycombo',
    });
    return Buycombo;
};