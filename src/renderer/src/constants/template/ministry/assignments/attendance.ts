export default {
  id: crypto.randomUUID(),
  personId: '',
  ministryId: '',
  date: '',
  eventType: '', // meeting | rehearsal | outreach | service
  attended: true,
  notes: ''
} as const
