'use strict';
const {
    Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Film_Cinema_Genre extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Film_Cinema_Genre.init({
        filmId: DataTypes.INTEGER,
        cinemaID: DataTypes.INTEGER,
        genreId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Film_Cinema_Genre',
    });
    return Film_Cinema_Genre;
};