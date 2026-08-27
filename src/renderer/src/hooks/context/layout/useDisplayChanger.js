import React from 'react'
import { DisplayChangerContext } from './display.create'

export const useDisplayChanger = () => {
  const context = React.useContext(DisplayChangerContext)

  if (!context) throw Error('Be sure to nest all elements within the DisplayChanger provider')

  return context
}
