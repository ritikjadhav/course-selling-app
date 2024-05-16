const express = require("express");
const app = express();
const adminRouter = require("./routes/admin");

app.use(express.json()); // body parser

app.use(adminRouter);

app.listen(3000, () => {
  console.log("http server is up and running");
});
