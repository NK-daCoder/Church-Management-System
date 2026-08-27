import React from 'react'
import { DisplayChangerContext } from './display.create'

const DisplayContextProvider = ({ children }) => {
  const [display, setDisplay] = React.useState('home')
  return (
    <DisplayChangerContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayChangerContext.Provider>
  )
}

export default DisplayContextProvider
