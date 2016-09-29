var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var recipeUtils = require(process.cwd() + '/utils/recipes');

var categories = recipeUtils.getCategories();
var classifications = recipeUtils.getClassifications();

var ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  qty: {
    type: Number
  },
  measurement: {
    type: String
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});

var recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  photo: {
    type: String,
    file: 'image'
  },
  summary: {
    type: String,
    longText: true,
    maxlength: 140
  },
  seoDescription: {
    type: String,
    longText: true,
    maxlength: 140
  },
  categories: [{
    type: String,
    enum: categories
  }],
  classifications: [{
    type: String,
    enum: classifications
  }],
  ingredients: [ingredientSchema],
  steps: [{
    type: String
  }],
  uploaded: {
    type: Date,
    default: Date.now,
    fixed: true
  }
});

module.exports.model = mongoose.model('Recipe', recipeSchema);

// For admin model/collection views.
module.exports.adminModelDefaults = 'name'.split(' ');
module.exports.adminModelTable = 'name categories summary uploaded'.split(' ');

// For admin model view queries.
module.exports.adminModelSelect = '';
module.exports.adminModelSort = {
  name: 1
};
