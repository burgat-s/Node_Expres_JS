const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { Utils } = require('../common/util');


const COLLECTION = 'users'

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
    let users = await getAll()
    Utils.excelGenerator(users, name, res)
}

const updateUser = async (id, data) => {
    const collection = await Database(COLLECTION)
    return collection.updateOne({ _id : new ObjectId(id)}, { $set: { ...data } }, { upsert: true })
} 

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION)
    return collection.deleteOne({ _id : new ObjectId(id)})
} 

module.exports.UsersService = {
    getAll,
    getById,
    create,
    updateUser,
    deleteUser,
    generateReport,
}