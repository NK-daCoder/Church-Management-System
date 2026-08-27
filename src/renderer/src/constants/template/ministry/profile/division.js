import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export const divisionTemplate = {
  id: crypto.randomUUID(),
  divisionTitle: '',
  purpose: '',
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}
