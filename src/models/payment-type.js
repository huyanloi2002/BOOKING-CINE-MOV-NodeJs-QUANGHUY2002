'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PaymentType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {

        }
    }
    PaymentType.init({
        valueVi: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        image: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'PaymentType',
    });
    return PaymentType;
};