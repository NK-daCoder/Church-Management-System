import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  statementDate: '',

  // Financial Tracking (Stored as integers/cents if dealing with raw JS floats)
  bankBalance: 0, // The cash amount according to the bank statement
  databaseBalance: 0, // The total amount your database says you have

  // Computed Discrepancy (Calculated dynamically or cached)
  // getting this value reconciliation.discrepency
  get discrepancy() {
    return Number((this.bankBalance - this.databaseBalance).toFixed(2))
  },

  // Audit & Error Tracking
  status: 'UNRECONCILED', // 'UNRECONCILED', 'BALANCED', 'ADJUSTED'
  notes: '', // General notes regarding the monthly review

  // Array to hold any adjustment logs needed to fix typos/bounced checks
  adjustments: [
    {
      adjustmentId: crypto.randomUUID(),
      contributionId: '', // Optional: link to the negative contribution entry
      amount: 0, // e.g., -150.00
      reason: '', // 'TYPO', 'BOUNCED_CHECK', 'BANK_FEE'
      description: '' // 'Cash typo by count team on Batch X'
    }
  ],

  // System Timestamps
  createdAt: nowTimestamp(),
  updatedAt: nowTimestamp()
}
