require("dotenv").config();
const express = require("express");
const app = express();
const usersRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adsRoute = require("./routes/ad");
const commentsRoute = require("./routes/comment");

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes api
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/ads", adsRoute);
app.use("/api/comments", commentsRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
