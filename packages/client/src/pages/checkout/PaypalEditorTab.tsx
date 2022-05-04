import React, { ReactNode } from 'react'
import { Box, Card, CardHeader, CardMedia, Container } from '@mui/material'

export interface CardEditorTabProps {
  setAddressTab: React.Dispatch<React.SetStateAction<string>>
  setFactorSalesTax: React.Dispatch<React.SetStateAction<boolean>>
  setShowBillingAddress: React.Dispatch<React.SetStateAction<boolean>>
  children?: null | ReactNode | ReactNode[]
}

export const CardEditorTab: React.FC<CardEditorTabProps> = ({
  setAddressTab,
  setFactorSalesTax,
  setShowBillingAddress,
}) => {
  setTimeout(() => setFactorSalesTax(true), 0)
  setTimeout(() => setAddressTab('shipping'), 0)
  setTimeout(() => setShowBillingAddress(false), 0)

  return (
    <Card>
      <CardHeader title='Paypal / Paypal Express' />
      <CardMedia>
        <Container>
          <Box sx={{ padding: 3 }}>
            <img
              width={329}
              height={210}
              alt='paypal checkout mock buttons'
              src={process.env.PUBLIC_URL + '/mock/paypal.png'}
            />
          </Box>
        </Container>
      </CardMedia>
    </Card>
  )
}

export default CardEditorTab
