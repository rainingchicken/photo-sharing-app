import express from "express";
import dotenv from "dotenv";
dotenv.config();

import conn from "./db/conn.js";
conn();

const port = process.env.PORT || 6789;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ ya: "ya" });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
