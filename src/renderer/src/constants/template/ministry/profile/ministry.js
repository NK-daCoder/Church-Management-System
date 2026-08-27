import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  divisionId: '',
  ministry: {
    name: '',
    purpose: ''
  },
  roles: [
    {
      title: '',
      purpose: '',
      roleFor: '', // volenteers | members | leaders
      prerequisites: [''],
      goals: [''],
      notes: ''
    }
  ],
  createdAt: nowTimestamp(),
  updatedAt: ''
}
