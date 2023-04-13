const createError = require("http-errors");

const success = (res, status = 200, message = "Ok.", body = {}) => {
    res.status(status).json({ message, body });
};

const error = (res, error = null) => {
    const { statusCode, message } = error ? error : new createError.InternalServerError();
    res.status(statusCode).json({ message });
};

module.exports.Response = {
    success,
    error,
};
