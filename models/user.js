const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    }, //passport-local-mongoose automatically adds a username and password
}) 

userSchema.plugin(passportLocalMongoose.default); //autmotically implements hashing, salting, hashed password and username

module.exports = mongoose.model('User', userSchema);
