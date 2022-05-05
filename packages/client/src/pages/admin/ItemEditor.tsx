import React, { useState, Suspense } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Typography,
  FormLabel,
  Modal,
  MenuItem,
  Select,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { Center, ErrorMessage, ModalBox } from '../../components'
import { UPDATE_ITEM } from '../../modules/menu'
import { MenuCategory, MenuType, Item } from '../../types'
import { useStateEditor } from '../../modules/hooks'

const ItemDestroyer = React.lazy(() => import('./ItemDestroyer'))
const CLEAR_RESULT_LABEL_SEC = 10

export interface ItemEditorProps {
  item: Item
  refetch: () => Promise<any>
}

export const ItemEditor: React.FC<ItemEditorProps> = ({ item, refetch }) => {
  const { id, ...itemProps } = item
  const [updateItem] = useMutation(UPDATE_ITEM)

  const [result, setResult] = useState<{ success: boolean }>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [showMenuImg, setShowMenuImg] = useState<boolean>(false)
  const [showCategories, setShowCategories] = useState<boolean>(false)
  const [showMenuTypes, setShowMenuTypes] = useState<boolean>(false)
  const [itemInput, editItemInput] = useStateEditor<Omit<Item, 'id'>>(itemProps)

  let error: string | undefined = undefined

  const update = async () => {
    setTimeout(() => setIsEditing(true), 0)
    const { data } = await updateItem({
      variables: {
        id: id,
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
      setTimeout(() => setResult(data.result), 5)
      if (data.result.success) {
        await refetch()
      }
    } else error = 'Unknown. Check F12 console.'
    setTimeout(() => setIsEditing(false), 10)
    // clear green label after 10 seconds
    setTimeout(() => setResult(undefined), CLEAR_RESULT_LABEL_SEC * 1000)
  }

  return (
    <Card sx={{ textAlign: 'center' }}>
      {deleteOpen && (
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <ModalBox>
            <Suspense
              fallback={
                <Typography variant='body1'>
                  Loading item destroyer...
                </Typography>
              }>
              <ItemDestroyer
                item={item}
                closeModal={() => setDeleteOpen(false)}
                refetch={refetch}
              />
            </Suspense>
          </ModalBox>
        </Modal>
      )}
      <CardContent>
        <Box>
          <FormControl required fullWidth>
            <InputLabel htmlFor={`title-input-${id}`}>Title</InputLabel>
            <OutlinedInput
              fullWidth
              label='Title'
              id={`title-input-${id}`}
              type='text'
              aria-describedby={`title-text-${id}`}
              value={itemInput.name}
              onChange={(event) => editItemInput('name', event.target.value)}
            />
            <FormHelperText id={`title-text-${id}`}>
              Title for this item
            </FormHelperText>
          </FormControl>
        </Box>
      </CardContent>
      <Box sx={{ padding: 1 }}>
        <Divider />
      </Box>
      <CardMedia>
        <Box sx={{ padding: 2 }}>
          <FormControl required fullWidth>
            <InputLabel htmlFor={`image-input-${id}`}>
              Image File Name
            </InputLabel>
            <OutlinedInput
              fullWidth
              label='Image File Name'
              id={`image-input-${id}`}
              type='text'
              aria-describedby={`image-text-${id}`}
              value={itemInput.imagePath}
              onChange={(event) =>
                editItemInput('imagePath', event.target.value)
              }
            />
            <FormHelperText id={`image-text-${id}`}>
              Image file this item
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'block',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          <ButtonGroup variant='outlined'>
            <Button onClick={() => setShowMenuImg(!showMenuImg)}>
              {showMenuImg ? 'Hide' : 'Show'} Menu Image
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Collapse in={showMenuImg} timeout='auto' unmountOnExit>
            <Box
              sx={{
                border: '1px dashed grey',
                display: 'block',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <img
                width={300}
                height={300}
                alt={itemInput.name + ' cover image'}
                src={process.env.PUBLIC_URL + '/menu/' + itemInput.imagePath}
              />
            </Box>
          </Collapse>
        </Box>
      </CardMedia>
      <CardContent>
        <Box>
          <FormControl required fullWidth>
            <InputLabel htmlFor={`description-input-${id}`}>
              Description
            </InputLabel>
            <OutlinedInput
              fullWidth
              label='Description'
              id={`description-input-${id}`}
              type='text'
              multiline
              rows={3}
              aria-describedby={`description-text-${id}`}
              value={itemInput.description}
              onChange={(event) =>
                editItemInput('description', event.target.value)
              }
            />
            <FormHelperText id={`description-text-${id}`}>
              Description for this item
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ padding: 1 }}>
          <FormControl required fullWidth>
            <FormLabel id='itemCategory-group-text'>Item Category</FormLabel>
            <Box sx={{ padding: 1 }}>
              <Typography variant='subtitle1'>
                {MenuCategory[itemInput.category]}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: 1,
                display: 'block',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <ButtonGroup variant='outlined'>
                <Button onClick={() => setShowCategories(!showCategories)}>
                  {showCategories ? 'Hide' : 'Show'} Item Categories
                </Button>
              </ButtonGroup>
            </Box>
            <Collapse in={showCategories} timeout='auto' unmountOnExit>
              <Box>
                <FormControl required fullWidth>
                  <FormLabel id='category-text'>New Item Category</FormLabel>
                  <Select
                    id='category-input'
                    aria-describedby='category-text'
                    value={MenuCategory.Appetizer}
                    onChange={(event) =>
                      editItemInput(
                        'category',
                        event.target.value as MenuCategory
                      )
                    }>
                    <MenuItem value={MenuCategory.Appetizer}>
                      Appetizer
                    </MenuItem>
                    <MenuItem value={MenuCategory.Alcohol}>Alcohol</MenuItem>
                    <MenuItem value={MenuCategory.Beverage}>Beverage</MenuItem>
                    <MenuItem value={MenuCategory.Dessert}>Dessert</MenuItem>
                    <MenuItem value={MenuCategory.Entree}>Entree</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Collapse>
          </FormControl>
        </Box>
        <Box sx={{ padding: 1, paddingBottom: 3 }}>
          <FormControl required fullWidth>
            <FormLabel id='itemMenuType-group-text'>Menu Type</FormLabel>
            <Box sx={{ padding: 1 }}>
              <Typography variant='subtitle1'>
                {MenuType[itemInput.type]}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: 1,
                display: 'block',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <ButtonGroup variant='outlined'>
                <Button onClick={() => setShowMenuTypes(!showMenuTypes)}>
                  {showMenuTypes ? 'Hide' : 'Show'} Menu Types
                </Button>
              </ButtonGroup>
            </Box>
            <Collapse in={showMenuTypes} timeout='auto' unmountOnExit>
              <Box>
                <FormControl required fullWidth>
                  <FormLabel id='type-text'>New Item Menu</FormLabel>
                  <Select
                    id='type-input'
                    aria-describedby='type-text'
                    value={MenuType.Brunch}
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
            </Collapse>
          </FormControl>
        </Box>
        <Box>
          <FormControl required sx={{ bottom: 0, left: 0 }}>
            <InputLabel htmlFor={`price-input-${id}`}>Price</InputLabel>
            <OutlinedInput
              id={`price-input-${id}`}
              type='number'
              label='Price'
              aria-describedby={`price-text-${id}`}
              value={itemInput.price}
              onChange={(event) =>
                editItemInput(
                  'price',
                  parseFloat(parseFloat(event.target.value).toFixed(2))
                )
              }
            />
            <FormHelperText id={`price-text-${id}`}>
              Price for this item
            </FormHelperText>
          </FormControl>
        </Box>
      </CardContent>
      <Box sx={{ padding: 1 }}>
        <Divider />
      </Box>
      <CardActions
        sx={{
          display: 'block',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <ButtonGroup variant='contained'>
          <Button color='error' onClick={() => setDeleteOpen(true)}>
            Delete Item
          </Button>
          <Button color='success' disabled={isEditing} onClick={update}>
            Submit Item Edits
          </Button>
        </ButtonGroup>
      </CardActions>
      {error && (
        <Center>
          <ErrorMessage text={`Error: ${error}`} />
        </Center>
      )}
      {result && result.success && (
        <Box sx={{ display: 'block', textAlign: 'center' }}>
          <Typography sx={{ color: 'green' }} variant='subtitle2'>
            Successfully edited item:
          </Typography>
          <Typography sx={{ color: 'green' }} variant='subtitle1'>
            "{item.name}"
          </Typography>
        </Box>
      )}
    </Card>
  )
}

export default ItemEditor
