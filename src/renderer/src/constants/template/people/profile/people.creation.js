import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export const peopleProfileTemplate = {
  id: crypto.randomUUID(), // actual id of the person
  fullName: '',
  dateOfBirth: '',
  anniversaryDate: '',
  gender: '',
  maritalStatus: '',
  stageOfHumanDevelopment: '',
  address: {
    id: crypto.randomUUID(),
    country: '',
    city: '',
    province: '',
    code: '',
    area: '',
    streetName: '',
    houseType: '',
    houseNumber: ''
  },
  family: [],
  contactInformation: {
    preferedContactMethod: '', // phone | email | sms
    contactPhoneOrLink: '',
    other: []
  },
  additionalInformation: {
    school: {
      schoolName: '',
      educationLevel: ''
    },
    spiritualJourney: {
      spiritualStatus: 'seeker',
      reason: 'new comer'
    },
    occupation: [],
    hobbies: []
  },
  createdAt: nowTimestamp(),
  updatedAt: ''
}
