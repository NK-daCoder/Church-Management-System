export const DivisionSchema = {
  table: 'divisions',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    title: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    notes: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'TEXT' }
  }
}

export const ministryProfileSchema = {
  table: 'ministry',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    divisions_id: {
      type: 'TEXT',
      references: { table: 'divisions', column: 'id', onDelete: 'CASCADE' }
    },
    ministry_title: { type: 'TEXT' },
    ministry_purpose: { type: 'TEXT' },
    create_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    update_at: { type: 'TEXT' }
  }
}

export const ministryRolesSchema = {
  table: 'ministry_roles',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    ministry_id: {
      type: 'TEXT',
      references: { table: 'ministry', column: 'id', onDelete: 'CASCADE' }
    },
    title: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    role_for: { type: 'TEXT' },
    notes: { type: 'TEXT' }
  }
}

export const ministryRoleQualification = {
  table: 'ministry_role_qualifications',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    ministry_role_id: {
      type: 'TEXT',
      references: { table: 'ministry_roles', column: 'id', onDelete: 'CASCADE' }
    },
    qualification: { type: 'TEXT' }
  }
}

export const ministryRoleGoalsSchema = {
  table: 'ministry_role_goals',
  schema: {
    id: {
      type: 'TEXT',
      primaryKey: true,
      notNull: true
    },

    ministry_role_id: {
      type: 'TEXT',
      references: {
        table: 'ministry_roles',
        column: 'id',
        onDelete: 'CASCADE'
      }
    },

    goal: {
      type: 'TEXT'
    }
  }
}
