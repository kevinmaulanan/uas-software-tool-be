const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  bodyParser.json()(req, res, (error) => {
    if (error instanceof SyntaxError) {
      res
        .status(400)
        .send({ success: false, code: 400, message: error.message });
    } else {
      next();
    }
  });
}, bodyParser.json({ limit: "10mb" }));

app.use(require("./modules/routes"));

const port = process.env.PORT || 3005;
const server = http.createServer(app);
server.listen(port);

console.log("Server runinng on port", port);
