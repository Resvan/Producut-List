import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addProduct, getAllProduct } from "../controller/productController.js";
import upload from "../config/multer.js";




const router = express.Router();

router.get('/',verifyToken, getAllProduct)
router.post('/add', verifyToken, upload.single('image'), addProduct);



export default router;