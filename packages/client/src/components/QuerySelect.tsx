import React from 'react'
import { MenuItem, Select, SelectProps, Typography } from '@mui/material'
import { useQuery, DocumentNode } from '@apollo/client'

const ADD_NEW_LABEL = `Add new...`
const NO_RESULTS_LABEL = `No results`

export interface QuerySelectProps extends SelectProps {
  apolloQuery: DocumentNode
  defaultValue?: string | number | readonly string[]
  defaultValueLabel?: string
  noResultsLabel?: string
  getQueryData: (data: any) => any[] | undefined
  getQueryDataValueLabel: (value: any) => string
  onDataSelected: (value?: any) => void
  onQueryFail?: () => void
}

export const QuerySelect: React.FC<QuerySelectProps> = ({
  apolloQuery,
  getQueryData,
  getQueryDataValueLabel,
  onDataSelected,
  defaultValue,
  defaultValueLabel,
  noResultsLabel,
  onQueryFail,
  ...selectProps
}) => {
  const { data, loading, error } = useQuery(apolloQuery)

  if (loading) {
    return (
      <Select {...selectProps}>
        <MenuItem>Loading...</MenuItem>
      </Select>
    )
  }

  if (error) {
    return (
      <Typography color='error' variant='body2'>
        {error.message}
      </Typography>
    )
  }

  if (!data) {
    return (
      <Select {...selectProps}>
        <MenuItem>No options available</MenuItem>
      </Select>
    )
  }

  const queryData = data !== undefined && getQueryData(data)
  if (!queryData) {
    if (onQueryFail) onQueryFail()
    return (
      <Select {...selectProps} onChange={(event) => selectData(event.target.value)}>
        <MenuItem key={0} value={defaultValue}>
          {defaultValue ? defaultValueLabel || ADD_NEW_LABEL : noResultsLabel || NO_RESULTS_LABEL}
        </MenuItem>
      </Select>
    )
  }

  const selectData = (value: any) => {
    if (value !== defaultValue) {
      onDataSelected(queryData.at(value))
    } else {
      onDataSelected(defaultValue)
    }
  }

  return (
    <Select {...selectProps} onChange={(event) => selectData(event.target.value)}>
      {defaultValue && (
        <MenuItem key={0} value={defaultValue}>
          {defaultValueLabel || ADD_NEW_LABEL}
        </MenuItem>
      )}
      {queryData.map((value, index) => {
        return (
          <MenuItem key={index + 1} value={index}>
            {getQueryDataValueLabel(value)}
          </MenuItem>
        )
      })}
    </Select>
  )
}

