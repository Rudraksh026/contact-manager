const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controllers")
const {Signup,login,addContact} = require("../validator/auth-validator")
const {validation} = require("../middleware/validate-middleware")
const {authMiddleware} = require("../middleware/auth-Middleware")

router.route('/').get(authController.home)

router.route('/login').post(validation(login),authController.login)

router.route('/signup').post(validation(Signup),authController.signup)

router.route('/add-contact').post(validation(addContact),authController.addContact)

router.route('/user').get(authMiddleware,authController.user)

router.route('/delete-contact').post(authController.deleteContact)

module.exports = router