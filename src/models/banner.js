'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //moi quan he cac bang
        static associate(models) {
            Banner.belongsTo(models.Film, { foreignKey: 'filmId' })
        }
    }
    Banner.init({
        filmId: DataTypes.INTEGER,
        imagebanner: DataTypes.INTEGER,
        description: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Banner',
    });
    return Banner;
};