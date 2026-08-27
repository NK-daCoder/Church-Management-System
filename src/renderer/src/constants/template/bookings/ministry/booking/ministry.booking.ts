import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  ministryId: '',
  serviveName: '',
  serviceType: '',
  servicePurpose: '',
  serviceGoals: [],

  ministryAvailabilityRules: {
    startAt: '',
    endAt: '',
    excludingDays: []
  },

  location: {
    id: crypto.randomUUID(),
    venuName: '',
    venuType: '',
    capacity: '',
    country: '',
    province: '',
    state: '',
    area: '',
    street: '',
    code: ''
  },

  approval: {
    approvedBy: '',
    approvedAt: null,
    confirmedBy: '',
    confirmedAt: null
  },

  notes: '',
  createdBy: nowTimestamp(),
  updateBy: ''
}
