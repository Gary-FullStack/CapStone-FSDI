import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.json({
       data: "this is working, yes", 
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`we are live on port ${port}`);
})