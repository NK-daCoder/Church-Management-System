export const ministryMinisterLeadership = {
  table: 'ministry_leadership',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    person_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    assigned_to_ministry_id: {
      type: 'TEXT',
      references: { table: 'ministry', column: 'id', onDelete: 'CASCADE' }
    },
    current_role: { type: 'TEXT' },
    date_assigned: { type: 'TEXT' },
    date_stoped_serving: { type: 'TEXT' },
    notes: { type: 'TEXT' },
    created_at: { type: 'TEXT' },
    updated_at: { type: 'TEXT' }
  }
}

export const ministryMinisterStatus = {
  table: 'ministry_minister_status',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    person_id: { type: 'TEXT', references: { table: 'people', column: 'id' } },
    status_current: { type: 'TEXT' },
    status_previous: { type: 'TEXT' },
    reason: { type: 'TEXT' },
    created_at: { type: 'TEXT' },
    updated_at: { type: 'TEXT' }
  }
}

export const ministerTraining = {
  table: 'minister_training',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    person_id: { type: 'TEXT', references: { table: 'people', column: 'id' } },
    training: { type: 'TEXT' }
  }
}
