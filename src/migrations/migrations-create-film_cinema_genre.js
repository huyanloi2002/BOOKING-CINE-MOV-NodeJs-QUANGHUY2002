'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('film_cinema_genre', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            filmId: {
                type: Sequelize.INTEGER
            },
            cinemaId: {
                type: Sequelize.INTEGER
            },
            genreId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('film_cinema_genre');
    }
};