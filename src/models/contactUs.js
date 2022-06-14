'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContactUs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {

        }
    }
    ContactUs.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        messages: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'ContactUs',
    });
    return ContactUs;
};