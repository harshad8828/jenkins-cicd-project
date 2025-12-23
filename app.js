const http = require("http");

const server = http.createServer((req, res) => {
  res.end("🚀 Jenkins CI/CD Pipeline Working!");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("App running on port 3000");
});
