const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/user");

app.use(bodyParser.json());
require('dotenv').config();



app.use(cors());

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRoutes);


app.listen(3000, () => {
  console.log("Server started on port 3000");
});