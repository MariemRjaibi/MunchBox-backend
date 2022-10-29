const mongoose = require("mongoose");

const calendarRecipesSchema = mongoose.Schema({
  title: String,
  image: String,
  ingredients: [String],
  steps: [String],
  calories: String,
  prepTime: Number,
});

const Calendar = mongoose.model("calendarRecipes", calendarRecipesSchema);

module.exports = Calendar;
