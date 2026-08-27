import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

// for ministers
export default {
  id: crypto.randomUUID(),

  // References
  personId: '',
  ministryId: '',

  // Current state
  currentRole: '',
  status: 'active', // active | on-leave | suspended | completed

  assignedDate: '',
  endDate: '',

  notes: '',

  training: [],
  statusChanges: [],
  goals: [],
  xpRules: {},

  createdAt: nowTimestamp(),
  updatedAt: ''
} as const
