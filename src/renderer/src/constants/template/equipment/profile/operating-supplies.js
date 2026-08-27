import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export const supplies = {
  id: crypto.randomUUID(),
  name: '',
  description: '',
  category: '', // chair | table | basket | kitchen-utensil | extension-cord | other
  purpose: '',
  quantityOnHand: 0,
  unitPrice: 0,
  condition: 'good', // good | fair | damaged | unusable
  components: [
    {
      id: crypto.randomUUID(),
      name: '',
      purpose: '',
      condition: '',
      quantityOnHand: 0
    }
  ],
  storageLocation: '',
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}

export const suppliesReturned = {
  issueId: '',
  supplyId: '',
  quantityIssued: 0,
  ministryId: '',
  issuedTo: '',
  issuedAt: '',
  expectedReturnAt: '',
  returnedAt: '',
  quantityReturned: 0,
  notes: ''
}
