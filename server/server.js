require("dotenv").config();
const express = require("express");
const app = express();
const usersRoute = require("./routes/user");
const authRoute = require("./routes/auth");

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes api
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
