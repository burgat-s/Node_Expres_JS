const { ProductsService } = require("./service");
const debug = require("debug")("app:product-controller");
const { Response } = require('../common/response');
const createError = require('http-errors');

const getProducts = async (req, res) => {
    try {
        let products = await ProductsService.getAll();
        Response.success(res, 200, 'List of products.', products)
    } catch (error) {
        Response.error(res)
    }
};

const getProduct = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let product = await ProductsService.getById(id);
        if(!product){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `Product id ${id}.`, product)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const createProduct = async (req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest)
        } else {
            const insertedId = await ProductsService.create(body);
            Response.success(res, 200, `Product created.`, insertedId)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const generateReport = async (req, res) => {
    try {
        ProductsService.generateReport('inventario', res)
    } catch (error) {
        debug(error);
        Response.error(res)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        let deleted = await ProductsService.deleteProduct(id);
        if( deleted.deletedCount !== 1 ){
            Response.error(res, new createError.NotFound() )
        } else {
            Response.success(res, 200, `Product id ${id} deleted.`)
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            Response.error(res, new createError.BadRequest());
        } else {
            const updated = await ProductsService.updateProduct(id, body);
            if( updated.modifiedCount !== 1 ){
                Response.error(res, new createError.NotFound() )
            } else {
                Response.success(res, 200, `Product id ${id} updated successfully.`)
            }
        }
    } catch (error) {
        debug(error);
        Response.error(res)
    }
};

module.exports.ProductsController = {
    getProducts,
    getProduct,
    createProduct,
    generateReport,
    deleteProduct,
    updateProduct,
};
