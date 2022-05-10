'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('banners', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            filmId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            imagebanner: {
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('banners');
    }
};