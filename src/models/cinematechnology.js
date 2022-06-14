'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cinematechnology extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cinematechnology.hasMany(models.Schedule, { foreignKey: 'cinemaTech', as: 'cinemaTechDataAll' })

        }
    }
    Cinematechnology.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Cinematechnology',
    });
    return Cinematechnology;
};