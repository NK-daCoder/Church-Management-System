export const ministryActivityTracking = {
  table: 'ministry_activities',
  schema: {
    id: { type: 'TEXT', notNull: true, default: crypto.randomUUID() },
    ministry_id: {
      type: 'TEXT',
      notNull: true,
      references: { table: 'ministry', column: 'id', onDelete: 'CASCADE' }
    },
    event_title: { type: 'TEXT' },
    event_description: { type: 'TEXT' },
    start_date: { type: 'TEXT' },
    start_end: { type: 'TEXT' },
    start_time: { type: 'TEXT' },
    end_time: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'current_timestamp' },
    update_at: { type: 'TEXT' }
  }
}

export const ministryActivityGoals = {
  table: 'ministry_activity_goals',
  schema: {
    id: { type: 'TEXT', notNull: true, default: crypto.randomUUID() },
    activity_id: {
      type: 'TEXT',
      notNull: true,
      references: { table: 'ministry_activities', column: 'id', onDelete: 'CASCADE' }
    },
    goal: { type: 'TEXT' }
  }
}

// attendance
export const ministryActivityAttendence = {
  table: 'ministry_activity_attendance',
  schema: {
    id: { type: 'TEXT', notNull: true, default: crypto.randomUUID() },
    activity_id: {
      type: 'TEXT',
      notNull: true,
      references: { table: 'ministry_activities', column: 'id', onDelete: 'CASCADE' }
    },
    total_people: { type: 'NUMERIC' },
    total_members: { type: 'TEXT' },
    total_visitor: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'current_timestamp' },
    update_at: { type: 'TEXT' }
  }
}
