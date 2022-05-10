'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('news', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },

            filmId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            imageNew: {
                allowNull: true,
                type: Sequelize.BLOB('long')
            },
            imageAuthor: {
                allowNull: true,
                type: Sequelize.BLOB('long')
            },
            nameAuthor: {
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
        await queryInterface.dropTable('news');
    }
};