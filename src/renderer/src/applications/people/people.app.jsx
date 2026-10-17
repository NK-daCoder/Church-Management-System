import React from 'react'
import PeopleApplication from './views/people.main'
import VistorForm from './views/forms/visitor-form'
import MembershipForm from './views/forms/member-form'
import MemberProfile from './views/people.profile'
import { usePeopleContext } from '../../hooks/context/people/usePeople'
import PeopleChurchAttendance from './views/people.attendance'

const PeopleMainApplication = () => {
  const [view, setView] = React.useState('people')
  const [formMode, setFormMode] = React.useState('register')
  const { peopleTemplate } = usePeopleContext()

  const layout = {
    people: <PeopleApplication setView={setView} formMode={formMode} setFormMode={setFormMode} />,
    visitorForm: <VistorForm setView={setView} formMode={formMode} setFormMode={setFormMode} />,
    membershipForm: (
      <MembershipForm setView={setView} formMode={formMode} setFormMode={setFormMode} />
    ),
    peopleProfile: (
      <MemberProfile memberProfile={peopleTemplate} setFormMode={setFormMode} setView={setView} />
    ),
    'church-attendance': <PeopleChurchAttendance setView={setView} />
  }

  let renderLayout = layout[view]

  return <div className="w-full">{renderLayout}</div>
}

export default PeopleMainApplication
