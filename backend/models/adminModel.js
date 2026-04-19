const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

const adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel