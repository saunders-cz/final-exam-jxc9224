import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { TextInput } from '../../components'
import { useFormState } from '../../modules/hooks'
import { AUTHORIZE_USER } from '../../modules/users'
import { init, EMAIL_VALID_REGEX } from '../../modules/forms'
import { useAppDispatch, useAppSelector } from '../../state'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [authorizeUser] = useLazyQuery(AUTHORIZE_USER)
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: init.login,
    validationSchema: {
      email: (value) => [
        EMAIL_VALID_REGEX.test(value),
        'Invalid email address',
      ],
      password: (value) => [value.length >= 8, 'Must be 8 or more characters'],
    },
    onSubmit: (values) => {
      authorizeUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      }).then((result) => {
        if (result.data && result.data.user) {
          dispatch({
            type: 'session/login',
            payload: {
              id: result.data.user.id,
              email: result.data.user.email,
              password: result.data.user.password,
              firstName: result.data.user.firstName,
              lastName: result.data.user.lastName,
              newsletter: result.data.user.newsletter,
            },
          })
          alert('Success')
        }
      })
    },
  })

  const session = useAppSelector((state) => state.session)
  useEffect(() => {
    if (session.user) navigate('/menu')
  }, [navigate, session, session.user])

  return (
    <Box className='Login-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper elevation={12}>
          <Box sx={{ paddingTop: 2 }}>
            <Typography variant='h4'>User Login</Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  name='email'
                  label='Email Address'
                  error={errors.email}
                  value={values.email}
                  onFormChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  name='password'
                  type='password'
                  label='Password'
                  error={errors.password}
                  value={values.password}
                  onFormChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label='Remember my email and password'
                  control={
                    <Checkbox
                      name='rememberme'
                      checked={values.rememberme}
                      onChange={handleChange}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='success'
                  size='large'
                  type='submit'
                  variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
