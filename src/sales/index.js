const express = require("express");
const Router = express.Router();
const { SalesController } = require('./controller');
const Sales = new SalesController()

module.exports.SalesModule = (app) => {
    Router
        .get("/", Sales.getAll)
        .get("/report", Sales.generateReport) 
        .get("/:id", Sales.getById)
        .post("/", Sales.insertOne)
        .delete("/:id", Sales.deleteOne)
        .put("/:id", Sales.updateOne)
        

    app.use("/api/sales", Router);
};
