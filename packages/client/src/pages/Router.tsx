import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'

import { store } from '../state'
import { Layout, NavBar } from '../components'
import { PAGE_LIST } from './PageList'

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Box />}>
        <BrowserRouter>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <NavBar pages={PAGE_LIST} />
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
          </Box>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

export default Router

