const transactionModel = require("../Model/transaction-model");

const getAlltransaction = (req, res, next) => {
  transactionModel
    .find()
    .then((transactions) => {
      res.status(200).json(transactions);
    })
    .catch((err) => next(err));
};

module.exports = {
  getAlltransaction,
};
