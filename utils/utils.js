const getData = (rawData) =>{
    return Object.keys(rawData).map((key) => rawData[key]);
};
const responseHandler = ({res, data, statusCode, message}) => {
    return res
    .status(statusCode)
    .send({
        statusCode,
        message,
        data
    });
}

module.exports = {getData, responseHandler};