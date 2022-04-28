import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material'
import { ApolloProvider } from '@apollo/client'

import client from './modules/client'
import theme from './modules/theme'
import Router from './pages/Router'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

