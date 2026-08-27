type PaymentMethode = 'eft' | 'digital' | 'eft' | 'in-person' | 'check' | 'other'
type FundCategory =
  'tithe' | 'offering' | 'first-fruit' | 'alms' | 'seed' | 'sacrificial-giving' | 'charity'

export type Offering = {
  personId: string
  fundType: FundCategory
  paymentMethod: PaymentMethode
  dateRecived: string
  refNo: string
  amount: number
}
