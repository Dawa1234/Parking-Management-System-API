const express = require("express");
const appRoute = express.Router();
const transactionController = require("../Controller/transaction-controller");

appRoute.get("/", transactionController.getAlltransaction);

module.exports = appRoute;
