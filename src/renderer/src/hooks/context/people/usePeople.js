import PeopleContext from './people.context'
import React from 'react'
export const usePeopleContext = () => {
  const context = React.useContext(PeopleContext)

  if (!context)
    throw Error(
      'Children components must be nested within the context in order to use the people context'
    )

  return context
}
