const express = require("express")
const { addFaculty, getFacultiesData, getFacultiesDataById, deleteFaculty, login } = require("../../controllers/adminController");
const { default: verifyToken } = require("../../utils/verifyToken");
const adminRouter = express.Router()

adminRouter.post("/login",login)
adminRouter.get("/faculty", verifyToken, getFacultiesData);
adminRouter.get("/faculty/:facultyId", verifyToken, getFacultiesDataById);
adminRouter.delete("/faculty/delete/:facultyId", verifyToken, deleteFaculty);
adminRouter.post("/faculty/add", verifyToken, addFaculty);

module.exports = adminRouter