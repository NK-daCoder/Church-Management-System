export type BatchStatus = 'open' | 'counted' | 'deposited'

export interface QualityAssurance {
  totalCash: number
  totalChecks: number
  totalFake: number
  readonly fullAmountCollected: number
}

export type Batches = {
  batchName: string // Sunday 9AM Service Offering
  serviceType: string // reqular sunday service
  dateCollected: string
  qualityAssurance: QualityAssurance
  status: BatchStatus // open | counted | deposited
  counters: string[] // could be a list of trusted members
  notes: string
}
