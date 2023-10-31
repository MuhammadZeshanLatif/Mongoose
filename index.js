require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const server = express();
const cors = require('cors');
const productRouter = require('./router/productsRouter.js');
const usersRouter = require('./router/usersRouter.js');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
server.use(express.json());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("Database Connected...")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


console.log('env', process.env.DB_PASSWORD);
server
    .use(cors())
    .use('/products', productRouter.router)
    .use('/users', usersRouter.router)
    .use(morgan('default'))
    .use(express.static(process.env.PUBLIC_DIR))
    .use(express.json())
    .listen(process.env.PORT);
