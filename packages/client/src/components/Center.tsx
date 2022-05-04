/**
 * @author John Carr <jxc9224@rit.edu>
 * @license MIT
 */

import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@mui/material'

export interface CenterProps extends BoxProps {
  children?: null | ReactNode | ReactNode[]
}

export const Center: React.FC<CenterProps> = ({ children, ...boxProps }) => {
  return (
    <Box
      className='Center'
      sx={{ block: 'flex', justifyContent: 'center', textAlign: 'center' }}
      {...boxProps}>
      {children}
    </Box>
  )
}
