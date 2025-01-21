const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.raw({ limit: "50mb" }));
app.use(express.text({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", (_req, res) => {
  res.send("Hello from Service 2!");
});

http.createServer(app).listen(8080, () => {
  console.log(`HTTP Server is running on http://localhost:8080`);
});
