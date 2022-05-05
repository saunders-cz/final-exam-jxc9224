import React, { useState, ReactNode, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Typography,
  BoxProps,
} from '@mui/material'

import { ErrorMessage } from '../../components'
import type { Item, MenuType, SortState } from '../../types'
import { FIND_ALL_ITEMS, SORT_FUNCTIONS } from '../../modules/menu'

const ItemCard = React.lazy(() => import('./ItemCard'))

const ITEMS_PER_PAGE = 16

export interface ItemListProps extends BoxProps {
  search: string
  sort: SortState
  menu: MenuType
  children?: null | ReactNode | ReactNode[]
}

export const ItemList: React.FC<ItemListProps> = ({
  sort,
  search,
  menu,
  ...boxProps
}) => {
  const { data, loading, error } = useQuery(FIND_ALL_ITEMS)
  const [pageNum, setPageNum] = useState<number>(1)

  if (loading) return <Typography variant='body1'>loading...</Typography>
  if (error) return <ErrorMessage text={error.message} />

  let itemList: Item[] = !data
    ? []
    : [...data.items].filter(
        (item: Item) =>
          item.type === menu &&
          (search === '' ||
            item.name.toLowerCase().search(search.toLowerCase()) > -1)
      )

  Object.keys(sort).forEach((sortKey: string) => {
    const sortGroup = SORT_FUNCTIONS[sortKey as keyof typeof SORT_FUNCTIONS]
    const sortFunc: (a: Item, b: Item) => number =
      sortGroup[sort[sortKey as keyof SortState] as keyof typeof sortGroup]
    itemList = itemList.sort(sortFunc)
  })

  const maxPageNum =
    itemList.length > 0 ? Math.ceil(itemList.length / ITEMS_PER_PAGE) : 1
  if (pageNum > maxPageNum) setPageNum(1)

  const splicePos = (pageNum - 1) * ITEMS_PER_PAGE
  const itemsToDisplay = Math.min(ITEMS_PER_PAGE, itemList.length - splicePos)

  return (
    <Box {...boxProps}>
      {itemList.length > 0 ? (
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'block',
                justifyContent: 'center',
                paddingBottom: 2,
                textAlign: 'center',
              }}>
              <ButtonGroup variant='contained'>
                <Button onClick={() => setPageNum(Math.max(1, pageNum - 1))}>
                  {`<< `}Prev Page{` <<`}
                </Button>
                <Typography
                  sx={{ paddingLeft: 3, paddingRight: 3 }}
                  variant='h5'>
                  {pageNum} / {maxPageNum}
                </Typography>
                <Button
                  onClick={() => setPageNum(Math.min(pageNum + 1, maxPageNum))}>
                  {`>> `}Next Page{` >>`}
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          {itemList.splice(splicePos, itemsToDisplay).map((item) => (
            <Grid item key={item.id} xs={3} sx={{ padding: 1 }}>
              <Suspense
                fallback={
                  <Typography variant='body1'>
                    Loading {item.name}...
                  </Typography>
                }>
                <ItemCard item={item} />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: 'center' }} variant='h6'>
          No items found
        </Typography>
      )}
    </Box>
  )
}
