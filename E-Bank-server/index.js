require("dotenv").config();
const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());

require("colors");

const conectarDB = require("./config/db");
const port = process.env.PORT || 5000;

conectarDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server on port ${port}`.yellow.bold);
});

const user = require("./routes/user");
const account = require("./routes/account");

app.use("/users", user);
app.use("/accounts", account);
