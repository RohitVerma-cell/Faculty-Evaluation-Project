const facultyModel = require("../models/facultyModel")
// const facultyModel = require("../models/facultyModel");
const bcrypt = require('bcrypt')

const addFaculty = async (req, res) => {

    const { fullname, email, password } = req.body;

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
        console.log(hashedPass)
        const facultyData = new facultyModel({
            fullname,
            email,
            password: hashedPass
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

module.exports = { addFaculty, getFacultiesData }