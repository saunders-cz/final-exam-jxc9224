import React, { useState, Suspense } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state'

const AddressEditor = React.lazy(() => import('./AddressEditor'))
const PaymentEditor = React.lazy(() => import('./PaymentEditor'))

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const [addressTab, setAddressTab] = useState<string>('shipping')
  const [factorSalesTax, setFactorSalesTax] = useState<boolean>(true)
  const [showBillingAddress, setShowBillingAddress] = useState<boolean>(false)

  const quantityTotal = (): number =>
    items.reduce((t, item) => t + item.quantity, 0)
  const priceSubTotal = (): number =>
    items.reduce((t, item) => t + item.quantity * item.menuItem.price, 0)

  const salesTax = priceSubTotal() * 0.08
  const priceTotal = priceSubTotal() + (factorSalesTax ? salesTax : 0)

  return (
    <Box className='Checkout-page'>
      <Grid container spacing={1} sx={{ paddingTop: 3, paddingBottom: 5 }}>
        <Grid item xs={6}>
          <Suspense
            fallback={
              <Typography variant='body1'>Loading address editor...</Typography>
            }>
            <AddressEditor
              addressTab={addressTab}
              setAddressTab={setAddressTab}
              showBillingAddress={showBillingAddress}
            />
          </Suspense>
        </Grid>
        <Grid item xs={6}>
          <Suspense
            fallback={
              <Typography variant='body1'>Loading payment editor...</Typography>
            }>
            <PaymentEditor
              setAddressTab={setAddressTab}
              setFactorSalesTax={setFactorSalesTax}
              setShowBillingAddress={setShowBillingAddress}
            />
          </Suspense>
        </Grid>
      </Grid>
      <Divider />
      <Card>
        <CardHeader title='Order Summary' />
        <CardContent>
          {items.length === 0 ? (
            <Typography variant='subtitle1'>
              Your shopping cart is empty
            </Typography>
          ) : (
            <Box sx={{ display: 'block', overflow: 'auto' }}>
              <Typography variant='h5'>Cart Contents</Typography>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={2}>
                      <ListItemText primary='Amount' />
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText primary='Product' />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary='Price' />
                    </Grid>
                  </Grid>
                </ListItem>
                {items.map((item, index) => {
                  const price = item.menuItem.price * item.quantity
                  return (
                    <ListItem key={index}>
                      <Grid container>
                        <Grid item xs={2}>
                          <ListItemText primary={item.quantity.toString()} />
                        </Grid>
                        <Grid item xs={6}>
                          <ListItemText primary={item.menuItem.name} />
                        </Grid>
                        <Grid item xs={4}>
                          <ListItemText primary={price.toFixed(2)} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                })}
                <Divider />
                <ListItem>
                  <Grid container>
                    <Grid item xs={2}>
                      <ListItemText primary={quantityTotal()} />
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText primary='Subtotal' />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary={priceSubTotal().toFixed(2)} />
                    </Grid>
                  </Grid>
                </ListItem>
                {factorSalesTax && (
                  <ListItem>
                    <Grid container>
                      <Grid item xs={2}>
                        <ListItemText primary='-' />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText primary='8% Sales Tax' />
                      </Grid>
                      <Grid item xs={4}>
                        <ListItemText primary={salesTax.toFixed(2)} />
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                <Divider />
                <ListItem>
                  <Grid container>
                    <Grid item xs={2}>
                      <ListItemText primary='-' />
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText primary='Total' />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary={priceTotal.toFixed(2)} />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Box>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: 'block',
            justifyContent: 'center',
            padding: 3,
            textAlign: 'center',
          }}>
          <ButtonGroup variant={items.length > 0 ? 'outlined' : 'contained'}>
            <Button color='primary' onClick={() => navigate('/menu')}>
              Go to Menus
            </Button>
            <Button
              color={items.length > 0 ? 'warning' : 'success'}
              onClick={() => navigate('/cart')}>
              Go to Cart
            </Button>
          </ButtonGroup>
          <Divider flexItem orientation='vertical' variant='middle'>
            or
          </Divider>
          <ButtonGroup variant='contained'>
            <Button
              color='success'
              disabled={items.length === 0}
              onClick={() => {
                dispatch({ type: 'cart/clear' })
                alert('Order submitted!')
                navigate('/')
              }}>
              Submit Order
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <Divider sx={{ padding: 5 }} />
    </Box>
  )
}

export default Cart
