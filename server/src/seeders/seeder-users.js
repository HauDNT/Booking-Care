"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
        {
            email: "tienhau.it@gmail.com",
            password: "12345",
            firstName: "Thomas",
            lastName: "Dang",
            address: "Kien Giang Province",
            phoneNumber: "087776XXXX",
            gender: 1,
            image: "",
            roleId: "",
            positionId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
