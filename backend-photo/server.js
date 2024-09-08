import express from "express";
import dotenv from "dotenv";
dotenv.config();

import conn from "./db/conn.js";
conn();

import postRoutes from "./routes/postRoutes.js";

const port = process.env.PORT || 6789;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
