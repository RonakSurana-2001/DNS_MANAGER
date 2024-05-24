const express = require("express");
const router = express.Router();

const {validateUserIsLogin,userRegister,userLogin}=require("../controllers/userController")


router.get("/validateUserIsLogin",validateUserIsLogin)
router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)


module.exports = router;
