export type Reconciliation = {
  statementDate: string
  bankBalance: number
  databaseBalance: number
  readonly discrepancy: number
  status: 'unreconciled' | 'balanced' | 'adjusted'
  notes: string
  adjustments: [
    {
      adjustmentId: string
      contributionId: string
      amount: number
      reason: string
      description: string
    }
  ]
}
