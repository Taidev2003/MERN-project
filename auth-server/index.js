const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");

const cors = require("cors");
const app = express();

dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Đảm bảo đường dẫn bắt đầu bằng dấu gạch chéo "/"
app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});
