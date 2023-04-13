const express = require("express");
const debug = require("debug")("app:app");
const { Config } = require("./src/config");
const { ProductsModule } = require('./src/products');
const { UsersModule } = require('./src/users');
const { SalesModule } = require('./src/sales');

//Configuro cosas necesaria a express
const app = express();
app.use(express.json());

//Incorporo los Módulos a la app
ProductsModule(app)
UsersModule(app)
SalesModule(app)

app.listen(Config.port, () => {
    debug(`servidor escuchando en el puerto ${Config.port}`);
});
