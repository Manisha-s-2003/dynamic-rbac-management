
const express = require("express");
const mongoose = require("mongoose");
const roleRoutes = require("./routes/roleRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);


mongoose
  .connect("mongodb://localhost:27017/sevascribe")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
