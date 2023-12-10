const mongoose = require("mongoose");


const tierSchema = new mongoose.Schema({
    tier: {
        type: String,
        required: true
      },
      benefits: {
        type: [String],
        required: true
      },
      active: {
        type: Boolean,
        required: true
      },
      id: {
        type: String,
        required: true
      }
});

const customersSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    accounts: {
      type: [Number],
      required: true
    },
    tier_and_details: {
        [String]: tierSchema
    }
  });

const customers = mongoose.model("customers", customersSchema);

module.exports = customers;