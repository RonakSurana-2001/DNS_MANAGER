const express = require("express");
const router = express.Router();

const {getAllUsers,userRegister,userLogin}=require("../controllers/userController")


router.get("/getAllUsers",getAllUsers)
router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)


module.exports = router;
