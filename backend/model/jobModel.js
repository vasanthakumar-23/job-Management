// models/Job.js
const mongoose=require('mongoose')

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  preferredLocation: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Contract"], 
    required: true,
  },
  salary: {
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
  },
  applicationDeadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Job=mongoose.model("Job",jobSchema);
module.exports=Job;
