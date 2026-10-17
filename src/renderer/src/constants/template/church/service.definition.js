export const CHURCH_SERVICE_DEFINITION = {
  id: crypto.randomUUID(),
  definition: {
    title: '',
    purpose: '',
    serviceType: '',
    schedule: {
      dateIn: '',
      dateOut: '',
      timeIn: '',
      timeOut: ''
    },
    expectedCapacity: 0
  },
  participants: {
    id: crypto.randomUUID(),
    participantId: '',
    role: [{ role: '', purpose: '' }]
  }
}
