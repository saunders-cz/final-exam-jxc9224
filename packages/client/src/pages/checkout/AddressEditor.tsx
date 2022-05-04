import React, { Suspense, ReactNode } from 'react'
import { Box, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '../../state'

const AddressEditorTab = React.lazy(() => import('./AddressEditorTab'))

export interface AddressEditorProps {
  addressTab: string
  setAddressTab: React.Dispatch<React.SetStateAction<string>>
  showBillingAddress: boolean
  children?: null | ReactNode | ReactNode[]
}

export const AddressEditor: React.FC<AddressEditorProps> = ({
  addressTab,
  setAddressTab,
  showBillingAddress,
}) => {
  const dispatch = useAppDispatch()
  const checkout = useAppSelector((state) => state.checkout)
  return (
    <TabContext value={addressTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={(_, value: string) => setAddressTab(value)}
          aria-label='address tabs'>
          <Tab label='Shipping Address' value='shipping' />
          {showBillingAddress && (
            <Tab label='Billing Address' value='billing' />
          )}
        </TabList>
      </Box>
      <TabPanel value='shipping'>
        <Suspense
          fallback={
            <Typography variant='body1'>
              Loading shipping addresss editor...
            </Typography>
          }>
          <AddressEditorTab
            address={checkout.shipping}
            header='Shipping Address'
            dispatch={dispatch}
            dispatchType='setShippingAddress'
          />
        </Suspense>
      </TabPanel>
      {showBillingAddress && (
        <TabPanel value='billing'>
          <Suspense
            fallback={
              <Typography variant='body1'>
                Loading billing address editor...
              </Typography>
            }>
            <AddressEditorTab
              address={checkout.billing}
              header='Billing Address'
              dispatch={dispatch}
              dispatchType='setBillingAddress'
            />
          </Suspense>
        </TabPanel>
      )}
    </TabContext>
  )
}

export default AddressEditor
