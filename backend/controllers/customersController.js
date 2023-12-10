const customers = require("../models/Customers");

//Get all active customers to display after login
module.exports = {
  getAllCustomers: async (req, res, next) => {
    try {
      //use .aggregate to perform multiple operations and carry on first result as input for 2nd operation
      const activeCustomer = await customers.aggregate([
        {
          //use match to filter
          $match: {
            tier_and_details: { $ne: {} }
          }
        },
        {
          //adding new fields to perform operations
          $addFields: {
            activeFound: {
              $objectToArray: '$tier_and_details'
            }
          }
        },
        {
          $match: {
            $or: [
              { 'activeFound.v.active': true }
            ]
          }
        },
        {
          //to display end result
          $project: {
            activeFound: 0
          }
        }
      ])


      return res.status(200).json(activeCustomer);
    } catch (error) {
      console.error(`Error in get Customers : ${error}`);
      return res.status(500).json({ status: "FAIL", err: error.message });
    }
  },

}


