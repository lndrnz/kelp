require("dotenv").config();
const express = require('express');
const db = require("./db");

const morgan = require('morgan');
const app = express();

app.use(express.json())

//Get Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants" );
        console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
        restaurant: results.rows,
        },
    });
 } catch (err) {
    console.log(err)
 }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
    const results = await db.query(`select * from restaurants where id = 1$`, [req.params.id]);
    console.log(results.rows[0]);
    res.status(200).json({
        status: "success",
            data: {
                restaurant: results.rows[0],
            }
    })
} catch(err) {}

}) 

//Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query
        ("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
})

//Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
    console.log(results);

    res.status(200).json({
        status: "success",
            data: {
                restaurant: results.rows[0]
            }
    })
} catch (err) {
    console.log(err);
}
})

//Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const results = await db.query("delete from restaurants where id = $1",
        [req.params.id])
    console.log(results);
    res.status(204).json({
        status: "deleted"
    })
} catch (err) {
    console.log(err)
}
}) ;

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server up on port ${port}`)
});