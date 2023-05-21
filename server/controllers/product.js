import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";


export const create = async (req, res) => {
    try {
        // console.log(req.fields);
        // console.log(req.files);
        const { name, description, price, category, quantity, shipping } =
         req.fields;
        const { photo } = req.files; 


        // validate all the input fields  
        // I'm using 'switch' instead of 'if-else' because of the number of input conditions

        switch (true) {
            case !name.trim():
                res.json({ error: "A valid name is required." });

                case !description.trim():
                res.json({ error: "A valid description is required." });

                case !price.trim():
                res.json({ error: "Enter a price." });

                case !category.trim():
                res.json({ error: "A valid category name is required." });

                case !quantity.trim():
                res.json({ error: "A valid quantity is required." });

                case !shipping.trim():
                res.json({ error: "Shipping is required." });

                case photo && photo.size > 1000000:
                res.json({ error: "Image size must be less than 1MB." });
        }


        // Creating a Product, use spread operator to get all the above input from .fields
        const product = new Product({...req.fields, slug: slugify(name)});

        // fs and readfilesync from Node library
        if (photo) {
            product.photo.data = fs.readFileSync (photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }

};

export const list = async (req, res) => {
    try{
        const products = await Product.find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1});

        res.json(products);

    } catch (err) {
        console.log(err);
    }
};

export const read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
           .select("-photo")
           .populate("category");

           res.json(product);
        
    } catch (err) {
        console.log(err);
    }
};