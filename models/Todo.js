const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//TodoSchema
const TodoSchema = new Schema({
    name: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Todo',TodoSchema)