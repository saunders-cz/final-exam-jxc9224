import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const Layout: React.FC = () => {
  return (
    <Container
      style={{
        display: 'block',
        justifyContent: 'center',
        padding: 10,
        textAlign: 'center',
      }}>
      <Outlet />
    </Container>
  )
}

