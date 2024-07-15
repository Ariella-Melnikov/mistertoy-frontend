import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'

import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState({ ...userService.getEmptyCredentials(), labels: [] })


  function onLogin(credentials) {
    login(credentials)
      .then(() => {
        showSuccessMsg('Logged in successfully')
      })
      .catch((err) => {
        showErrorMsg('Oops try again')
      })
  }

  function onSignup(credentials) {
    signup(credentials)
      .then(() => {
        showSuccessMsg('Signed in successfully')
      })
      .catch((err) => {
        showErrorMsg('Oops try again')
      })
  }

  const SignUpSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required').min(2, 'Too Short!').max(20, 'Too Long!'),
    username: Yup.string().required('Username is required').min(2, 'Too Short!').max(20, 'Too Long!'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
    email: Yup.string().required('Email is required').min(5, 'Too Short!').max(20, 'Too Long!'),
    labels: Yup.array().of(Yup.string()).required('Please select at least one option'),
  })

  // const SignInSchema = Yup.object().shape({
  //   username: Yup.string().required('Username is required').min(5, 'Too Short!').max(20, 'Too Long!'),
  //   password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
  // })


  const labels = ['Toys', 'Baby', 'Video Games', 'Special Offers', 'Money Off Vouchers']

  return (
    <div className='login-signup-container main-layout flex'>
      <div className='sign-up-container'>
        <Typography variant='h4' gutterBottom>
          Create An Account
        </Typography>
        <Formik initialValues={credentials} validationSchema={SignUpSchema} onSubmit={onSignup}>
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                label='Full name'
                variant='outlined'
                name='fullName'
                required
                margin='normal'
                error={touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                onChange={handleChange}
                value={values.fullName}
              />
              <Field
                as={TextField}
                label='Username'
                variant='outlined'
                name='username'
                required
                margin='normal'
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                onChange={handleChange}
                value={values.username}
              />
              <Field
                as={TextField}
                label='Email'
                variant='outlined'
                name='email'
                required
                margin='normal'
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                value={values.email}
              />
              <Field
                as={TextField}
                label='Password'
                variant='outlined'
                name='password'
                type='password'
                required
                margin='normal'
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                value={values.password}
              />
              <Typography variant='h6' gutterBottom>
                Emails and newsletter communication:
              </Typography>
              <Typography variant='body2' gutterBottom>
                Please select your email preferences below if you wish to receive marketing emails on special offers and
                money off vouchers from Smyths Toys. You can update your preferences anytime in your account.
              </Typography>
              <FormControl margin='normal'>
                <InputLabel id='labels-label'>Labels</InputLabel>
                <Select
                  multiple
                  labelId='labels-label'
                  id='labels'
                  name='labels'
                  value={values.labels}
                  onChange={(event) => setFieldValue('labels', event.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                  style={{ minWidth: '250px' }}>
                  {labels.map((label) => (
                    <MenuItem key={label} value={label}>
                      <Checkbox checked={values.labels.includes(label)} />
                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant='contained' color='primary' type='submit'>
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='sign-in-container'>
        <Typography variant='h4' gutterBottom>
          Log Into Your Account
        </Typography>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={onLogin}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Typography variant='body2' gutterBottom>
                Note, if you enter your password incorrectly five times, your account will be disabled. Please reset
                your password or contact us if you cannot log into your account.
              </Typography>
              <Field
                as={TextField}
                label='Username'
                variant='outlined'
                name='username'
                required
                margin='normal'
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                onChange={handleChange}
                value={values.username}
              />
              <Field
                as={TextField}
                label='Password'
                variant='outlined'
                name='password'
                type='password'
                required
                margin='normal'
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                value={values.password}
              />
              <Button variant='contained' color='primary' type='submit'>
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
