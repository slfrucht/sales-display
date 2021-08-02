const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema function

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;


const dealSchema = new Schema({
    dealId: {
        type: Number,
        required: true,
        unique: true
    },
    dealStatus: {
        type: String, //path to image
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    primaryCategory: {
        type: String, 
        required: true
    },
    price: {
        type: Currency, 
        required: true
    },
    shipping: {
        type: Currency, 
        required: true
    }
}, {
    timestamps: true // will create createdAt and updatedAt timestamps
});

const Deal = mongoose.model("Deal", dealSchema); //returns constructor function for model

module.exports = Deal;

