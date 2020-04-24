const express = require("express");

const accounteRouter = require("../accounts-router")

const server = express();

server.use(express.json());

server.use("/accounts", accounteRouter)

module.exports = server;
