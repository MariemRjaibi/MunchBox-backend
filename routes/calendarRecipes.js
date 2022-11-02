var express = require("express");
var router = express.Router();

require("../models/connection");
const Calendar = require("../models/calendarRecipes");
const User = require("../models/users");

// Check if the recipe is already added and create new one
router.post("/", (req, res) => {
  Calendar.findOne({ title: req.body.title }).then((data) => {
    if (data === null) {
      const newRecipe = new Calendar({
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        calories: req.body.calories,
        prepTime: req.body.prepTime,
      });

      newRecipe.save().then((newDoc) => {
        console.log(newDoc);
        User.updateOne(
          { token: req.body.token },
          { $push: { recipes: newDoc._id } }
        )
          .then((updateDoc) => {
            //   console.log(updateDoc);
            res.json({ result: true, Recipe: newDoc });
          })
          .catch((error) => console.log(error));
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

router.get("/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .populate("recipes")
    .then((recipes) => {
      console.log("token ======>", req.params.token);
      console.log("heeeeeeeeee ======>", recipes);
      if (recipes.recipes.length > 0) {
        res.json({ result: true, recipes: recipes.recipes });
      } else {
        res.json({ result: false, error: "No recipe added yet" });
      }
    });
});

// router.put("/", (req, res) => {
//   Calendar.updateOne(
//     { title: req.body.title },
//     { $push: { date: req.body.date } }
//   ).then((data) => {
//     res.json({ result: true, newDoc: data });
//   });
// });

//to delete a recipe
router.delete("/:recipeId", (req, res) => {
  Calendar.deleteOne({ _id: req.params.recipeId }).then(({ deletedCount }) => {
    res.json({ result: deletedCount > 0, recipes });
  });
});

//update the recipe with a date
router.put("/", (req, res) => {
  Calendar.updateOne({ title: req.body.title }).then((data) => {
    res.json({ result: modifiedCount > 0 });
  });
});

module.exports = router;
