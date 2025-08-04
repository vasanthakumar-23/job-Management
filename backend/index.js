const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const jobroutes=require('./router/jobrouter.js')
app.use(cors()); 

app.use(express.json());

app.use('/api/jobs',jobroutes)

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Connected to MongoDB");
}).catch((error)=>{
  console.error("Error connecting to MongoDB:", error);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

