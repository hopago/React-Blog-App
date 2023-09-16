const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const proxy = require('http-proxy-middleware');

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log("Mongodb Ready")
    )
  .then(
    app.listen("8000", () => {
    console.log("Backend Ready");
  }))
  .catch(err => console.log(err));

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "images")
  }, 
  
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }

});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File Uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);