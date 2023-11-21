const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("haiiii");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
