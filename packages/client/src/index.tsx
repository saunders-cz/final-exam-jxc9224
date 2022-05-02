import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from '@mui/material'
import { ApolloProvider } from '@apollo/client'

import client from './modules/client'
import theme from './modules/theme'
import Router from './pages/Router'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)

