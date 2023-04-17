import cloudinary from "../config/cloudinery.js";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const { id } = req.user;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Products"
        });

        const newProduct = new Product({
            name,
            price,
            owner: id,
            image: result.secure_url,
        });

        const savedProduct = await newProduct.save();
        

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}