const mongoose = require('mongoose');

const CrudTbl = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

const crud = mongoose.model('crud', CrudTbl);

module.exports = crud;