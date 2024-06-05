const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 4000;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 *
 * Setup Routing to serve HTML Pages.
 *
 *
 */

// home page serve (index.html)
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// login page serve (login.html)
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "login.html"))
);

// Result page serve (reselt.html)
app.get("/result", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "result.html"))
);

// Sign-up / Sign-in page serve (signupform.html)
app.get("/sign-up-in", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "signupform.html"))
);

// Voting page serve (startvoting.html)
app.get("/voting", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "startvoting.html"))
);

// User page serve (startvoting.html)
app.get("/user", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "user.html"))
);

/*
 *
 * Setup MongoDB connection using mongoose
 * with MongoDB URI.
 *
 */
mongoose
  .connect("mongodb+srv://root:root@cluster0.qwkzh90.mongodb.net/voting-db")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
const User = require("./models/User");

/*
 *
 * Form Submit to expres form html pages
 * And save it to MongoDB
 *
 *
 *
 */
app.post("/submit-sign-up-form", async (req, res) => {
  const { username, cnic, date, password } = req.body;
  const data = {
    username,
    password,
    cnic,
    joiningDate: date,
  };
  const newUser = new User(data);
  // console.log(data, " << data");

  try {
    const savedUser = await newUser.save();
    res.redirect("/sign-up-in?savedUser=true");
    // res.status(201).json(savedRecord);
  } catch (error) {
    res.redirect("/sign-up-in?savedUser=false");
    // res.status(400).json({ message: error.message });
  }
});

app.post("/submit-login-form", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ username });

    if (user) {
      res.redirect("/voting?login=true");
    } else {
      res.redirect("/sign-up-in?login=false");
    }
  } catch (error) {
    res.redirect("/sign-up-in?login=false");
  }
});

// Web App running status
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
