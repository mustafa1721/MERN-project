const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
    account_id : {
        type: Number,
        required: true
    },
    limit : Number,
    products : [String]
});

const accounts = mongoose.model("accounts", accountsSchema);

module.exports = accounts;