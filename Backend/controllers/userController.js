const bcrypt = require("bcryptjs")
const userModel = require("../models/userModel")


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in get all users",
            RangeError
        })
    }
}

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all Details"
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        console.log("okk")
        return res.status(200).send({
            success: true,
            user
        })

    } catch (err) {
        res.status(400).send(err)
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Provide username or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registered"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password or username"
            })
        }
        return res.status(200).send({
            success: true,
            message: "login successfully",
            user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            err
        })
    }
}

module.exports = { getAllUsers, userRegister,userLogin }