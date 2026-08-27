export const customeKpiDefinition = {
  table: 'custome_kpi_metrics',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    metric_name: { type: 'TEXT' },
    metric_description: { type: 'TEXT' },
    data_type: { type: 'TEXT' },
    unit: { type: 'TEXT' },
    category: { type: 'TEXT' },
    is_active: { type: 'TEXT' },
    formula: { type: 'TEXT' }, // c = (x + y) x b
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    updatedd_at: { type: 'TEXT' }
  }
}

export const customKpiValues = {
  table: 'kpi_values',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    kpi_definition_id: {
      type: 'TEXT',
      references: { table: 'ministry_custome_kpi_metrics', column: 'id', onDelete: 'CASCADE' }
    },
    value: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' }
  }
}
