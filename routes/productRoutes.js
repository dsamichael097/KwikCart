const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

//router.get("",UserController.fetchUsers);
router.get("/:id",ProductController.getProduct);
router.put("/:id",ProductController.updateProduct);
router.delete("/:id",ProductController.deleteProduct);

module.exports = router;