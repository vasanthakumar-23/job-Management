const express = require("express");
const router = express.Router();
const {createJob,getJobs, getFilteredJobs}=require('../controller/JobController.js')

router.post('/',createJob);

router.get('/',getJobs);
router.get('/filter',getFilteredJobs)

  router.get('/1', (req, res) => {
    res.json({ message: 'Job route working!' });
  });
module.exports=router;
