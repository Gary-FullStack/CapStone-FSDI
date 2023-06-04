import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";


// for creating a new product
export const create = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
         req.fields;
        const { photo } = req.files; 

        // validate all the input fields  
        // I'm using 'switch' instead of 'if-else' because of the number of input conditions
        switch (true) {
            case !name.trim():
               return res.json({ error: "A valid name is required." });

                case !description.trim():
                return res.json({ error: "A valid description is required." });

                case !price.trim():
                return res.json({ error: "Enter a price." });

                case !category.trim():
                return res.json({ error: "A valid category name is required." });

                case !quantity.trim():
                return res.json({ error: "A valid quantity is required." });

                case !shipping.trim():
                return res.json({ error: "Shipping is required." });

                case photo && photo.size > 1000000:
                return res.json({ error: "Image size must be less than 1MB." });
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

//  for returning entire list of products, only 12 at a time
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

// for returning a SINGLE product by its slug name
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

// for returning a photo for a product "not a json object"
export const photo = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select("photo");
        if(product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.send(product.photo.data);
        }
        
    } catch (err) {
        console.log(err);
    }
};

// for deleting products from DB
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.productId)
            .select("-photo");
            res.json(product); 

    } catch (err) {
        console.log(err);

    }

};

// for updating the products in the db
export const update = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
         req.fields;
        const { photo } = req.files; 

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

        // update here
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.fields,
            slug: slugify(name), 
        }, {new:true});

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

// for the filter fuction on the product page  ( I got a lot of help with this one. :) )
export const filteredProducts = async (req, res) => {
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      console.log("args => ", args);
  
      const products = await Product.find(args);
      console.log("filtered products query => ", products.length);
      res.json(products);
    } catch (err) {
      console.log(err);
    }
};

//  fuction to help with pagination and the "load more"
export const productsCount = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();

        res.json(total);
    } catch (err) {
        console.log(err);
    }
};

//  fuction to help with pagination and the "load more"
export const listProducts = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;

        const products = await Product.find({})
        .select("-photo")
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
        console.log(err); 
    }

};


// fuction for the product seach bar  Mongo db query( regex)

export const productsSearch = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }).select("-photo");
  
      res.json(results);
    } catch (err) {
      console.log(err);
    }
  };

//  related products 
 
export const relatedProducts = async (req, res) => {
    try {
        const {productId, caegoryId} = req.params;
        const related = await Product.find({
            category: caegoryId,
            _id: { $ne: productId }, 
        }).select('-photo').populate("category").limit(3);

        res.json(relatedProducts);
    } catch (err) {
        console.log(err);
    }
};