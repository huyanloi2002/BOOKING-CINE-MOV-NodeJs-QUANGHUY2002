'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('film_infors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            filmId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cinemaId: {
                type: Sequelize.STRING,
            },
            cinemaTechId: {
                type: Sequelize.STRING,
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        await queryInterface.dropTable('film_infors');
    }
};