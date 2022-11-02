const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "calendarRecipes" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
