export const peopleStatusHistorySchema = {
  table: 'people_status_category_history',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    person_id: { type: 'TEXT', references: { table: 'people', column: 'id', onDelete: 'CASCADE' } },
    current_status: { type: 'TEXT' }, // visitor, member, leader, staff -> not for promotion but categories
    prev_status: { type: 'TEXT' },
    change_reason: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'current_timestamp' },
    updated_at: { type: 'TEXT' }
  }
}
