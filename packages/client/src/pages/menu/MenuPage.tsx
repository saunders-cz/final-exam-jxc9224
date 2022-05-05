import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'

import { ItemList } from './ItemList'
import { SortButtonGroup } from '../../components'
import { SORT_BUTTONS } from '../../modules/menu'
import { MenuType, SortState } from '../../types'

const MENU_BUTTONS = [
  { type: MenuType.Brunch, label: 'Brunch' },
  { type: MenuType.Dessert, label: 'Dessert' },
  { type: MenuType.Dinner, label: 'Dinner' },
  { type: MenuType.Drinks, label: 'Drinks' },
]

export const CatalogPage = () => {
  const [search, setSearch] = useState<string>('')
  const [sortState, setSortState] = useState<SortState>({})
  const [viewMenu, setViewMenu] = useState<MenuType>(MenuType.Brunch)
  return (
    <Box className='Catalog-page'>
      <Box sx={{ justifyContent: 'center', padding: 3, textAlign: 'center' }}>
        <Box sx={{ padding: 1 }}>
          <Typography variant='h5'>Select a Menu to View</Typography>
        </Box>
        <ButtonGroup>
          {MENU_BUTTONS.map((menu, index) => (
            <Button
              key={index}
              color={viewMenu === menu.type ? 'primary' : 'secondary'}
              variant={viewMenu === menu.type ? 'contained' : 'outlined'}
              onClick={() => setViewMenu(menu.type)}>
              {menu.label}
            </Button>
          ))}
        </ButtonGroup>
        <Box sx={{ padding: 1 }}>
          <Typography variant='h5'>
            Use these buttons to sort through our Menus
          </Typography>
        </Box>
        <SortButtonGroup
          sortButtons={SORT_BUTTONS}
          sortState={sortState}
          setSortState={setSortState}
          sx={{ padding: 1 }}
        />
        <Box sx={{ padding: 1, paddingLeft: 20, paddingRight: 20 }}>
          <Divider>and</Divider>
        </Box>
        <Box sx={{ paddingLeft: 35, paddingRight: 35 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor='search-title-input'>
              Search Products
            </InputLabel>
            <Input
              fullWidth
              id='search-title-input'
              type='text'
              aria-describedby='search-title-text'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <FormHelperText id='search-title-text'>
              Search for product names
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ justifyContent: 'center', padding: 2, textAlign: 'center' }}>
        <ItemList
          menu={viewMenu}
          search={search}
          sort={sortState}
          sx={{ overflow: 'auto', padding: 2 }}
        />
      </Box>
    </Box>
  )
}

export default CatalogPage
