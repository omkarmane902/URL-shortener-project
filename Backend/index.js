const express = require('express')
require('dotenv').config();
const ConnectDB = require('./src/db/db.js');
const  route  = require('./src/router/url.js');
const cors = require("cors");

const app = express();
ConnectDB();

app.use(cors());
app.use(express.json());

app.use('/url',route)


app.listen(process.env.PORT , ()=>console.log("Server is running Successfully.....✅"))