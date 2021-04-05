const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const axios = require("axios");

const List = require("../models/List");

const __routine_updateAllLists = async () => {
  const lists = await List.find();

  for (var i = 0; i < lists.length; i++) {
    // console.log(lists[i].name);
    await updateMovieByField(lists[i], "imdbID");
  }
  console.log("finished updating!");
};

const updateMovieByField = async (list, fieldToUpdate) => {
  for (var i = 0; i < list.movies.length; i++) {
    try {
      let res = await axios.get(
        `https://www.omdbapi.com/?t=${list.movies[i].name}&y=${list.movies[i].year}&apikey=3f85b66e`
      );

      let responseField = res.data[fieldToUpdate];
      if (responseField !== null && responseField !== undefined) {
        list.movies[i][fieldToUpdate] = responseField;
      }
    } catch (error) {
      console.error(error);
    }
  }

  await list.save();
};

// const addFieldToMovies = async () => {
//   await List.update({}, { $set: { "movies.$[].imdbID": "" } }, { multi: true });

//   console.log("finished adding field...");
// };

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    // __routine_updateAllLists();
    // addFieldToMovies();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
