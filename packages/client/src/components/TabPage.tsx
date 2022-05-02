import React, { ReactNode, Suspense } from 'react'
import { Box, Container } from '@mui/material'
import { TabPanel } from '@mui/lab'

export interface TabPageProps {
  children?: null | ReactNode | ReactNode[]
  value: string
}

export const TabPage: React.FC<TabPageProps> = ({ children, value }) => {
  return (
    <Suspense fallback={<Box />}>
      <TabPanel value={value}>
        <Box>
          <Container>{children}</Container>
        </Box>
      </TabPanel>
    </Suspense>
  )
}

export default TabPage

