export const bookingProfile = {
  table: 'booking_profile',
  schema: {
    id: { type: 'TEXT', autoincrement: true, notNull: true },
    title: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    date_start: { type: 'TEXT' },
    date_end: { type: 'TEXT' },
    time_start: { type: 'TEXT' },
    time_end: { type: 'TEXT' },
    notes: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'TEXT' }
  }
}

export const bookingResources = {
  table: 'booking_resources',
  schema: {
    id: { type: 'TEXT', autoincrement: true, notNull: true },
    booking_id: {
      type: 'TEXT',
      references: { table: 'booking_profile', column: 'id', onDelete: 'CASCADE' }
    },
    resource_type: { type: 'TEXT' },
    resource: { type: 'TEXT' }
  }
}

export const bookingApprovals = {
  table: 'booking_appprovals',
  schema: {
    id: { type: 'TEXT', autoincrement: true, notNull: true },
    booking_id: {
      type: 'TEXT',
      references: { table: 'booking_profile', column: 'id', onDelete: 'CASCADE' }
    },
    who_approved: { type: 'TEXT' }
  }
}
