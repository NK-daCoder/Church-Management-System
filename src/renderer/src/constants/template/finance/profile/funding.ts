export const FundAllocationTemplate = {
  id: '',
  fundersId: [], // could be a list of funders or donors
  totalFundsRequested: 0,
  totalFundsAllocated: 0,
  fundType: [], // building | missions | welfare | education | evangelism | other
  reasonForRequest: '',
  notes: '',
  fundApproval: {
    whoApproved: '',
    status: '', // approved | rejected | pending,
    dateApproved: ''
  },
  paymentMethod: '', // cash | check | transfer
  fundStatus: '', // pending | allocated | disbursed
  createdAt: '',
  updatedAt: ''
}
