import React from 'react'
import PeopleApplication from './views/people.main'
import VistorForm from './views/forms/visitor-form'
import MembershipForm from './views/forms/member-form'

const PeopleMainApplication = () => {
  const [view, setView] = React.useState('people')

  const layout = {
    people: <PeopleApplication setView={setView} />,
    visitorForm: <VistorForm setView={setView} />,
    membershipForm: <MembershipForm setView={setView} />
  }

  let renderLayout = layout[view]

  return <div className="w-full">{renderLayout}</div>
}

export default PeopleMainApplication
