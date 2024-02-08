const express = require("express");
const app = express();

const mongodb = require("./data/database");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 3000;

