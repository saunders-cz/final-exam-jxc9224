import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const Layout: React.FC = () => {
  return (
    <Container
      style={{
        alignContent: 'center',
        display: 'block',
        textAlign: 'center',
      }}>
      <Outlet />
    </Container>
  )
}
