'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {
            Allcode.hasMany(models.Film, { foreignKey: 'genreId', as: 'genreData' })
            Allcode.hasMany(models.Film, { foreignKey: 'showId', as: 'showData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeDataAll' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'seat', as: 'seatDataAll' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'seatType', as: 'seatTypeDataAll' })
        }
    }
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};