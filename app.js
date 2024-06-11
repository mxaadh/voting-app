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
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "admin.html"))
);

// Dashboard page serve (dashboard.html)
app.get("/dashboard", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "dashboard.html"))
);

// Voteing list page serve (votelist.html)
app.get("/today-vote-list", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "todayVoteList.html"))
);

app.get("/Individual-vote-list", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "individualVoteList.html"))
);

app.get("/voter-name", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "todayVoteList.html"))
);

app.get("/result", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "todayVoteList.html"))
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
const Vote = require("./models/Vote");
const Admin = require("./models/Admin");

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
    const user = await User.findOne({ username, password });

    if (user) {
      // /voting?login=true&username=${user.username}&cnic=${cnic}
      // res.redirect("/voting?login=true");
      res.redirect(
        `/voting?login=true&username=${user.username}&cnic=${user.cnic}`
      );
    } else {
      res.redirect("/sign-up-in?login=false");
    }
  } catch (error) {
    res.redirect("/sign-up-in?login=false");
  }
});

app.post("/cast-vote", async (req, res) => {
  const { candidate, username, cnic } = req.body;
  const data = {
    candidate,
    username,
    cnic,
  };
  const newVote = new Vote(data);

  try {
    const savedVote = await newVote.save();
    // res.redirect("/result");
    res.status(201).json({ candidate, message: "Thank you for voting!" });
  } catch (error) {
    res.redirect("/sign-up-in");
  }
});

app.post("/submit-login-admin", async (req, res) => {
  const { username, password } = req.body;
  const data = { username, password };
  const admin = await Admin.findOne(data);
  // const newAdmin = new Admin(data);

  try {
    // const admin = await newAdmin.save();
    if (admin) {
      res.redirect(`/dashboard?login=true&username=${admin.username}`);
    } else {
      res.redirect("/admin?login=false");
    }
  } catch (error) {
    res.redirect("/admin?login=false");
  }
});

// Helper function to get today's date range
const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0); // Start of today
  const end = new Date();
  end.setHours(23, 59, 59, 999); // End of today
  return { start, end };
};

app.get("/today-vote-list-data", async (req, res) => {
  const { start, end } = getTodayRange();

  try {
    const vote = await Vote.find({
      votingDate: { $gte: start, $lt: end },
    });
    res.json(vote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/Individual-vote-list-date", async (req, res) => {
  const { start, end } = getTodayRange();
  let candidate = `Candidate ${req.query.candidate}`;
  console.log(candidate, "<< candidate");
  try {
    const vote = await Vote.find({
      candidate,
      votingDate: { $gte: start, $lt: end },
    });
    res.json(vote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/voter-name-date", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "todayVoteList.html"))
);

app.get("/result-date", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "todayVoteList.html"))
);

// Web App running status
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
