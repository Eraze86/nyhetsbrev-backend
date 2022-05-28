const mongoose = require ("mongoose")


const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    passWord:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    newsLetter:{
        type: Boolean,
        required: true
    } 
})


module.exports = mongoose.model("user", UserSchema)