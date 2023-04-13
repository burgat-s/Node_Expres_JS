const { CommonService } = require("./commonService");
const debug = require("debug")("app:common-controller");
const { Response } = require('../common/response');
const createError = require('http-errors');

let controllerName ;
function CommonController(collection) {
    this.controllerName = collection;
}

CommonController.prototype.getAll = async (req, res) => {
    try {
        let response = await CommonService.prototype.getAll();
        Response.success(res, 200, `List of ${controllerName}s.`, response)
    } catch (error) {
        Response.error(res)
    }
};

CommonController.prototype.getById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let response = await CommonService.prototype.getById(id);
        if(!response){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `${controllerName} id: ${id}.`, response)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

CommonController.prototype.insertOne = async (req, res) => {
    console.log('insertOne');
    console.log(controllerName);


    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest)
        } else {
            const insertedId = await CommonService.prototype.insertOne(body);
            Response.success(res, 200, `${controllerName} created.`, insertedId)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

CommonController.prototype.generateReport = async (req, res) => {
    try {
        CommonService.prototype.generateReport(`${controllerName}.report.`, res)
    } catch (error) {
        debug(error);
        Response.error(res)
    }
}

CommonController.prototype.deleteOne = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let deleted = await CommonService.prototype.deleteOne(id);
        if( deleted.deletedCount !== 1 ){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `${controllerName} id: ${id} deleted.`)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

CommonController.prototype.updateOne = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest());
        } else {
            const updated = await CommonService.prototype.updateOne(id, body);
            if( updated.modifiedCount !== 1 ){
                Response.error(res, new createError.NotFound() )
            } else {
                Response.success(res, 200, `${controllerName} id: ${id} updated successfully.`)
            }
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

module.exports.CommonController = CommonController;