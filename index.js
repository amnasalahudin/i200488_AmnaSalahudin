const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/user");
const brandRoutes = require("./Routes/brand"); //import routes
const productRoutes = require("./Routes/product");
const orderRoutes = require('./Routes/order');
const twilioRoutes = require('./Routes/twilio');

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
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/twilio", twilioRoutes);

const port = process.env.PORT || 3001;


app.listen(port, () => {
  console.log("Server started on port 3001");
});