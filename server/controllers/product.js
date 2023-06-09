import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree"; 
import dotenv from 'dotenv';
import Order from "../models/order.js";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY 
})



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
        const {productId, categoryId} = req.params;
        const related = await Product.find({
            category: categoryId,
            _id: { $ne: productId }, 
        }).select('-photo').populate("category").limit(3);
        res.json(related);
    } catch (err) {
        console.log(err);
    }
};

// braintree whatsis

export const getToken = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });

    } catch (err) {
        console.log(err);
    }
};


export const processPayment = async (req, res) => {
    try {
        const { nonce, cart } = req.body;

        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        // console.log("total =>", total);

        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                submitForSettlement: true,
                }
            }, 
            
            function (error, result) {
                if (result) {
                  // res.send(result);
                  // create order
                  const order = new Order({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                  }).save();
                  decrementQuantity(cart);
                res.json({ ok: true });
            } else {
                res.status(500).send(error);
            }
        }
    );

    } catch (err) {
        console.log(err);
    }
};


const decrementQuantity = async (cart) => {
    try {
      // build mongodb query
      const bulkOps = cart.map((item) => {
        return {
          updateOne: {
            filter: { _id: item._id },
            update: { $inc: { quantity: -0, sold: +1 } },
          },
        };
      });
  
      const updated = await Product.bulkWrite(bulkOps, {});
      console.log("blk updated", updated);
    } catch (err) {
      console.log(err);
    }
};


export const orderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, 
            { status }, { new: true }).populate("buyer", "email name");

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: order.buyer.email,
            subject: "Bookstore Order Status",
            html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,

        };

        try {
            await sgMail.send(emailData);
          } catch (err) {
            console.log(err);
          }


        res.json(order);

    } catch (err) {
        console.log(err);
    }
};