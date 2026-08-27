import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  personId: '',
  serviceType: '',
  schedule: {
    timeIn: '',
    timeOut: '',
    dateAttended: ''
  },
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}
