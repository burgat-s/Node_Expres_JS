const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { Utils } = require('../common/util');


const COLLECTION = 'products'

const getAll = async () => {
    const collection = await Database(COLLECTION)
    return collection.find({}).toArray()
} 

const getById = async (id) => {
    const collection = await Database(COLLECTION)
    return collection.findOne({ _id : new ObjectId(id)})
} 

const create = async (data) => {
    const collection = await Database(COLLECTION)
    let result = await collection.insertOne(data)
    return result.insertedId
} 

const generateReport = async (name , res) => {
    let products = await getAll()
    Utils.excelGenerator(products, name, res)
}

const updateProduct = async (id, data) => {
    const collection = await Database(COLLECTION)
    return collection.updateOne({ _id : new ObjectId(id)}, { $set: { ...data } }, { upsert: true })
} 

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION)
    return collection.deleteOne({ _id : new ObjectId(id)})
} 

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    updateProduct,
    deleteProduct,
    generateReport,
}