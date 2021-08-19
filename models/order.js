const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema function

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;


const orderSchema = new Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true
    },
    deal_id: {
        type: Number, //path to image
        required: true
    },
    order_date: {
        type: Date, 
        required: true
    },
    address_1: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true
    },
    postal_code: {
        type: Number, 
        required: true
    },
    lng: {
        type: Number, 
        required: true
    },
    lat: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true // will create createdAt and updatedAt timestamps
});

const Order = mongoose.model("Order", orderSchema); //returns constructor function for model

module.exports = Order;

