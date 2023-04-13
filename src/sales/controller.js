const COLLECTION = "sales";
const {CommonController} = require('../common/commonController');
const ComController = new CommonController(COLLECTION)

const { SalesService } = require("./service");
const debug = require("debug")("app:sales-controller");
const { Response } = require('../common/response');
const createError = require('http-errors');


let controllerObject;

function SalesController() {
  controllerObject = COLLECTION;
}

SalesController.prototype = Object.create(ComController);
SalesController.prototype.constructor = SalesController.call;

module.exports.SalesController = SalesController;
