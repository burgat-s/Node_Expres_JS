const COLLECTION = "sales";
const {CommonService} = require('../common/commonService');
const ComService = new CommonService("sales")

const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { Utils } = require('../common/util');

let serviceObject;

function SalesService(collection) {
  serviceObject = collection;
}

SalesService.prototype = Object.create(ComService);
SalesService.prototype.constructor = SalesService;

module.exports.SalesService = SalesService;
