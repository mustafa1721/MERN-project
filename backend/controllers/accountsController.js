const accounts = require("../models/Accounts");

//Get unique products available
module.exports = {
  getDistinctProducts: async (req, res, next) => {
    try {
      const distinctProd = await accounts.distinct("products");

      return res.status(200).json(distinctProd);
    } catch (error) {
      console.error(`Error in get Acconts : ${error}`);
      return res.status(500).json({ status: "FAIL", err: error.message });
    }
  },


}



