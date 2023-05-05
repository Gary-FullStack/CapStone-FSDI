import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// database connection
mongoose
.connect(process.env.MONGO_URI)
.then(() =>console.log("DB connected"))
.catch((err) => console.log("DB Error"));

app.get("/", (req, res) => {
    res.json({
       data: "this is working, yes", 
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`we are live on port ${port}`);
})