
// Requirements:
//1. SignUp api
//2. Login api
//3. Edit profile api
//4. Logout profile api

// usermodels:
// email
// phone no
// username
// password

// Hashmodel
// hash
// privateKey

// 1. create an api in which hash and private key is stored
// 2. getPrivateKey api


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

const user = require("./routes/userRoutes");
const hash = require("./routes/hashRoutes");


app.use("/api/user", user);
app.use("/api/hash", hash);



const connectDB = async () => {
  console.log(process.env.mongoUri);
  try {
    const conn = await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
