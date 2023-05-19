import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema ({
    
    name: {
        type: String,
        trim: true,
        required: true,
    },

    slug: {
        type: String,
        lowercase: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        trim: true,
        required: true,
    },

    category: {
        type: ObjectId,
        ref: "Categpry",
        required: true,
    },

    quantity: {
        type: Number,
    },

    sold: {
        type: Number,
        default: 0.
    },

    photo: {
        data: Buffer,
        contentType: String,
    },

    shipping: {
        required: false,
        type: Boolean,
    },
}, { timestamps: true } 
);

export default mongoose.model("Product", productSchema);