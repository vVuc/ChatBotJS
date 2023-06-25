const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    addres: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    bought: {
        type: Array,
        required: true
    }
})
const User = mongoose.model("User", UserSchema);

module.exports = User;