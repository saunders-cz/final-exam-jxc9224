import React, { useState, ReactNode, Suspense } from 'react'
import { Box, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '../../state'

const CardEditorTab = React.lazy(() => import('./CardEditorTab'))
const PaypalEditorTab = React.lazy(() => import('./PaypalEditorTab'))

export interface PaymentEditorProps {
  setAddressTab: React.Dispatch<React.SetStateAction<string>>
  setFactorSalesTax: React.Dispatch<React.SetStateAction<boolean>>
  setShowBillingAddress: React.Dispatch<React.SetStateAction<boolean>>
  children?: null | ReactNode | ReactNode[]
}

export const PaymentEditor: React.FC<PaymentEditorProps> = ({
  setAddressTab,
  setFactorSalesTax,
  setShowBillingAddress,
}) => {
  const dispatch = useAppDispatch()
  const checkout = useAppSelector((state) => state.checkout)
  const [tabState, setTabState] = useState<string>('card')
  return (
    <TabContext value={tabState}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={(_, value: string) => setTabState(value)}
          aria-label='payment tabs'>
          <Tab label='Credit / Debit Card' value='card' />
          <Tab label='PayPal / PayPal Credit' value='paypal' />
        </TabList>
      </Box>
      <TabPanel value='card'>
        <Suspense
          fallback={
            <Typography variant='body1'>Loading card editor...</Typography>
          }>
          <CardEditorTab
            card={checkout.card}
            dispatch={dispatch}
            setAddressTab={setAddressTab}
            setFactorSalesTax={setFactorSalesTax}
            setShowBillingAddress={setShowBillingAddress}
          />
        </Suspense>
      </TabPanel>
      <TabPanel value='paypal'>
        <Suspense
          fallback={
            <Typography variant='body1'>Loading paypal editor...</Typography>
          }>
          <PaypalEditorTab
            setAddressTab={setAddressTab}
            setFactorSalesTax={setFactorSalesTax}
            setShowBillingAddress={setShowBillingAddress}
          />
        </Suspense>
      </TabPanel>
    </TabContext>
  )
}

export default PaymentEditor
