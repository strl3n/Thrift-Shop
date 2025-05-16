const express = require("express");
const userRouter = express.Router();
const userController = requires("../controllers/user.controller.js")
//====================================================================

userRouter.post('/register', userController.createUser);

userRouter.post('/login', userController.loginUser);

userRouter.put('/update', userController.updateUser);

userRouter.delete('/delete', userController.deleteUser);

//====================================================================
module.exports = userRouter;