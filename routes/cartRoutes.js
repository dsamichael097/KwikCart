const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');

//router.get("",CartController.fetchCarts);
router.get("/",CartController.createEntrySession);
router.post("/",CartController.addProductToCart);
router.put("/",CartController.updateProductInCart);
router.delete("/",CartController.deleteProductFromCart);

module.exports = router;