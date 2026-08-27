export const equipmentProfile = {
  table: 'equipment',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },

    equipment_type_id: {
      type: 'TEXT',
      references: {
        table: 'equipment_types',
        column: 'id'
      }
    },

    category_id: {
      type: 'TEXT',
      references: {
        table: 'equipment_categories',
        column: 'id'
      }
    },

    title: { type: 'TEXT' },
    description: { type: 'TEXT' },
    asset_tag: { type: 'TEXT' },
    serial_number: { type: 'TEXT' },
    manufacturer: { type: 'TEXT' },
    model_number: { type: 'TEXT' },
    purchase_date: { type: 'TEXT' },
    warranty_expiry: { type: 'TEXT' },

    current_quantity: {
      type: 'INTEGER',
      default: 1
    },

    current_condition: {
      type: 'TEXT'
    },

    current_status: {
      type: 'TEXT'
    },

    notes: {
      type: 'TEXT'
    },

    created_at: {
      type: 'TEXT',
      default: 'CURRENT_TIMESTAMP'
    },

    updated_at: {
      type: 'TEXT'
    }
  }
}

export const equipmentComponentProfile = {
  table: 'equipment_components',

  schema: {
    id: {
      type: 'TEXT',
      primaryKey: true,
      notNull: true
    },

    equipment_id: {
      type: 'TEXT',
      references: {
        table: 'equipment',
        column: 'id'
      }
    },

    component: {
      type: 'TEXT'
    },

    purpose: {
      type: 'TEXT'
    },

    model_number: {
      type: 'TEXT'
    },

    quantity_on_hand: {
      type: 'INTEGER',
      default: 0
    },

    quantity_issued: {
      type: 'INTEGER',
      default: 0
    },

    current_condition: {
      type: 'TEXT'
    }
  }
}

export const equipmentCapitalAssets = {
  table: 'equipment_capital_assets',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    equipment_id: { type: 'TEXT', references: { table: 'equipment', column: 'id' } },
    current_price: { type: 'NUMERIC' },
    new_price: { type: 'NUMERIC' },
    is_salvageable: { type: 'INTEGER' }
  }
}

export const supplyCapitalAssets = {
  table: 'equipment_supply_assets',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    equipment_id: { type: 'TEXT', references: { table: 'equipment', column: 'id' } },
    purpose: { type: 'TEXT' },
    unit_price: { type: 'NUMERIC' },
    storage_location: { type: 'TEXT' }
  }
}
