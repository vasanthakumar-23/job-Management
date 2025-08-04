import React, { useState, useContext } from 'react'
import Slide from '../components/Slider'
import Field from '../components/Field'
import search from "../assets/search.png"
import Location from "../assets/location.png"
import axios from 'axios'

import { filterContext } from "../App.jsx"

const Filter = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API_BASE_URL:", API_BASE_URL);
  const [input, setInput] = useState('');
  const [location, setLocation] = useState('');
  const [job, setJob] = useState('');
  const [value, setValue] = useState(10);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const { jobs, setJobs } = useContext(filterContext);

  function handleChange(e) {
    setInput(e.target.value);
  }
  
  function handleLocation(e) {
    setLocation(e.target.value);
  }

  
  const hasActiveFilters = () => {
    return input.trim() !== '' || 
           location.trim() !== '' || 
           job !== '' || 
           value !== 10;
  };

 
  async function fetchJob(e) {
    if (e) e.preventDefault();
    
    setIsFiltering(true);
    
    try {
      let response;
      
      
      if (!hasActiveFilters()) {
        console.log('No filters active, fetching all jobs');
        try {
          response = await axios.get(`${API_BASE_URL}/api/jobs`);
        } catch (error) {
          console.log('Trying alternative endpoint...');
          response = await axios.get('${API_BASE_URL}/api/jobs');
        }
      } else {
        
        const filterParams = {};
        if (input.trim()) filterParams.title = input.trim();
        if (location.trim()) filterParams.location = location.trim();
        if (job) filterParams.jobType = job; // Changed from jobtype to jobType to match your filter
        if (value !== 10) filterParams.salary = value * 1000;
        
        console.log('Applying filters with params:', filterParams);
        
        try {
          response = await axios.get(`${API_BASE_URL}/api/jobs/filter`, {
            params: filterParams
          });
          console.log('Filter API response:', response.data);
        } catch (error) {
          console.log('Trying alternative filter endpoint...');
          response = await axios.get(`${API_BASE_URL}/api/jobs/filter`, {
            params: filterParams
          });
          console.log('Alternative filter API response:', response.data);
        }
      }
      
      let jobsData = response.data;
      
      
      if (jobsData && jobsData.data) {
        jobsData = jobsData.data;
      }
      
      
      if (jobsData && jobsData.jobs) {
        jobsData = jobsData.jobs;
      }
 
      if (!Array.isArray(jobsData)) {
        console.warn('Response is not an array:', jobsData);
        jobsData = [];
      }
      
      console.log('Final jobs data to set:', jobsData);
      console.log('Number of jobs found:', jobsData.length);
      
      setJobs(jobsData);
      
      
      if (hasActiveFilters()) {
        console.log(`Filter applied: ${jobsData.length} jobs found`);
      }
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      console.log('Error response:', error.response?.data);
      console.log('API_BASE_URL:', API_BASE_URL);
      
      alert(`Failed to fetch jobs. Error: ${error.message}. Check console for details.`);
      setJobs([]);
    } finally {
      setIsFiltering(false);
    }
  }

  
  const handleJobTypeChange = (selectedJobType) => {
    setJob(selectedJobType);
    
  }


  const handleSalaryChange = (newValue) => {
    setValue(newValue);

  }

 
  const handleSearchClick = () => {
    
  };

 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchJob();
    }
  };

  // Clear all filters and fetch all jobs
  const clearFilters = () => {
    setInput('');
    setLocation('');
    setJob('');
    setValue(10);
    // Fetch all jobs after clearing
    setTimeout(() => {
      fetchJob();
    }, 100);
  };

  return (
    <div className='flex flex-row justify-evenly items-center pt-5'>
      <div className='flex flex-row'>
        <img 
          src={search} 
          alt="Search" 
          className='w-5 h-5 shrink-0 mr-5 mt-2'
        />
        <input 
          className='input' 
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
          value={input} 
          placeholder='Search by job, title, role'
          disabled={isFiltering}
        />
      </div>
      
      <div className='flex flex-row'>
        <img src={Location} alt="Location" className='w-5 h-5 shrink-0 mr-5 mt-2' />
        <input 
          className='input' 
          onChange={handleLocation} 
          onKeyDown={handleKeyDown}
          value={location} 
          placeholder='Preferred location'
          disabled={isFiltering}
        />
      </div>
      
      <Field 
        label='jobtype' 
        onChangeJob={handleJobTypeChange} 
        value={job} 
        type='jobtype'
        disabled={isFiltering}
      />
      
      <Slide 
        slideValue={value} 
        setSlideValue={handleSalaryChange} 
        disabled={isFiltering}
      />
      
      {/* Show jobs count only */}
      <div className='flex items-center'>
        <span className='text-sm text-gray-600 px-2 py-2'>
          {isFiltering ? 'Searching...' : `${jobs.length} jobs found`}
        </span>
      </div>
    </div>
  )
}

export default Filter