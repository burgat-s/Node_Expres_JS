const express = require("express");
const Router = express.Router();
const { ProductsController } = require('./controller');

module.exports.ProductsModule = (app) => {
    Router
        .get("/", ProductsController.getProducts)
        .get("/report", ProductsController.generateReport) 
        .get("/:id", ProductsController.getProduct)
        .post("/", ProductsController.createProduct)
        .delete("/:id", ProductsController.deleteProduct)
        .put("/:id", ProductsController.updateProduct)
        

    app.use("/api/products", Router);
};
