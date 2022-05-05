import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'

import { Center, ModalBox } from '../../components'
import { useAppDispatch } from '../../state'
import type { Item } from '../../types'

export interface AddedToCartModalProps {
  item: Item
  quantity: number
  closeModal: () => void
  children?: null | ReactNode | ReactNode[]
}

export const AddedToCartModal: React.FC<AddedToCartModalProps> = ({
  item,
  quantity,
  closeModal,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const removeFromCart = () => {
    dispatch({
      type: 'cart/removeCartItem',
      payload: { name: item.name },
    })
    closeModal()
  }

  const itemPriceSubTotal = quantity * item.price

  return (
    <ModalBox>
      <Center>
        <Typography variant='h4'>
          Added {quantity} item{quantity > 1 ? 's' : ''} to your cart!
        </Typography>
      </Center>
      <Center>
        <Box sx={{ padding: 2 }}>
          <Typography variant='h5'>"{item.name}"</Typography>
        </Box>
      </Center>
      <Center>
        <List>
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <ListItemText primary='Quantity' />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary='Price' />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <ListItemText primary={quantity.toString()} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary={itemPriceSubTotal.toFixed(2)} />
              </Grid>
              <Grid item xs={5}>
                <ButtonGroup variant='contained'>
                  <Button color='error' onClick={removeFromCart}>
                    <DeleteForeverSharpIcon />
                    Remove From Cart
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Center>
      <Box
        sx={{
          paddingTop: 2,
          paddingBottom: 1,
          display: 'block',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <ButtonGroup variant='contained'>
          <Button color='info' onClick={closeModal}>
            Back to Catalog
          </Button>
          <Button color='success' onClick={() => navigate('/cart')}>
            Go to Cart
          </Button>
        </ButtonGroup>
      </Box>
    </ModalBox>
  )
}

export default AddedToCartModal
