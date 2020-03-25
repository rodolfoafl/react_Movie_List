const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const List = require("../models/List");

//@route    GET api/lists
//@desc     Get all lists
//@access   Public
router.get("/", async (req, res) => {
  try {
    const lists = await List.find().sort({ date: -1 });
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
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
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
        name
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
router.put("/:id", (req, res) => {
  res.send("Update list");
});

//@route    DELETE api/lists/:id
//@desc     Delete list
//@access   Public
router.delete("/:id", (req, res) => {
  res.send("Delete list");
});

module.exports = router;
function returnError(error, res) {
  console.error(error.message);
  return res.status(500).send(`Server Error: ${error.message}`);
}
