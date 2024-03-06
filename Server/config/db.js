const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/MovieList")
const movieSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Category: String,
    Language: String
},{
    versionKey:false
})

const movieModel = new mongoose.model("Movie",movieSchema)

module.exports={
    connection,
    movieModel
}