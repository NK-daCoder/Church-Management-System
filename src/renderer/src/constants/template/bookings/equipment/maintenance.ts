export const maintenanceRepair = {
  id: crypto.randomUUID(),
  equipmentId: '',
  condition: '',
  issue: '',
  symtoms: [
    {
      when: '',
      description: ''
    }
  ],
  reportedBy: {
    name: '',
    role: '',
    reportDate: ''
  },
  approval: {
    name: '',
    role: '',
    signature: ''
  },
  vendors: {
    vendorId: crypto.randomUUID(),
    vendorName: '',
    vendorContact: {
      phone: '',
      email: '',
      preferedContact: {
        plateform: '',
        contact: ''
      },
      extra: []
    },
    vendorAddress: {
      id: crypto.randomUUID(),
      country: '',
      province: '',
      city: '',
      code: '',
      area: '',
      street: ''
    },
    contactPerson: {
      name: '',
      role: ''
    }
  },
  createdAt: new Date().toISOString(),
  updatedAt: ''
}

export const maintenanceLog = {
  id: crypto.randomUUID(),
  equipmentId: '',
  vendorId: '',
  issueDescription: '',
  dates: {
    send: '',
    returned: ''
  },
  cost: '',
  invoiceUrl: '',
  notes: ''
}
