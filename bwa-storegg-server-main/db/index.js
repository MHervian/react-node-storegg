const mongoose = require("mongoose");
// const { urlDb } = require("../config");
const { urlDb } = require("../config");

console.log("URL DB: " + urlDb);

mongoose.connect(urlDb, {
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
