const { request, response } = require('express');

const successfullyResponse = ({ microservice, extraDetail, data }) => {
    return {
        message: 'Solicitud exitosa',
        Microservice: microservice,
        extraDetail: extraDetail || data.length,
        data: data,
        currentDate: currentDate()
    };
};

const unsuccessfulResponse = ({ message, microservice }) => {
    return {
        message: message,
        Microservice: microservice,
        data: 'Ningún dato encontrado',
        currentDate: currentDate()
    };
};

const currentDate = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return month + '/' + day + '/' + year;
}


module.exports = {
    successfullyResponse,
    unsuccessfulResponse,
    currentDate
}