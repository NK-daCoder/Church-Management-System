import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export const capitalAssetTemplate = {
  id: crypto.randomUUID(),
  title: '',
  description: '',
  assetTag: '',
  brand: '',
  modalNo: '',
  category: '', // Sound boards, projectors, church vans, HVAC units, laptops, and stage lighting.
  manufacturer: '',
  components: [
    {
      id: crypto.randomUUID(),
      name: '',
      purpose: '',
      modalNo: '',
      quantityOnHand: 0,
      quantityIssued: 0
    }
  ],
  quantityOnHand: 0,
  condition: {
    current: '',
    previous: '',
    reason: ''
  },
  price: {
    current: 0,
    new: 0
  },
  isSalvageable: false,
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}
