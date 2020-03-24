const express = require("express");
const router = express.Router();

//@route    GET api/lists
//@desc     Get all lists
//@access   Public
router.get("/", (req, res) => {
  res.send("Get all lists");
});

//@route    POST api/lists
//@desc     Create a list
//@access   Public
router.post("/", (req, res) => {
  res.send("Create a list");
});

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
