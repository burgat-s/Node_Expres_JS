const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { Utils } = require('./util');


let COLLECTION  ;

function CommonService(collection) {
    console.log('A');
    console.log(collection);
    this.COLLECTION = collection;
}

CommonService.prototype.getAll = async () => {
    const collection = await Database(COLLECTION)
    return collection.find({}).toArray()
} 

CommonService.prototype.getById = async (id) => {
    const collection = await Database(COLLECTION)
    return collection.findOne({ _id : new ObjectId(id)})
} 

CommonService.prototype.insertOne = async (data) => {
    console.log(COLLECTION);
    const collection = await Database(COLLECTION)
    let result = await collection.insertOne(data)
    return result.insertedId
}

CommonService.prototype.generateReport = async (name , res) => {
    let result = await getAll()
    Utils.excelGenerator(result, name, res)
}

CommonService.prototype.updateOne = async (id, data) => {
    const collection = await Database(COLLECTION)
    return collection.updateOne({ _id : new ObjectId(id)}, { $set: { ...data } }, { upsert: true })
} 

CommonService.prototype.deleteOne = async (id) => {
    const collection = await Database(COLLECTION)
    return collection.deleteOne({ _id : new ObjectId(id)})
} 

module.exports.CommonService = CommonService;