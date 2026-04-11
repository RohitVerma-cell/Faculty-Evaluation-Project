const express = require("express")
const {addFaculty, getFacultiesData} = require("../../controllers/adminController")
const adminRouter = express.Router()

adminRouter.get("/faculty", getFacultiesData)
adminRouter.post("/add/faculty", addFaculty);

module.exports = adminRouter