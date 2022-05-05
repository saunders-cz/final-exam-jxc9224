import React from 'react'

export interface Page {
  element: React.FC | React.LazyExoticComponent<React.FC<{}>>
  header: string
  icon: React.FC | React.LazyExoticComponent<React.FC<{}>>
  order: number
  path?: string
  session?: boolean
  title: string
}

