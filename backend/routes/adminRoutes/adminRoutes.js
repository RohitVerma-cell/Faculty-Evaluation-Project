const express = require("express")
const {addFaculty, getFacultiesData, getFacultiesDataById, deleteFaculty} = require("../../controllers/adminController")
const adminRouter = express.Router()

adminRouter.get("/faculty", getFacultiesData);
adminRouter.get("/faculty/:facultyId", getFacultiesDataById);
adminRouter.delete("/faculty/delete/:facultyId", deleteFaculty);
adminRouter.post("/faculty/add", addFaculty);

module.exports = adminRouter