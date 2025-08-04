import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {location_arr,jobtype_arr} from "../index.js"
import Locationpng from "../assets/location.png"
import JobTypepng from "../assets/job.png"


export default function Field({label="select",value,onChangeJob}) {
  


  const handleJobChange = (event) => {
    onChangeJob(event.target.value);
  };
 

  return (
    <Box sx={{ width:200 ,height:40,'& .MuiOutlinedInput-notchedOutline': {
      border: 'none', // 🔥 remove border
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none', // 🔥 remove hover border
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none', // 🔥 remove focused border
    },}}>
    <div className='flex flex-row shrink-0'>
          
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label} </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value|| ""}
          label="Prefered location"
          onChange={handleJobChange}
          
        >
            {
                jobtype_arr.map((item,index)=>{
                  
                    return <MenuItem value={item}>{item}</MenuItem>
                })
            } 
             
        </Select>
        
      </FormControl>
    </div>
      
    </Box>
  );
}
