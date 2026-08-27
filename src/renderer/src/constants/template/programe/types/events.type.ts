export interface ContactMethod {
  platform: string
  contact: string
}

export interface VenueOwner {
  name: string
  role: string
  relation: string
  contact: {
    preferredMethod: ContactMethod
    emergencyNo: string
    email: string
  }
}

export interface VenueAddress {
  country: string
  province: string
  code: string
  city: string
  area: string
  street: string
}

export interface EventDetails {
  title: string
  purpose: string
  dates: {
    startAt: string
    endsAt: string
  }
  estimatedAttendance: number
  notes: string
}

export interface ChurchResource {
  equipmentId: string
  quantityRequested: number
  quantityIssued: number
  issuedAt: string
}

export interface VolunteerSupply {
  id: string
  name: string
  purpose: string
  quantityRequested: number
  quantityIssued: number
  supplier: {
    ownerName: string
    contact: string
  }
}

export interface OrganisationalSupply {
  supplyId: string
  supplyName: string
  quantityRequested: number
  quantityIssued: number
}

export interface ProgramEvent {
  id: string
  title: string

  ministryIds: string[]

  // Members or leaders responsible for execution
  overseerIds: string[]

  event: EventDetails

  location: {
    venueName: string
    venueType: string

    venueOwner: VenueOwner

    venueAddress: VenueAddress

    venueMaxCapacity: number

    createdAt: string
    updatedAt: string
  }

  eventResources: {
    churchResources: ChurchResource[]

    volunteerSupplies: VolunteerSupply[]

    organisationalSupplies: {
      supplies: OrganisationalSupply[]

      approvedBy: {
        name: string
        status:
          'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
        role: string
        signature: string
      }
    }

    notes: string
  }

  createdAt: string
  updatedAt: string
}
