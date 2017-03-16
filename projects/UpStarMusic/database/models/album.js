// Album只有Schema，没有Model，做为artist子数据存在
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

module.exports = AlbumSchema;
