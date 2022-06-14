'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('films', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameVi: {
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            genreId: {
                type: Sequelize.STRING
            },
            showId: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            director: {
                type: Sequelize.STRING
            },
            actor: {
                type: Sequelize.STRING
            },
            dayShow: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.STRING
            },
            language: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('films');
    }
};