import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  batchName: '', // Sunday 9AM Service Offering
  serviceType: '', // reqular sunday service
  dateCollected: '',
  qualityAssurance: {
    totalCash: 0,
    totalChecks: 0,
    totalFake: 0,
    get fullAmountCollected() {
      return this.totalCash + this.totalChecks
    }
  },
  status: '', // open | counted | deposited
  counters: [], // could be a list of trusted members
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}
