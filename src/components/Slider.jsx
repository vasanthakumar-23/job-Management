import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valueLabelFormat(value) {
 

 
  let scaledValue = value;

  return `     ${scaledValue} k`;
}

export default function Slide({slideValue,setSlideValue}) {
  

  const handleChange = (event, newValue) => {
    setSlideValue(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <span>Salary per month</span><span className='pl-12'>10k-{valueLabelFormat(slideValue)}</span>
      <Slider
        value={slideValue}
        min={20}
        step={10}
        max={100}
        valueLabelDisplay="off"
        sx={{
          color: 'black',
          '& .MuiSlider-thumb': {
      backgroundColor: 'black',
      position: 'relative',

      // White dot inside
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '8px',
        height: '8px',
        backgroundColor: 'white',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }
    },
    '& .MuiSlider-track': {
      backgroundColor: 'black',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#ccc',
    } 
        }}
        getAriaValueText={valueLabelFormat}
        onChange={handleChange}
      
      />
    </Box>
  );
}