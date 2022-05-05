import React, { useEffect, useState, ReactNode } from 'react'
import {
  CardHeader,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import MuiCard from '@mui/material/Card'
import type { AppDispatch, Card, StateEditor } from '../../types'

const int = (input: string) => {
  const parsed = parseInt(input)
  return isNaN(parsed) ? undefined : parsed
}

export interface CardEditorTabProps {
  card: Partial<Card>
  dispatch: AppDispatch
  setAddressTab: React.Dispatch<React.SetStateAction<string>>
  setFactorSalesTax: React.Dispatch<React.SetStateAction<boolean>>
  setShowBillingAddress: React.Dispatch<React.SetStateAction<boolean>>
  children?: null | ReactNode | ReactNode[]
}

export const CardEditorTab: React.FC<CardEditorTabProps> = ({
  card,
  dispatch,
  setAddressTab,
  setFactorSalesTax,
  setShowBillingAddress,
}) => {
  const [shipBillSame, setShipBillSame] = useState<boolean>(true)

  const editCard: StateEditor<Card> = (key, value) => {
    dispatch({
      type: 'checkout/setCheckoutCard',
      payload: { ...card, [key]: value },
    })
  }

  useEffect(() => {
    if (shipBillSame) setTimeout(() => setAddressTab('shipping'), 0)
    else setTimeout(() => setAddressTab('billing'), 0)
    setShowBillingAddress(!shipBillSame)
  }, [shipBillSame, setAddressTab, setShipBillSame, setShowBillingAddress])

  setTimeout(() => setFactorSalesTax(true), 0)

  return (
    <MuiCard>
      <CardHeader title='Credit / Debit Card' />
      <CardContent>
        <Container>
          <Grid container sx={{ paddingTop: 1 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
              <FormControl required fullWidth>
                <InputLabel htmlFor='num-input'>Card Number</InputLabel>
                <OutlinedInput
                  fullWidth
                  id='num-input'
                  label='Card Number'
                  aria-describedby='num-text'
                  value={card.cardNumber}
                  onChange={(event) =>
                    editCard(
                      'cardNumber',
                      int(event.target.value.substring(0, 16))
                    )
                  }
                />
                <FormHelperText id='num-text'>
                  Your 16-digit credit card number
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ paddingTop: 3 }}>
            <Grid item xs={8} sx={{ padding: 1 }}>
              <Grid item container>
                <Grid item xs={6}>
                  <FormControl required fullWidth>
                    <InputLabel htmlFor='exp-month-input'>Month</InputLabel>
                    <Select
                      id='exp-month-input'
                      aria-describedby='exp-month-text'
                      value={card?.cardExpDate?.getMonth() ?? 1}
                      label='Month'
                      onChange={(event) =>
                        editCard(
                          'cardExpDate',
                          new Date(
                            (card.cardExpDate || new Date()).getFullYear(),
                            event.target.value as number
                          )
                        )
                      }>
                      <MenuItem value={1}>January</MenuItem>
                      <MenuItem value={2}>February</MenuItem>
                      <MenuItem value={3}>March</MenuItem>
                      <MenuItem value={4}>April</MenuItem>
                      <MenuItem value={5}>May</MenuItem>
                      <MenuItem value={6}>June</MenuItem>
                      <MenuItem value={7}>July</MenuItem>
                      <MenuItem value={8}>August</MenuItem>
                      <MenuItem value={9}>September</MenuItem>
                      <MenuItem value={10}>October</MenuItem>
                      <MenuItem value={11}>November</MenuItem>
                      <MenuItem value={12}>December</MenuItem>
                    </Select>
                    <FormHelperText id='exp-month-text'>
                      Expiration Month
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item sx={{ paddingLeft: 1 }} xs={6}>
                  <FormControl required fullWidth>
                    <InputLabel htmlFor='exp-year-input'>Year</InputLabel>
                    <Select
                      id='exp-year-input'
                      aria-describedby='exp-year-text'
                      value={card?.cardExpDate?.getFullYear() ?? 2022}
                      label='Year'
                      onChange={(event) =>
                        editCard(
                          'cardExpDate',
                          new Date(
                            event.target.value as number,
                            (card.cardExpDate || new Date()).getMonth()
                          )
                        )
                      }>
                      <MenuItem value={2022}>2022</MenuItem>
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                      <MenuItem value={2026}>2026</MenuItem>
                      <MenuItem value={2027}>2027</MenuItem>
                      <MenuItem value={2028}>2028</MenuItem>
                      <MenuItem value={2029}>2029</MenuItem>
                      <MenuItem value={2030}>2030</MenuItem>
                    </Select>
                    <FormHelperText id='exp-year-text'>
                      Expiration Year
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{ padding: 1 }}>
              <FormControl required fullWidth>
                <InputLabel htmlFor='cvv-input'>CVV</InputLabel>
                <OutlinedInput
                  fullWidth
                  id='cvv-input'
                  label='CVV'
                  aria-describedby='cvv-text'
                  value={card.cardCVV}
                  onChange={(event) =>
                    editCard('cardCVV', int(event.target.value.substring(0, 3)))
                  }
                />
                <FormHelperText id='cvv-text'>
                  Your credit card CVV-code
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shipBillSame}
                  onChange={(event) => setShipBillSame(event.target.checked)}
                />
              }
              label='My billing address is the same as shipping'
            />
          </FormControl>
        </Container>
      </CardContent>
    </MuiCard>
  )
}

export default CardEditorTab
