import React, { useState } from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  FormLabel,
  Container,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { Center, ErrorMessage } from '../../components'
import { CREATE_ITEM } from '../../modules/menu'
import { useStateEditor } from '../../modules/hooks'
import { MenuCategory, MenuType } from '../../types'
import { init } from '../../modules/forms'

export interface ItemAdderProps extends BoxProps {
  close: () => void
  refetch: () => Promise<any>
}

export const ItemAdder: React.FC<ItemAdderProps> = ({
  close,
  refetch,
  ...boxProps
}) => {
  const [addItem] = useMutation(CREATE_ITEM)
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [itemInput, editItemInput] = useStateEditor(init.itemAdder)

  let error: string | undefined = undefined

  const add = async () => {
    setTimeout(() => setIsAdding(true), 0)
    const { data } = await addItem({
      variables: {
        input: {
          name: itemInput.name,
          description: itemInput.description,
          imagePath: itemInput.imagePath,
          price: itemInput.price,
          vegan: itemInput.vegan,
          category: itemInput.category,
          type: itemInput.type,
        },
      },
    })
    if (data && data.result) {
      if (data.result.success) {
        await refetch()
      }
    } else error = 'Unknown. Check F12 console.'
    setTimeout(() => setIsAdding(false), 10)
  }

  return (
    <Box {...boxProps}>
      <Card>
        <CardHeader
          title='Add New Item'
          subheader='Create a new item for the Menus'
          sx={{ display: 'block', textAlign: 'center' }}
        />
        <Box sx={{ padding: 3 }}>
          <Divider />
        </Box>
        <CardContent>
          <Box>
            <FormControl required fullWidth>
              <InputLabel htmlFor='name-input'>New Item Name</InputLabel>
              <OutlinedInput
                fullWidth
                id='name-input'
                type='text'
                label='New Item Name'
                aria-describedby='name-text'
                value={itemInput.name}
                onChange={(event) => editItemInput('name', event.target.value)}
              />
              <FormHelperText id='name-text'>
                Title for the new item
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ padding: 3 }}>
            <Divider />
          </Box>
          <Box>
            <FormControl required fullWidth>
              <InputLabel htmlFor='description-input'>
                New Item Description
              </InputLabel>
              <OutlinedInput
                fullWidth
                label='New Item Description'
                id='description-input'
                type='text'
                multiline
                rows={6}
                aria-describedby='description-text'
                value={itemInput.description}
                onChange={(event) =>
                  editItemInput('description', event.target.value)
                }
              />
              <FormHelperText id='description-text'>
                Description for the new item
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ padding: 3 }}>
            <Divider />
          </Box>
          <Box>
            <FormControl required fullWidth>
              <FormLabel id='type-text'>New Item Menu</FormLabel>
              <Select
                id='type-input'
                aria-describedby='type-text'
                value={itemInput.type ?? MenuType.Brunch}
                onChange={(event) =>
                  editItemInput('type', event.target.value as MenuType)
                }>
                <MenuItem value={MenuType.Brunch}>Brunch</MenuItem>
                <MenuItem value={MenuType.Dessert}>Dessert</MenuItem>
                <MenuItem value={MenuType.Dinner}>Dinner</MenuItem>
                <MenuItem value={MenuType.Drinks}>Drinks</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ padding: 3 }}>
            <Divider />
          </Box>
          <Box>
            <FormControl required fullWidth>
              <FormLabel id='category-text'>New Item Category</FormLabel>
              <Select
                id='category-input'
                aria-describedby='category-text'
                value={itemInput.category ?? MenuCategory.Appetizer}
                onChange={(event) =>
                  editItemInput('category', event.target.value as MenuCategory)
                }>
                <MenuItem value={MenuCategory.Appetizer}>Appetizer</MenuItem>
                <MenuItem value={MenuCategory.Alcohol}>Alcohol</MenuItem>
                <MenuItem value={MenuCategory.Beverage}>Beverage</MenuItem>
                <MenuItem value={MenuCategory.Dessert}>Dessert</MenuItem>
                <MenuItem value={MenuCategory.Entree}>Entree</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ padding: 3 }}>
            <Divider />
          </Box>
          <Box sx={{ padding: 2 }}>
            <FormControl required fullWidth>
              <InputLabel htmlFor='itemPrice-input'>New Item Price</InputLabel>
              <OutlinedInput
                label='New Item Price'
                id='itemPrice-input'
                type='number'
                aria-describedby='itemPrice-text'
                value={itemInput.price}
                onChange={(event) =>
                  editItemInput(
                    'price',
                    parseFloat(parseFloat(event.target.value).toFixed(2))
                  )
                }
              />
              <FormHelperText id='itemPrice-text'>
                Price for the new item entry
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ padding: 2 }}>
            <FormControl required fullWidth>
              <FormControlLabel
                label='This item is Vegan'
                control={
                  <Checkbox
                    name='rememberme'
                    checked={itemInput.vegan}
                    onChange={(event) =>
                      editItemInput('vegan', event.target.checked)
                    }
                  />
                }
              />
            </FormControl>
          </Box>
        </CardContent>
        <Box sx={{ padding: 2 }}>
          <Divider />
        </Box>
        <CardMedia>
          <Box sx={{ padding: 2 }}>
            <FormControl required fullWidth>
              <InputLabel htmlFor='image-input'>
                Image File Name/Path
              </InputLabel>
              <OutlinedInput
                label='Image File Name/Path'
                fullWidth
                id='image-input'
                type='text'
                aria-describedby='image-text'
                value={itemInput.imagePath ?? 'default.jpg'}
                onChange={(event) =>
                  editItemInput('imagePath', event.target.value)
                }
              />
              <FormHelperText id='image-text'>
                Image file path the new item
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Divider />
          </Box>
          <Container>
            <Box
              sx={{
                display: 'block',
                textAlign: 'center',
                padding: 2,
                border: '1px dashed grey',
              }}>
              <img
                width={300}
                height={300}
                alt={itemInput.name + ' new cover image'}
                src={
                  process.env.PUBLIC_URL + '/menu/' + itemInput.imagePath ??
                  'default.jpg'
                }
              />
            </Box>
          </Container>
        </CardMedia>
        <Box sx={{ padding: 1 }}>
          <Divider />
        </Box>
        <CardActions
          sx={{
            display: 'block',
            justifyContent: 'center',
            paddingBottom: 3,
            textAlign: 'center',
          }}>
          <ButtonGroup variant='contained'>
            <Button color='success' disabled={isAdding} onClick={add}>
              Create New Item Entry
            </Button>
          </ButtonGroup>
        </CardActions>
        {error && (
          <Center>
            <ErrorMessage text={`Error: ${error}`} />
          </Center>
        )}
      </Card>
    </Box>
  )
}

export default ItemAdder
