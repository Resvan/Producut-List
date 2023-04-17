import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
    try {
        const { price, imagePath } = req.body;
        const { id } = req.user;
        

        const newProduct = new Product({
            price,
            owner: id,
            image: imagePath,
        });

        const savedProduct = await newProduct.save();
        

        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products)
    } catch (err) {
        
    }
}
