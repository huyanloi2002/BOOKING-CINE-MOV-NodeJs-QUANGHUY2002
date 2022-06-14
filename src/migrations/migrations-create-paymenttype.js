'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('paymenttypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            valueVi: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            valueEn: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            keyMap: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.BLOB('long'),
                allowNull: false,
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
        await queryInterface.dropTable('paymenttypes');
    }
};