import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from '@mui/material'
import type { AppDispatch, Address, StateEditor } from '../../types'

export interface AddressEditorTabProps {
  address: Partial<Address>
  dispatch: AppDispatch
  dispatchType: string
  header: string
}

export const AddressEditorTab: React.FC<AddressEditorTabProps> = ({
  address,
  dispatch,
  dispatchType,
  header,
}) => {
  const editAddress: StateEditor<Address> = (key, value) => {
    dispatch({
      type: `checkout/${dispatchType}`,
      payload: { ...address, [key]: value },
    })
  }
  return (
    <Card>
      <CardHeader title={header} />
      <CardContent>
        <Container>
          <Grid container sx={{ paddingTop: 1 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='addressLine1-input'>
                  Address Line 1
                </InputLabel>
                <Input
                  fullWidth
                  id='addressLine1-input'
                  type='text'
                  aria-describedby='addressLine1-text'
                  value={address.addressLine1 ?? ''}
                  onChange={(event) =>
                    editAddress('addressLine1', event.target.value)
                  }
                />
                <FormHelperText id='addressLine1-text'>
                  Your primary street number and address
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ paddingTop: 3 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='addressLine2-input'>
                  Address Line 2
                </InputLabel>
                <Input
                  fullWidth
                  id='addressLine2-input'
                  type='text'
                  aria-describedby='addressLine2-text'
                  value={address.addressLine2 ?? ''}
                  onChange={(event) =>
                    editAddress('addressLine2', event.target.value)
                  }
                />
                <FormHelperText id='addressLine2-text'>
                  Your apartment number, etc
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ paddingTop: 3 }}>
            <Grid item xs={6} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='country-input'>Country</InputLabel>
                <Input
                  fullWidth
                  id='country-input'
                  type='text'
                  aria-describedby='country-text'
                  value={address.country ?? ''}
                  onChange={(event) =>
                    editAddress('country', event.target.value)
                  }
                />
                <FormHelperText id='country-text'>Your country</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='state-input'>State/Province</InputLabel>
                <Input
                  fullWidth
                  id='state-input'
                  type='text'
                  aria-describedby='state-text'
                  value={address.state ?? ''}
                  onChange={(event) => editAddress('state', event.target.value)}
                />
                <FormHelperText id='state-text'>
                  Your state/province
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='city-input'>City</InputLabel>
                <Input
                  fullWidth
                  id='city-input'
                  type='text'
                  aria-describedby='city-text'
                  value={address.city ?? ''}
                  onChange={(event) => editAddress('city', event.target.value)}
                />
                <FormHelperText id='city-text'>Your city</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='zip-input'>ZIP Code</InputLabel>
                <Input
                  fullWidth
                  id='zip-input'
                  type='text'
                  aria-describedby='zip-text'
                  value={address.zip ?? ''}
                  onChange={(event) => editAddress('zip', event.target.value)}
                />
                <FormHelperText id='zip-text'>Your ZIP code</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  )
}

export default AddressEditorTab
