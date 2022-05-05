import React from 'react'
import { Box, Typography } from '@mui/material'

export const HomePage: React.FC = () => {
  return (
    <Box className='Home-page'>
      <Typography variant='h2'>Welcome to Generic Restaurant!</Typography>
      <Typography variant='h5'>
        Use the navigation menu above to do stuff
      </Typography>
      <Typography variant='subtitle1'>
        Please enjoy this large, properly sized image:
      </Typography>
      <img
        alt='a large, properly sized img'
        height={439}
        width={720}
        src={process.env.PUBLIC_URL + '/home.jpg'}
      />
    </Box>
  )
}

export default HomePage
