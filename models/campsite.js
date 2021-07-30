const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema function

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number, 
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, //path to image
        required: true
    },
    elevation: {
        type: Number, 
        required: true
    },
    cost: {
        type: Currency, 
        required: true,
        min: 0
    },
    featured: {
        type: Boolean, 
        default: false
    },
    comments: [commentSchema] //allows array of comments for each campsite document
}, {
    timestamps: true // will create createdAt and updatedAt timestamps
});

const Campsite = mongoose.model("Campsite", campsiteSchema); //returns constructor function for model

module.exports = Campsite;

