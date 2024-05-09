const express = require("express");
const { testController } = require("../controllers/testController");


//router object
const router = express.Router()  //creating a object with all ruter functionalities


//creating router
router.get('/', testController)

//exporting router

module.exports = router;