const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    coffee: String,
    quantity: Number,
    status: { type: String, default: "Pending" }, // ✅ Default "Pending"
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
