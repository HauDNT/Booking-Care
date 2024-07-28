const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking-care", "root", "123456", {
    host: "localhost",
    port: 3308,
    dialect: "mysql",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect to Database success!");
    } catch (error) {
        console.log("Connect to Database failed!");
    }
}

module.exports = connectDB;