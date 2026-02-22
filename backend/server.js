const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");   // ✅ এটা missing ছিল

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sabu2728",
    database: "treety_db"
});

db.connect(err => {
    if(err) console.log("DB connection failed", err);
    else console.log("DB connected ✅");
});

// 🔹 Serve Images folder
app.use("/Images", express.static(path.join(__dirname, "../Images")));

// 🔹 Serve frontend folder (important)
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔹 GET products route
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if(err) return res.json({ error: err });
        res.json(result);
    });
});

// 🔹 Root route (optional but useful)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 🔹 Server listen
app.listen(5000, () => {
    console.log("Server running on port 5000");
});