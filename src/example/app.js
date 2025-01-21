const https = require("https");
const fs = require("fs");
const path = require("path");

const caPath = path.join(__dirname, "./certificate/server-ca.crt"); // CA file for verifying the server
const certPath = path.join(__dirname, "./certificate/client.crt"); // Client certificate
const keyPath = path.join(__dirname, "./certificate/client.key"); // Client private key

const options1 = {
  hostname: "localhost",
  port: 443,
  path: "/service1/",
  method: "GET",
  ca: fs.readFileSync(caPath),
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
  rejectUnauthorized: true,
};

const req1 = https.request(options1, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response from Service 1:", data);
  });
});
req1.on("error", (err) => {
  console.error("Error from Service 1:", err.message);
});
req1.end();

const options2 = {
  hostname: "localhost",
  port: 443,
  path: "/service2/",
  method: "GET",
  ca: fs.readFileSync(caPath),
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
  rejectUnauthorized: true,
};

const req2 = https.request(options2, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Response from Service 2:", data);
  });
});
req2.on("error", (err) => {
  console.error("Error from Service 2:", err.message);
});
req2.end();
