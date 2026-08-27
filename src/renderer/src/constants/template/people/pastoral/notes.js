import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  personId: '',
  category: 'pastoral', // 'pastoral' | 'prayer' | 'counseling' | 'visit' | 'general'
  note: '',
  createdBy: '', // leader id,
  createdAt: nowTimestamp(),
  updatedAt: ''
} as const
