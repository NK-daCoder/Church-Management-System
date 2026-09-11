import MinistryContext from './ministry-context'
import React from 'react'
export const useMinistry = () => {
  const context = React.useContext(MinistryContext)

  if (!context) {
    throw new Error('useMinistry must be used inside MinistryContextProvider')
  }

  return context
}
