import React, { useState, Suspense } from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Fab,
  Grid,
  Modal,
  Typography,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { ErrorMessage, ModalBox } from '../../components'
import { FIND_ALL_ITEMS, SORT_FUNCTIONS } from '../../modules/menu'
import type { Item, SortState } from '../../types'

const ItemAdder = React.lazy(() => import('./ItemAdder'))
const ItemEditor = React.lazy(() => import('./ItemEditor'))

const ITEMS_PER_PAGE = 4

export interface EditorListProps extends BoxProps {
  closeModal: () => void
  modalOpen: boolean
  search: string
  sort: SortState
}

export const EditorList: React.FC<EditorListProps> = ({
  closeModal,
  modalOpen,
  search,
  sort,
  ...boxProps
}) => {
  const { data, loading, error, refetch } = useQuery(FIND_ALL_ITEMS)
  const [pageNum, setPageNum] = useState<number>(1)

  if (loading) return <Typography variant='body1'>loading...</Typography>
  if (error) return <ErrorMessage text={error.message} />

  let itemList: Item[] = !data
    ? []
    : [...data.items].filter(
        (item: Item) =>
          search === '' ||
          item.name.toLowerCase().search(search.toLowerCase()) > -1
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
      {modalOpen && (
        <Modal open={modalOpen} onClose={closeModal}>
          <ModalBox>
            <Fab
              aria-label='exit'
              color='error'
              onClick={closeModal}
              sx={{ position: 'fixed', top: 16, right: 16 }}>
              <CloseIcon />
            </Fab>
            <Suspense
              fallback={
                <Typography variant='body1'>Loading item adder...</Typography>
              }>
              <ItemAdder
                close={closeModal}
                refetch={refetch}
                sx={{ padding: 1 }}
              />
            </Suspense>
          </ModalBox>
        </Modal>
      )}
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
            <Grid item key={item.id} sx={{ padding: 2 }} xs={3}>
              <Suspense
                fallback={
                  <Typography variant='body1'>
                    Loading {item.name}...
                  </Typography>
                }>
                <ItemEditor item={item} refetch={refetch} />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: 'center' }} variant='h6'>
          No items to edit
        </Typography>
      )}
    </Box>
  )
}
