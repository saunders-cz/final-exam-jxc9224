import React from 'react'
import { Box, Button, ButtonGroup, Typography, Container } from '@mui/material'
import { useMutation } from '@apollo/client'
import { DELETE_ITEM } from '../../modules/menu'
import { Center, ErrorMessage } from '../../components'
import type { Item } from '../../types'

export interface DeleteItemProps {
  item: Item
  closeModal: () => void
  refetch: () => Promise<any>
}

export const ItemDestroyer: React.FC<DeleteItemProps> = ({
  item,
  closeModal,
  refetch,
}) => {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM)

  const submit = async () => {
    const { data } = await deleteItem({
      variables: {
        id: item.id,
      },
    })

    if (data && data.result) {
      if (data.result.success) {
        await refetch()
      }
    }
  }

  return (
    <Box
      sx={{ display: 'block', justifyContent: 'center', textAlign: 'center' }}>
      {error && (
        <Container sx={{ padding: 1 }}>
          <Center>
            <ErrorMessage text={`Error: ${error}`} />
          </Center>
        </Container>
      )}
      <Container sx={{ padding: 1 }}>
        <Typography variant='h5'>Are you sure...</Typography>
      </Container>
      <Container sx={{ padding: 1 }}>
        <Typography variant='subtitle1'>
          That you want to delete "{item.name}"?
        </Typography>
      </Container>
      <Container sx={{ padding: 1 }}>
        <ButtonGroup variant='contained'>
          <Button color='success' onClick={closeModal}>
            NO - Return to Admin Panel
          </Button>
          <Button color='error' onClick={submit}>
            YES - Delete Item
          </Button>
        </ButtonGroup>
      </Container>
    </Box>
  )
}

export default ItemDestroyer
