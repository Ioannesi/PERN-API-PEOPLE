
const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres", // Εδώ καθορίστε τον τύπο της βάσης δεδομένων σας
      }
    );


    const testDbConnection = async () => {
        try {
            await db.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    };
    
    module.exports = { sq: db, testDbConnection };