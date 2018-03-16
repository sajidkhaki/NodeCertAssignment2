/*Require the eseential files
* created bu sajidkhaki*/
var mongoose = require('mongoose')
var Schema = mongoose.Schema
// Add the currency type to the mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

/*create the schema for the promotions*/

var promotionSchema =new Schema({
    name:{
        type: String,
        required: true,
        unique: true

    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true

});
// The schema is useless so far so.....
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promotionSchema);

// Make this available to our Node application
module.exports = Promotions;




