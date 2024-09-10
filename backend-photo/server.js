import express from "express";
import dotenv from "dotenv";
dotenv.config();

import conn from "./db/conn.js";
conn();

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import postRoutes from "./routes/postRoutes.js";

const port = process.env.PORT || 6789;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRoutes);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
