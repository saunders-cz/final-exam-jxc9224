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
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { TextInput } from '../../components'
import { CREATE_USER } from '../../modules/users'
import { useFormState } from '../../modules/hooks'
import { init, EMAIL_VALID_REGEX } from '../../modules/forms'
import { useAppDispatch, useAppSelector } from '../../state'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [createUser] = useMutation(CREATE_USER)
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: init.register,
    validationSchema: {
      email: (value) => [
        EMAIL_VALID_REGEX.test(value),
        'Invalid email address',
      ],
      password: (value) => [value.length >= 8, 'Must be 8 or more characters'],
    },
    onSubmit: (values) => {
      createUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            newsletter: values.newsletter,
          },
        },
      }).then((result) => {
        if (result.data && result.data.result && result.data.result.success) {
          dispatch({
            type: 'session/login',
            payload: {
              id: result.data.result.user.id,
              email: result.data.result.user.email,
              password: result.data.result.user.password,
              firstName: result.data.result.user.firstName,
              lastName: result.data.result.user.lastName,
              newsletter: result.data.result.user.newsletter,
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
    <Box className='Register-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper elevation={12}>
          <Box sx={{ paddingTop: 2 }}>
            <Typography variant='h4'>User Registration</Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={6}>
                  <TextInput
                    required
                    fullWidth
                    name='firstName'
                    label='First Name'
                    error={errors.firstName}
                    value={values.firstName}
                    onFormChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    required
                    fullWidth
                    name='lastName'
                    label='Last Name'
                    error={errors.lastName}
                    value={values.lastName}
                    onFormChange={handleChange}
                  />
                </Grid>
              </Grid>
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
                  label='Sign up for our Newsletter'
                  control={
                    <Checkbox
                      name='newsletter'
                      checked={values.newsletter}
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

export default RegisterPage
