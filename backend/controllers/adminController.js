const facultyModel = require("../models/facultyModel")
// const facultyModel = require("../models/facultyModel");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const createAdmin = async (req, res) => {
    const { email, password, fullname } = req.body
    try {
        const isExist = await adminModel.findOne({ email });
        if (isExist) {
            return res.json({
                message: "Email already Exist",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 15)

        const adminData = new adminModel({
            email,
            password: hashedPass,
            fullname
        })

        await adminData.save();
        return res.json({
            message: "Registered successfully",
            success: true
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.json({
                message: "Admin not registered",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.json({
                message: "Incorect Password",
                success: false
            })
        }

        const token = jwt.sign(
            { adminId: admin._id, adminEmail: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        return res.json({
            message: "Login SuccessFully",
            success: true,
            token,
            data: admin
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

const addFaculty = async (req, res) => {

    const { fullname, email, password, department } = req.body;

    try {

        if (!fullname || !email || !password) {
            return res.json({
                message: "Every field is required",
                success: false
            })
        }

        const isExist = await facultyModel.findOne({ email });

        if (isExist) {
            return res.json({
                message: "Email already registered",
                succes: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 15)
        // console.log(hashedPass)
        const facultyData = new facultyModel({
            fullname,
            email,
            password: hashedPass,
            department
        })

        await facultyData.save();
        return res.json({
            message: "Faculty added successfully",
            success: true
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

const getFacultiesData = async (req, res) => {
    try {

        const facultyData = await facultyModel.find();
        return res.json({
            message: "Successfully fetched Faculty data",
            success: true,
            data: facultyData
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

const getFacultiesDataById = async (req, res) => {
    try {
        const facultyId = req.params.facultyId;
        const facultyData = await facultyModel.findById(facultyId);
        if (!facultyData) {
            return res.json({
                message: "Faculty does not Exist",
                success: false
            })
        }

        return res.json({
            message: "Successfully fetch data",
            data: facultyData
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

const deleteFaculty = async (req, res) => {
    try {
        const facultyId = req.params.facultyId
        if (!facultyId) {
            return res.json({
                message: "Faculty does not Exist",
                success: false
            })
        }

        await facultyModel.findByIdAndDelete(facultyId);
        return res.json({
            message: "Faculty Deleted fuccessfully",
            success: true
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}

module.exports = { addFaculty, getFacultiesData, getFacultiesDataById, deleteFaculty, login, createAdmin }