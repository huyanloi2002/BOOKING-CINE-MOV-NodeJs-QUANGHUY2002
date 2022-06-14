'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Film_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Film_Infor.init({
        filmId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        cinemaId: DataTypes.STRING,
        cinemaTechId: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Film_Infor',
    });
    return Film_Infor;
};