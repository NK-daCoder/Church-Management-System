import React from 'react'
import PropTypes from 'prop-types'
import { DisplayChangerContext } from './display.create'

const DisplayContextProvider = ({ children }) => {
  const [display, setDisplay] = React.useState('home')
  return (
    <DisplayChangerContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayChangerContext.Provider>
  )
}

DisplayContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DisplayContextProvider
