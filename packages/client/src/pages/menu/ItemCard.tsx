import React, { useState, Suspense } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardProps,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Modal,
  Typography,
} from '@mui/material'
import { useAppDispatch } from '../../state'
import type { Item } from '../../types/'

const AddedModal = React.lazy(() => import('./AddedModal'))

export interface ItemCardProps extends CardProps {
  item: Item
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, ...cardProps }) => {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<number>(1)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const addToCart = () => {
    dispatch({
      type: 'cart/addCartItem',
      payload: { quantity: quantity, menuItem: item },
    })
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)

  return (
    <Card {...cardProps}>
      <Modal open={modalOpen} onClose={closeModal}>
        <Suspense
          fallback={<Typography variant='body1'>Loading modal...</Typography>}>
          <AddedModal item={item} quantity={quantity} closeModal={closeModal} />
        </Suspense>
      </Modal>
      <Box
        sx={{
          height: 100,
          width: '100%',
          overflow: 'auto',
        }}>
        <CardHeader title={item.name} />
      </Box>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant='subtitle2'>{item.category}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5'>${item.price}</Typography>
        </Grid>
      </Grid>
      <CardMedia>
        <Box sx={{ padding: 3 }}>
          <img
            width={300}
            height={300}
            alt={item.name + ' cover image'}
            src={
              process.env.PUBLIC_URL +
              '/menu/' +
              (item.imagePath ?? 'default.png')
            }
          />
        </Box>
      </CardMedia>
      <CardContent>
        <Box
          sx={{
            height: 150,
            width: '100%',
            overflow: 'auto',
          }}>
          <Typography variant='body1'>{item.description}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Grid container sx={{ padding: 1 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor={`quantity-input-${item.id}`}>
                Quantity
              </InputLabel>
              <Input
                fullWidth
                id={`quantity-input-${item.id}`}
                type='number'
                aria-describedby={`quantity-text-${item.id}`}
                value={quantity}
                onChange={(event) => setQuantity(parseInt(event.target.value))}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: 1 }}>
            <ButtonGroup variant='contained'>
              <Button onClick={addToCart}>Add to Cart</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ItemCard
