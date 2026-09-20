const mongoose = require('mongoose')
require('dotenv').config();

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MOGODB_URL);
        console.log("Database is connected Successfully.....✅");
        
    } catch (error) {
        console.log("Database is connection error.....❌",error);
    }

}
module.exports = ConnectDB;