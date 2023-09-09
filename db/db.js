const mongoose = require('mongoose');


require('dotenv').config();

const dataBaseUrl = process.env.DATABASE_URL;

const connectDB = async () => {

    try {
        const connection = await mongoose.connect(dataBaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 

        console.log("database connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }



}

module.exports = connectDB;