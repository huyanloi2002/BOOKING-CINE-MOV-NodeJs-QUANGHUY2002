module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Banners', 'imagebanner', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Banners', 'imagebanner', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};