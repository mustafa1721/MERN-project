const transactions = require("../models/Transactions");

//Show transactions against each account clicked
module.exports = {
  getTransactionsForAccount: async (req, res, next) => {
    try {
      console.log(`get transactions Request params : ${JSON.stringify(req.params.accountId)}`);
      const transactionsForAcc = await transactions.find({
        account_id: req.params.accountId
      })
      return res.status(200).json(transactionsForAcc);
    } catch (error) {
      console.error(`Error in get Transactions : ${error}`);
      return res.status(500).json({ status: "FAIL", err: error.message });
    }
  },
  //Show transactions below 5000
  showLowerTransactions: async (req, res, next) => {
    try {
      //use .aggregate to perform multiple operations and carry on first result as input for 2nd operation
      const lowerTransactions = await transactions.aggregate([
        {
          //use unwind to flatten the array
          $unwind: '$transactions'
        },
        {
          $match: {
            'transactions.amount': { $lt: 5000 },
          }
        },
        {
          $group: {
            _id: '$account_id',
            transaction_count: { $first: '$transaction_count' },
            bucket_start_date: { $first: '$bucket_start_date' },
            bucket_end_date: { $first: '$bucket_end_date' }
          }
        },
        {
          //display the final output ignoring additional aggregates
          $project: {
            account_id: '$_id',
            transaction_count: 1,
            bucket_start_date: 1,
            bucket_end_date: 1,
            _id: 0
          }
        }
      ]);

      return res.status(200).json(lowerTransactions);
    } catch (error) {
      console.error(`Error in get lower trsanction : ${error}`);
      return res.status(500).json({ status: "FAIL", err: error.message });
    }
  },

}


