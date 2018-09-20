const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const Ratelimiter = require("./util/Ratelimiter");

const app = express();
const ratelimiter = new Ratelimiter();

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(ratelimiter.middleware.bind(ratelimiter));

app.set("trust proxy", 1);

app.get("/", (req, res) => res.status(200).json({ message: "WELCOME TO DBL\'S RATELIMITER SERVER" }));

app.listen(3000, () => console.log("API Ratelimiter Booted Up On Port 3000"));
