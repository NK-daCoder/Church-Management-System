import React from 'react'
import PeopleContext from './people.context.js'
import PropTypes from 'prop-types'
import { peopleProfileTemplate } from '../../../constants/template/people/profile/people.creation.js'

const PeopleContextProvider = ({ children }) => {
  const [peopleList, setPeopleList] = React.useState([])
  const [peopleTemplate, setPeopleTemplate] = React.useState(peopleProfileTemplate)

  const loadPeople = async () => {
    const result = await window.api.people.findAll()
    setPeopleList(result)
  }

  const createPerson = async (payload) => {
    const result = await window.api.people.createProfile(payload)
    await loadPeople()
    return result
  }

  const updatePerson = async (payload) => {
    const result = await window.api.people.updateProfile(payload)
    await loadPeople()
    return result
  }

  const deletePeople = async (payload) => {
    const result = await window.api.people.deleteProfile(payload)
    await loadPeople()
    return result
  }

  const findPersonProfileById = async (id) => {
    const result = await window.api.people.findProfile(id)
    return result
  }

  React.useEffect(() => {
    const getPeople = () => {
      loadPeople()
    }

    getPeople()
  }, [])

  return (
    <PeopleContext.Provider
      value={{
        peopleList,
        setPeopleList,
        setPeopleTemplate,
        peopleTemplate,
        createPerson,
        updatePerson,
        deletePeople,
        findPersonProfileById
      }}
    >
      {children}
    </PeopleContext.Provider>
  )
}

PeopleContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default PeopleContextProvider
