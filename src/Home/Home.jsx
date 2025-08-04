import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Experience from "../assets/jobCard/first.png"
import onSite from "../assets/jobCard/second.png"
import Package from "../assets/jobCard/third.png"
import Amazon from "../assets/companies/amazon.jpg"
import google from "../assets/companies/google.png"
import swiggy from "../assets/companies/swiggy.png"
import Tesla from "../assets/companies/tesla.png"
import { filterContext } from "../App.jsx"
import { differenceInDays, differenceInHours } from 'date-fns'


const arr = [Amazon, google, swiggy, Tesla]

const Home = () => {
  const { jobs, setJobs } = useContext(filterContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  console.log("API_BASE_URL:", API_BASE_URL);
  useEffect(() => {
    console.log(API_BASE_URL);
    console.log('Current jobs:', jobs)
    if (jobs.length === 0) {
      fetchAllJobs()
    }
  }, [])

  const fetchAllJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Fetching all jobs...')
      console.log('API_BASE_URL:', API_BASE_URL)
      
      let response;
      
      
      try {
        response = await axios.get(`${API_BASE_URL}/api/jobs`)
      } catch (error) {
        console.log('First attempt failed, trying alternative endpoint...')
        response = await axios.get('/api/jobs')
      }
      
      console.log('All jobs fetched:', response.data)
      setJobs(response.data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      console.log('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      })
      
      setError(`Failed to load jobs: ${error.message}`)
      
      
      const mockJobs = [
        {
          _id: '1',
          jobTitle: 'Frontend Developer',
          jobType: 'Full-time',
          salary: { from: 50000, to: 80000 },
          jobDescription: 'We are looking for a skilled Frontend Developer. Experience with React and JavaScript required.',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2', 
          jobTitle: 'Backend Developer',
          jobType: 'Remote',
          salary: { from: 60000, to: 90000 },
          jobDescription: 'Backend developer needed for API development. Node.js and MongoDB experience preferred.',
          createdAt: new Date().toISOString()
        }
      ]
      
      console.log('Using mock data for testing')
      setJobs(mockJobs)
    } finally {
      setLoading(false)
    }
  }

  
  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading jobs...</p>
        </div>
      </div>
    )
  }

  
  if (error && (!jobs || jobs.length === 0)) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>{error}</p>
          <p className='text-sm text-gray-500 mb-4'>Check your API configuration and server status</p>
          <button 
            onClick={fetchAllJobs}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

 
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>No jobs found</p>
          <button 
            onClick={fetchAllJobs}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Load All Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='container grid mx-20 my-18 grid-cols-4 gap-4 h-dvh'>
      {jobs.map((job, index) => (
        <div
          key={job._id || job.id || index}
          className="job-container flex flex-col gap-3 shadow-2xl rounded-2xl p-4 h-full"
        >
          <div className="flex justify-between">
            <img 
              src={arr[Math.floor(Math.random() * arr.length)]} 
              alt="company image" 
              className="w-12 h-12 rounded-full mb-5 object-contain" 
            />
            <span className='bg-blue-300 text-white px-2 h-7 rounded-md text-center'>
              {(() => {
                try {
                  const createdDate = new Date(job.createdAt)
                  const hoursDiff = differenceInHours(new Date(), createdDate)
                  const daysDiff = differenceInDays(new Date(), createdDate)
                  return hoursDiff < 24 ? `${hoursDiff}h ago` : `${daysDiff}d ago`
                } catch (error) {
                  return 'Recently'
                }
              })()}
            </span>
          </div>

          <h1 className="text-lg font-semibold">
            {job.jobTitle}
          </h1>
          
          <div className="flex justify-between text-sm">
            <span className='jobdetails'>
              <img height={17} width={17} src={Experience} alt="Experience" /> 
              1-3yr Exp
            </span>
            <span className='jobdetails'>
              <img height={17} width={17} src={onSite} alt="Job Type" />
              {job.jobType}
            </span>
            {job.salary && (
              <span className='jobdetails'>
                <img height={17} width={17} src={Package} alt="Salary" />
                {job.salary.from ? `${job.salary.from/1000}k` : ''}
                {job.salary.to ? `-${job.salary.to/1000}k` : ''}
              </span>
            )}
          </div>
          
          {job.jobDescription && (
            <ul className="list-disc ml-4">
              {job.jobDescription.split('. ').slice(0, 2).map((sentence, index) => (
                sentence.trim() && (
                  <li key={index}>{sentence.trim()}.</li>
                )
              ))}
            </ul>
          )}
          
          <button className="bg-blue-400 text-white py-3 px-4 rounded-xl mt-auto">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home