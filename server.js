import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Item } from "./models/itemmodel.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.mongoURL;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ============================== GET All Items ==============================
app.get("/item", async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ============================== POST Create Item ==============================
app.post("/item", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.title ||
      !req.body.description
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newItem = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    };

    const item = await Item.create(newItem);
    return res.status(200).send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating item" });
  }
});

// ============================== GET Item by ID ==============================
app.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ============================== DELETE Item by ID ==============================
app.delete("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

console.log("Serving static files from:", path.join(__dirname, "Frontend", "dist"));

// ============================== Serve Frontend ==============================
// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname,"Frontend","dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"));
});

// ============================== Connect to MongoDB and Start Server ==============================
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
  
  