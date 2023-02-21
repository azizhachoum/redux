const mongoose = require("mongoose");
const express = require ("express")
const port = 5000;
const employers = require('./routes/employers')
const cors = require('cors')

const uri = "mongodb+srv://test:test@employees.fev0eih.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/employer", employers)

app.get("/", (req, res)=> {
  res.send("welcome to the employer api..")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose
.connect(uri, { 
  useNewUrlParser: true, useUnifiedTopology: true
 })
.then(()=> console.log("Mongodb connection established"))
.catch((error) =>console.log("Mongo connection failed", error.message))

