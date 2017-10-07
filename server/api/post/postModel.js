var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },
  // array of ids from the users, categories
  author: {
    type: Schema.Types.ObjectId, // referencing line 2 Schema
    ref: 'user', // references the user collection in userModel.js, line 12
    required: true // added this, should be required
  },

  categories: [
    {type: Schema.Types.ObjectId, ref: 'category'}
  ]
});

module.exports = mongoose.model('post', PostSchema);
