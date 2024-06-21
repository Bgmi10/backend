const mongoose = require('mongoose')

const Todoschema = new mongoose.Schema({
    usermsg:{
        type:String,
        required:true
    },
    todo_update_status :{
        type: Boolean,
        default : false
        
    }
})

const Todo = mongoose.model('Todo' , Todoschema)

module.exports  = Todo