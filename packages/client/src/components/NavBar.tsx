import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, BoxProps, Tab, Tabs } from '@mui/material'
import type { Page } from '../types'

export interface NavBarProps extends BoxProps {
  pages: Page[]
}

export const NavBar: React.FC<NavBarProps> = ({ pages, ...boxProps }) => {
  const navigate = useNavigate()
  const [tabState, setTabState] = useState<Page>(pages[0])

  const changeTab = (event: React.SyntheticEvent, value: Page) => {
    setTimeout(() => setTabState(value), 0)
    navigate(value.path ?? '/')
  }

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
      {...boxProps}>
      <Tabs
        centered
        value={tabState}
        onChange={changeTab}
        aria-label='navigation tabs'>
        {pages
          .sort((a, d) => a.order - d.order)
          .map((page, index) => {
            const TabIcon = page.icon
            return (
              <Tab
                icon={<TabIcon />}
                key={index}
                label={page.title}
                value={page}
              />
            )
          })}
      </Tabs>
    </Box>
  )
}

