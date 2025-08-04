const Job = require("../model/jobModel.js");


const createJob = async (req, res) => {
  try {
    const {
      jobTitle,jobDescription,companyName,location,preferredLocation,jobType,salaryFrom,salaryTo,} = req.body;

    const newJob = new Job({jobTitle,jobDescription,companyName,location,preferredLocation,jobType,salary: { from: salaryFrom ,   to: salaryTo, },
    });
    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      message: "Server error while creating job",
      error: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json(jobs);

  }catch(error){
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      message: "Server error while fetching jobs",
      error: error.message,
    });
  }
}
const getFilteredJobs = async (req, res) => {
  try {
    const { title, location, jobtype, salary } = req.query;

    
    const filter = {};
    
    if (title) {
      filter.jobTitle = { $regex: title, $options: "i" }; 
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobtype) {
      filter.jobType = jobtype;
    }
    
    if (salary) {
      filter['salary.to']= { $lte: Number(salary) }; 
    }
    
    const jobs = await Job.find(filter);
    res.json(jobs);
    
    console.log("Generated Filter:", filter);
  } catch (error) {
    console.error("Error fetching filtered jobs:", error);
    res.status(500).json({
      message: "Server error while fetching filtered jobs",
      error: error.message,
    });
  }
};



module.exports = {
  createJob,getJobs,getFilteredJobs
};
