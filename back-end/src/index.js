const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const router = require("./router");

app.use(express.json());
app.use(router);

app.listen(5000);
