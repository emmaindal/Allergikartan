var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name:  String,
  address: String,
  city: String,
  gluten:   Boolean, 
  lactose: Boolean,
  nut: Boolean,
  lat: Number,
  lon: Number
});

var restaurantModel = mongoose.model('Restaurant', restaurantSchema);


// denna tillåter annan att gå in och hämta schemat. 
module.exports = restaurantModel
