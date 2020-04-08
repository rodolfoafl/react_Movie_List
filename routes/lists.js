const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const List = require("../models/List");

//@route    GET api/lists
//@desc     Get all lists
//@access   Public
router.get("/", async (req, res) => {
  try {
    const lists = await List.find().sort({ name: 1 });
    return res.json(lists);
  } catch (error) {
    return returnError(error, res);
  }
});

//@route    POST api/lists
//@desc     Create a list
//@access   Public
router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      let list = await List.findOne({ name });

      if (list) {
        return res.status(400).json({ msg: "List already exists." });
      }

      list = new List({
        name,
      });

      const newList = await list.save();

      return res.json(newList);
    } catch (error) {
      return returnError(error, res);
    }
  }
);

//@route    PUT api/lists/:id
//@desc     Update list
//@access   Public
router.put("/:id", async (req, res) => {
  const { name, movies } = req.body;

  //Build contact object
  const listFields = {};
  if (name) {
    listFields.name = name;
  }
  if (movies) {
    listFields.movies = movies;
  }

  try {
    let list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ msg: "List not found." });
    }

    list = await List.findByIdAndUpdate(
      req.params.id,
      { $set: listFields },
      { new: true }
    );

    return res.json(list);
  } catch (error) {
    returnError(error, res);
  }
});

//@route    DELETE api/lists/:id
//@desc     Delete list
//@access   Public
router.delete("/:id", async (req, res) => {
  try {
    let list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ msg: "List not found." });
    }

    await List.findByIdAndRemove(req.params.id);
    return res.json({ msg: "List removed." });
  } catch (error) {
    returnError(error, res);
  }
});

module.exports = router;
function returnError(error, res) {
  console.error(error.message);
  return res.status(500).send(`Server Error: ${error.message}`);
}
