const express = require("express");
const {connection, movieModel} = require("./config/db.js")
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    res.send({"msg":"This is home page"})
})

//Search by query
app.get("/movies", async(req, res)=>{
    try{
        const movies = await movieModel.find(req.query)
        res.status(200).send(movies)
    }catch(err){
        res.status(400).send({"error": err})
    }
})

//search by movieId
app.get("/movies/:movieId", async(req, res) => {
    const { movieId } = req.params;
    try {
      const movie = await movieModel.find({ _id:movieId });
      res.status(200).send(movie);
    } catch (err) {
      res.status(400).send({ "error": err });
    }
  });

  app.get("/movies", async(req, res) => {
    //pagination
    const { page } = req.params;
    const limitValue = 10;
    const skipvalue = page * limitValue - limitValue;
    try {
      if (page) {
        const movies = await movieModel.find().skip(skipvalue).limit(limitValue)
        res.status(200).send({ "msg": `Details of all the users on page number :${page}`, movies });
      } else {
        const movies = await movieModel.find();
        res.status(200).send({ "msg": "Details of all the users", movies });
      }
    } catch (err) {
      res.status(400).send({ "error": err });
    }
  });


//Post/Add Data to Database
app.post("/movies", async(req, res) => {
    const payload = req.body;
    try {
      const movie = await movieModel(payload);
      await movie.save();
      res.status(200).send({ "msg": "A new movies is registered" });
    } catch (err) {
      res.status(400).send({ "error": err });
    }
  });
  //Partially update by movieId (patch)
app.patch("/movies/:movieId", async (req, res) => {
    const { movieId } = req.params;
    const UpdatePayload = req.body;
    try {
      await movieModel.findByIdAndUpdate({_id:movieId}, UpdatePayload);
      res.status(200).send({ "msg": `The movie with ID:${movieId} is updated` });
    } catch (err) {
      res.status(400).send({ "error": err });
    }
  });
  
  //Delete by movieId
  
  app.delete("/movies/:movieId", async (req, res) => {
    const { movieId } = req.params;
    try {
      await movieModel.findByIdAndDelete({ _id:movieId });
      res.status(200).send({ "msg": `The movie with ID:${movieId} is deleted` });
    } catch (err) {
      res.status(400).send({ "error": err });
    }
  });


app.listen(8080, async()=>{
    try{
        await connection
        console.log("connected to the DB ");
        console.log("Server is running on port 8080");
    }catch(err){
        console.log(err)
    }
})
