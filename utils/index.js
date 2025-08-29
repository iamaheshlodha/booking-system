export const handleResponse = (res, statusCode = 200, message = '', data = null, error = false) => {
    res.status(statusCode).json({
        statusCode,
        message,
        data,
        error
    })
}

export const handleErrorResponse = (res, statusCode = 400, message = 'Error') => {
    res.status(statusCode).json({
        statusCode,
        message,
        error: true
    })
}