const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client"); // Import Prisma Client
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT;

const prisma = new PrismaClient(); // Create an instance of Prisma Client

 prisma.$connect()
 .then(() => {
   console.log("Connected to Prisma MongoDB");
 })
 .catch((error) => {
   console.error("Error connecting to Prisma:", error);
 });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const router = require("./routers/index");
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the app" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
