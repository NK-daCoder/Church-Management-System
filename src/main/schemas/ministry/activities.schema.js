export const ministryActivityTracking = {
  table: 'ministry_activities',
  schema: {
    id: { type: 'text', notNull: true, default: crypto.randomUUID() },
    ministry_id: {
      type: 'text',
      notNull: true,
      references: { table: 'ministry', column: 'id', onDelete: 'CASCADE' }
    },
    event_title: { type: 'text' },
    event_description: { type: 'text' },
    start_date: { type: 'text' },
    start_end: { type: 'text' },
    start_time: { type: 'text' },
    end_time: { type: 'text' },
    created_at: { type: 'text', default: 'current_timestamp' },
    update_at: { type: 'text' }
  }
}

export const ministryActivityGoals = {
  table: 'ministry_activity_goals',
  schema: {
    id: { type: 'text', notNull: true, default: crypto.randomUUID() },
    activity_id: {
      type: 'text',
      notNull: true,
      references: { table: 'ministry_activities', column: 'id', onDelete: 'CASCADE' }
    },
    goal: { type: 'text' }
  }
}

// attendance
export const ministryActivityAttendence = {
  table: 'ministry_activity_attendance',
  schema: {
    id: { type: 'text', notNull: true, default: crypto.randomUUID() },
    activity_id: {
      type: 'text',
      notNull: true,
      references: { table: 'ministry_activities', column: 'id', onDelete: 'CASCADE' }
    },
    total_people: { type: 'numeric' },
    total_members: { type: 'text' },
    total_visitor: { type: 'text' },
    created_at: { type: 'text', default: 'current_timestamp' },
    update_at: { type: 'text' }
  }
}
