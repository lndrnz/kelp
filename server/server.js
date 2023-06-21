require("dotenv").config();
const express = require('express');
const db = require("./db");

const morgan = require('morgan');
const app = express();

app.use(express.json())

app.get("/api/v1/restaurants", async (req, res) => {
        const results = await db.query("select * from restaurants" );
        console.log(results);
    res.status(200).json({
        status: "success",
        data: {
        restaurant: ["mcdonalds", "wendys"]
        },
    });
});

app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params);

    res.status(200).json({
        status: "success",
            data: {
                restaurant: "mcdonalds"
            }
    })
}) 

app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
            data: {
                restaurant: "mcdonalds"
            }
    })
})

app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
            data: {
                restaurant: "mcdonalds"
            }
    })
})

app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "deleted"
    })
}) 
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server up on port ${port}`)
});