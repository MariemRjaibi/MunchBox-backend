var express = require("express");
var router = express.Router();

require("../models/connection");
const Calendar = require("../models/calendarRecipes");

// Check if the recipe is already added and create new one
router.post("/", (req, res) => {
  Calendar.findOne({ title: req.body.title }).then((data) => {
    if (data === null) {
      const newRecipe = new Calendar({
        //userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        //I don't know how to do this
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        calories: req.body.calories,
        prepTime: req.body.prepTime,
      });

      newRecipe.save().then((newDoc) => {
        res.json({ result: true, Recipe: newDoc });
      });
    } else {
      // Recipe already exists in database
      res.json({
        result: false,
        error: "the recipe has been already added in the database",
      });
    }
  });
});

//to get calendar recipes

router.get("/", (req, res) => {
  User.find({ name: req.body.name })
    .populate("calendarRecipes")
    .then((recipes) => {
      if (recipes.length > 0) {
        res.json({ result: true, recipes });
      } else {
        res.json({ result: false, error: "No recipe added yet" });
      }
    });
});

//to delete a recipe
router.delete("/recipeId", (req, res) => {
  Calendar.deleteOne({ _id: req.params.recipeId }).then(({ deletedCount }) => {
    res.json({ result: deletedCount > 0, recipes });
  });
});

module.exports = router;
