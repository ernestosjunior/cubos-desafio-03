const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

const router = require("./router");

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
