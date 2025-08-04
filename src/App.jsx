import React, { useState } from 'react'
import Home from './Home/Home.jsx'
import Navbar from './Navbar/Navbar.jsx'
import Filter from './filter/filter.jsx'
import CreateJob from "./form/createJob.jsx"

export const formContext = React.createContext();
export const filterContext = React.createContext();

const App = () => {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  return (
    <div className="relative min-h-screen">
      
      <div className={`transition-all duration-300 ${open ? 'blur-xs' : 'blur-none'}`}>
        <formContext.Provider value={{ open, setOpen }}>
          <filterContext.Provider value={{ jobs, setJobs }}>
            <Navbar />
            <Filter />
            <Home />
          </filterContext.Provider>
        </formContext.Provider>
      </div>
      
    
      <formContext.Provider value={{ open, setOpen }}>
        <CreateJob />
      </formContext.Provider>
    </div>
  )
}

export default App