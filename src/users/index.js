const express = require("express");
const Router = express.Router();
const { UsersController } = require('./controller');

module.exports.UsersModule = (app) => {
    Router
        .get("/", UsersController.getUsers)
        .get("/report", UsersController.generateReport) 
        .get("/:id", UsersController.getUser)
        .post("/", UsersController.createUser)
        .delete("/:id", UsersController.deleteUser)
        .put("/:id", UsersController.updateUser)
        
    app.use("/api/users", Router);
};
