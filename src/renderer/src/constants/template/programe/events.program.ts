import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export default {
  id: crypto.randomUUID(),
  title: '', // Youth-ministry or name of the program
  ministryId: [], // gets alist of ministries that are involved
  overseeerId: [], // gets a list of MEMBERS | LEADERS who will oversee the program till completion
  event: {
    title: '',
    purpose: '',
    dates: {
      startAt: '',
      endsAt: ''
    },
    estimateAttendance: 0,
    notes: ''
  },
  location: {
    // from where was the equipment picked-up
    venuName: '',
    venuType: '',
    venuOwner: {
      name: '',
      role: '',
      relation: '',
      contact: {
        preferedMethod: {
          plateform: '',
          contact: ''
        },
        emergencyNo: ''
      }
    },
    venueAddress: {
      country: '',
      province: '',
      code: '',
      city: '',
      area: '',
      street: ''
    },
    venueMaxCapacity: 0,
    createdAt: nowTimestamp(),
    updatedAt: ''
  },
  eventResources: {
    // equipment for when it is found within the database which are items that require repairs, firmware, serial numbers think long durable assets (sound systems, boards, projectors, church vans, HVAC units and lighting)
    churchResources: {
      equipmentId: '',
      quantityRequested: 0,
      quantityIssued: 0,
      issuedAt: '' // at times equipment can be issued for an event that will occure at a later stage
    },

    // picnic buskets, folding-tables, hymbooks, extension-cords and kitchen utensils
    volenteerSupplies: [
      {
        id: crypto.randomUUID(),
        name: '',
        purpose: '',
        quantityReq: 0,
        quantityIssued: 0,
        supplier: {
          ownerName: '',
          contact: ''
        }
      }
    ],

    organisationalSupplies: {
      supplies: [
        {
          supplyId: '',
          supplyName: '',
          quantityReq: 0,
          quantityIssued: 0
        }
      ],
      approvalBy: {
        name: '',
        role: '',
        signature: '',
        status: ''
      }
    },

    notes: ''
  },
  createdAt: nowTimestamp(),
  updatedAt: ''
}
