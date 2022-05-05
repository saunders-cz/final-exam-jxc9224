import React from 'react'
import { Box, BoxProps } from '@mui/material'

export const ModalBox: React.FC<BoxProps> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70ch',
        maxHeight: '70ch',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        padding: 2,
        display: 'block',
        overflow: 'auto',
      }}
      {...props}>
      {props.children}
    </Box>
  )
}
