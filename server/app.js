


const express = require('express');
const bodyParser =require('body-parser');
const peopleRoutes=require('./routes/people-routes');
const HttpError= require('./models/http-error');




const app = express();


const cors= require('cors');




app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});



app.use(express.json());
app.use(bodyParser.json());

app.use('/people',peopleRoutes);

app.use((req,res,next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});



app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)  
  res.json({message: error.message || 'An unknown error occurred!'});
});



app.listen(5000, ()=>{
    console.log('server has started on Port 5000');
});