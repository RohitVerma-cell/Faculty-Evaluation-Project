const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const facultyModel = mongoose.models.faculty || mongoose.model("faculty", facultySchema);

module.exports = facultyModel;