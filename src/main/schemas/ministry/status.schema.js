export const ministryCustomeGrowthStatus = {
  table: 'ministry_custom_growth_status',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    ministry_id: {
      type: 'TEXT',
      references: { table: 'ministry', column: 'id', onDelete: 'CASCADE' }
    },
    name: { type: 'TEXT' }, // 'FORMATION' | 'GROWING' | 'STABLE' | 'DECLINING' | 'RETIRED' | 'EXTINCT'
    description: { type: 'TEXT' },
    icon: { type: 'TEXT' },
    color: { type: 'TEXT' },
    sort_order: { type: 'TEXT' },
    is_system: { type: 'INTEGER' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'TEXT' }
  }
}

export const ministryCustomeStatusRules = {
  table: 'ministry_status_rules',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    status_id: {
      type: 'TEXT',
      references: { table: 'ministry_growth_status', column: 'id', onDelete: 'CASCADE' }
    },
    metric_column: { type: 'TEXT' }, // member_count
    metric_operator: { type: 'TEXT' }, // > | = | < | +
    metric_value: { type: 'INTEGER' }, // 50 | 5
    priority_level: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    update_at: { type: 'TEXT' }
  }
}
