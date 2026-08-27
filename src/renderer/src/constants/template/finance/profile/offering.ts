import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  donorId: '',
  fundType: '', // tithe | offering | first fruits | alms | seed | general
  paymentMethod: '',
  dateRecived: '',
  refNo: '',
  amount: 0,
  createdAt: nowTimestamp(),
  updatedAt: ''
}
