require("dotenv").config();
require("./db");
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port,() => {
    console.log(`Server running at http://127.0.0.1:${port}/`);

});
