const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

//router.get("",UserController.fetchUsers);
router.post("/",OrderController.generateOTP);
router.post("/:otp",OrderController.verifyOTP);
router.post("/:sessionId",OrderController.placeOrder);
//router.put("/:id",ProductController.updateProduct);
//router.delete("/:id",ProductController.deleteProduct);

module.exports = router;