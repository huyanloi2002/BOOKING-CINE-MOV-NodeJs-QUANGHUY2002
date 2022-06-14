'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataAll' })
            Schedule.belongsTo(models.Price, { foreignKey: 'price', targetKey: 'keyMap', as: 'priceDataAll' })
            Schedule.belongsTo(models.Allcode, { foreignKey: 'seat', targetKey: 'keyMap', as: 'seatDataAll' })
            Schedule.belongsTo(models.Allcode, { foreignKey: 'seatType', targetKey: 'keyMap', as: 'seatTypeDataAll' })
            Schedule.belongsTo(models.Cinematechnology, { foreignKey: 'cinemaTech', targetKey: 'name', as: 'cinemaTechDataAll' })
        }
    }
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        filmId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        cinemaTech: DataTypes.STRING,
        timeType: DataTypes.STRING,
        seatType: DataTypes.STRING,
        price: DataTypes.STRING,
        seat: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};