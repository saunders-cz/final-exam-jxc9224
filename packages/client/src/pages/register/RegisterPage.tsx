import React, { useState } from 'react'
import { Box, Button, Container, Grid, Paper } from '@mui/material'

import { TextInput } from '../../components'
import { useStateEditor } from '../../modules/hooks'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newsletter: true,
}

export const RegisterPage: React.FC = () => {
  return (
    <Box className='Register-page'>
      <Container>
        <Paper elevation={12}>
          <Grid container spacing={2}>
            <Grid container item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Button color='success' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default RegisterPage

