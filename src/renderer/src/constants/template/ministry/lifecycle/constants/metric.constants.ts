export const metricCategories = {
  membership: {
    activeMembers: {
      id: 'activeMembers',
      label: 'Active Members'
    },

    trainedMembers: {
      id: 'trainedMembers',
      label: 'Trained Members'
    },

    memberRetentionRate: {
      id: 'memberRetentionRate',
      label: 'Retention Rate'
    }
  },

  leadership: {
    leaders: {
      id: 'leaders',
      label: 'Leaders'
    },

    assistants: {
      id: 'assistants',
      label: 'Assistants'
    },

    trainees: {
      id: 'trainees',
      label: 'Trainees'
    }
  },

  activity: {
    overallAttendanceRate: {
      id: 'overallAttendanceRate',
      label: 'Overall Attendance Rate'
    },

    eventsCompleted: {
      id: 'eventsCompleted',
      label: 'Events Completed'
    }
  },

  impact: {
    promotedMembers: {
      id: 'promotedMembers',
      label: 'Promoted To Members'
    }
  }
} as const
