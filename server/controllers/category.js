import Category from "../models/category.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try{
        const { name } = req.body;
        if(!name.trim()) {
            return res.jason({ error: "whoa now, slow down!  A name is required!"});
        }
        const existingCategory = await Category.findOne({ name });
        if(existingCategory) {
            return res.json({ error: "This category already exists."});
        }
            // use slugify to transform the url portion
        const category = await new Category({ name, slug:slugify(name) }).save();
        res.json(category);
        
    }catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

export const update = async (req, res) => {
    try {
        
    }catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const remove = async (req, res) => {
    try {
        
    }catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        
    }catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const read = async (req, res) => {
    try {
        
    }catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};