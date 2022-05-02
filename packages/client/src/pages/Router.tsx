import { Provider } from 'react-redux'
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList } from '@mui/lab'

import { store } from '../state'
import { Layout } from '../components'
import { PAGE_LIST } from './PageList'
import type { Page } from '../types'

const Router: React.FC = () => {
  const [tabState, setTabState] = useState<string>('1')

  return (
    <Provider store={store}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabState}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(_, value: string) => setTabState(value)}
              aria-label='navigation tabs'>
              {PAGE_LIST.map((page, index) => {
                const TabIcon = page.icon
                return (
                  <Tab
                    icon={<TabIcon />}
                    key={index}
                    label={page.title}
                    value={page.order.toString()}
                  />
                )
              })}
            </TabList>
          </Box>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                {PAGE_LIST.map((page, index) => {
                  const RoutePage = page.element
                  if (page.path)
                    return (
                      <Route
                        key={index}
                        path={page.path}
                        element={<RoutePage />}
                      />
                    )
                  return <Route index key={index} element={<RoutePage />} />
                })}
              </Route>
            </Routes>
          </BrowserRouter>
        </TabContext>
      </Box>
    </Provider>
  )
}

export default Router

