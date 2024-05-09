const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/db");

//dotenv conig
dotenv.config();
//mongodb connection
connectDB();

//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
//1test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoute"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/forgotPassword", require("./routes/forgotPasswordRoutes"));
//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode  On ${process.env.PORT}`
      .bgBlue.white
  );
});
