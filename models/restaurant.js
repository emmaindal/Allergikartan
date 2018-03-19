var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name:  String,
  address: String,
  city: String,
  gluten:   {
    type: Boolean,
    default: false
  }, 
  lactose: {
    type: Boolean,
    default: false
  },
  nut: {
    type: Boolean,
    default: false
  },
  egg: {
    type: Boolean,
    default: false
  },
  lat: Number,
  lon: Number
});

var restaurantModel = mongoose.model('Restaurant', restaurantSchema);


// denna tillåter annan att gå in och hämta schemat. 
module.exports = restaurantModel
