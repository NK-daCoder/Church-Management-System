export default {
  // 1. DISCOVERY (The Visitor Phase)
  firstVisitDate: '',
  discoverySource: 'walk-by', // e.g., 'Social Media', 'Invited by Friend', 'Walk-in'
  invitedBy: '', // Link to another UUID if possible
  membersgipInvitationSent: false,

  // 2. membership lifecycle
  membership: {
    status: {
      status: 'visitor', // 'visitor' | 'member' | 'leader'
      prevStatus: 'none',
      spiritualJourney: 'skeptic', // 'skeptic' | 'atheist' | 'new-beliver' | 'growing-believer' | 'mature-believer' | 'seeker'
      reason: 'Someone who has attended but has not committed to the church.'
    },
    dateJoined: '', // Only filled when status becomes 'member'
    initiationDate: '', // Significant milestone in church data
    membershipClassCompleted: false,
    previousChurch: 'none'
  },

  // 3. ENGAGEMENT (The Active Phase)
  engagement: {
    lifecycleStatus: 'active', // active | inactive | moved | deceased
    ministryInterest: [],
    ministryInvolvement: [], // Departments they belong to
    volunteeringRoles: [], // Specific titles (e.g., 'Lead Usher')
    spiritualGifts: [] // e.g., 'Teaching', 'Hospitality'
  },

  lastAttendedDate: '', // Great for "we haven't seen you in a while" triggers
  attendnaceHistory: [
    {
      date: '', // ISO date string,
      serviceType: '',
      checkedIn: false
    }
  ]
} as const
