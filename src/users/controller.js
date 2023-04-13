const { UsersService } = require("./service");
const debug = require("debug")("app:users-controller");
const { Response } = require('../common/response');
const createError = require('http-errors');

const getUsers = async (req, res) => {
    try {
        let users = await UsersService.getAll();
        Response.success(res, 200, 'List of users.', users)
    } catch (error) {
        Response.error(res)
    }
};

const getUser = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let user = await UsersService.getById(id);
        if(!user){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `User id ${id}.`, user)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const createUser = async (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest)
        } else {
            const insertedId = await UsersService.create(body);
            Response.success(res, 200, `User created.`, insertedId)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const generateReport = async (req, res) => {
    try {
        UsersService.generateReport('Usuarios', res)
    } catch (error) {
        debug(error);
        Response.error(res)
    }
}

const deleteUser = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let deleted = await UsersService.deleteUser(id);
        if( deleted.deletedCount !== 1 ){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `User id ${id} deleted.`)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const updateUser = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest());
        } else {
            const updated = await UsersService.updateUser(id, body);
            if( updated.modifiedCount !== 1 ){
                Response.error(res, new createError.NotFound() )
            } else {
                Response.success(res, 200, `User id ${id} updated successfully.`)
            }
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

module.exports.UsersController = {
    getUsers,
    getUser,
    createUser,
    generateReport,
    deleteUser,
    updateUser,
};
