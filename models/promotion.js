const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema function

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;


const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, //path to image
        required: true
    },
    featured: {
        type: Boolean, 
        required: false
    },
    cost: {
        type: Currency, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
}, {
    timestamps: true // will create createdAt and updatedAt timestamps
});

const Promotion = mongoose.model("Promotion", promotionSchema); //returns constructor function for model

module.exports = Promotion;

