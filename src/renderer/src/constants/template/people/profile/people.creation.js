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
  family: [
    {
      id: crypto.randomUUID(),
      familyMemberFullName: '',
      relation: '', // e.g., spouse, child, parent, sibling, etc..
      dateOfBirth: '',
      stageOfDevelopment: '',
      gender: ''
    }
  ],
  contactInformation: {
    preferedContactMethod: '', // phone | email | sms
    contactPhoneOrLink: '',
    other: [
      {
        platform: '', // e.g., WhatsApp, Telegram, Instagram, etc..
        contact: ''
      }
    ]
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
    occupation: [
      {
        occupation: '',
        specialization: '',
        employer: '',
        workPhone: '',
        workEmergencyPhone: ''
      }
    ],
    hobbies: [
      {
        hobbyName: '',
        hobbyType: '',
        hobbyEnvironmentPreferences: '',
        isProfessionalSkill: false
      }
    ]
  },
  createdAt: nowTimestamp(),
  updatedAt: ''
}
