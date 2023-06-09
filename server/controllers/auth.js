import User from "../models/user.js";
import { hashPassword, comparePassword } from './../helpers/auth.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/order.js";

dotenv.config();


// these are the various security tests for registration

export const register = async (req, res) => {
    try{     
        // validate the input fields   
        const { name, email, password } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Your name is required!" });
        }
        if (!email) {
            return res.json({ error: " This email is already in the system, use another or log in with original."});
        }
        if (!password || password.length < 6 ) {
            return res.json({ error: "Password must be at least 6 characters in length."});
        }
        // check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: "That email is already taken."})
        }
        //  Hash the password here
        const hashedPassword = await hashPassword(password);

        // then register and save the new user
        const user = await new User({ name, email, password: hashedPassword}).save();

        // generate a jwt token and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });

        res.json({
           user:{
                name: user.name, 
                email: user.email,
                role: user.role,
                address: user.address, 
            },
            token,         
        });    
      
    }   catch (err) {
            console.log(err);
        }
};

//  here are the various security measures for log in.
export const login = async (req, res) => {
    try{     
        // validate the input fields   
        const { email, password } = req.body;  

        if (!email) {
            return res.json({ error: " Email not found, try again.."});
        }
        if (!password || password.length < 6 ) {
            return res.json({ error: "Password must be at least 6 characters in length."});
        }
        // check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User Not found, try again or register."})
        }
        //  compare the password here
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.json({ error: "incorrect password" })
        }

        // generate a jwt token and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });

        res.json({
           user:{
                name: user.name, 
                email: user.email,
                role: user.role,
                address: user.address, 
            },
            token,         
        });    
      
    }   catch (err) {
            console.log(err);
        }

};


export const secret = async (req, res) => {
    res.json({ currentUser: req.user });
};


export const updateProfile = async (req, res) => {
    try {
      const { name, password, address } = req.body;
      const user = await User.findById(req.user._id);
      // check password length
      if (password && password.length < 6) {
        return res.json({
          error: "Password is required and must be at least 6 characters long",
        });
      }
      // hash the password
      const hashedPassword = password ? await hashPassword(password) : undefined;
  
      const updated = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          address: address || user.address,
        },
        { new: true }
      );
  
      updated.password = undefined;
      res.json(updated);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  };

  export const allOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  };