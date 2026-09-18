export const churchProgrames = {
  table: 'church_programe',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    title: { type: 'TEXT' },
    purpose: { type: 'TEXT' },
    target_audience: { type: 'TEXT' },
    date_start: { type: 'TEXT' },
    date_end: { type: 'TEXT' },
    time_in: { type: 'TEXT' },
    time_out: { type: 'TEXT' },
    status: { type: 'TEXT', default: "'draft'" }, // draft | published | active | completed | cancelled
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    update_at: { type: 'TEXT' }
  }
}

export const churchProgrameRosterDefinition = {
  table: 'church_programe_roster_definition',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    programe_id: {
      type: 'TEXT',
      notNull: true,
      reference: { table: 'church_programe', column: 'id' }
    },
    name: { type: 'TEXT' }, // e.g. "Sunday Service Roster", "VBS Day 1"
    description: { type: 'TEXT' },
    is_template: { type: 'BOOLEAN', default: 0 }, // reusable across programs
    total_slots_defined: { type: 'NUMERIC', default: 0 }, // denormalized count for quick reads
    total_slots_filled: { type: 'NUMERIC', default: 0 }, // denormalized, updated on assignment
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    update_at: { type: 'TEXT' }
  }
}

// REUSABLE TABLE ACCROSS PROGRAME (GLOBAL)
export const churchRoles = {
  table: 'church_role',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    name: { type: 'TEXT', notNull: true }, // "Worship Leader", "Sound Tech", "Usher"
    category: { type: 'TEXT' }, // "leadership" | "technical" | "hospitality" | "teaching" | "support"
    description: { type: 'TEXT' },
    is_system: { type: 'BOOLEAN', default: 0 }, // system-seeded vs. user-created
    requires_background_check: { type: 'BOOLEAN', default: 0 },
    requires_training: { type: 'BOOLEAN', default: 0 },
    min_age: { type: 'NUMERIC' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' }
  }
}

export const churchProgrameRoleSlot = {
  table: 'church_programe_role_slot',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    roster_definition_id: {
      type: 'TEXT',
      notNull: true,
      reference: { table: 'church_programe_roster_definition', column: 'id' }
    },
    role_id: { type: 'TEXT', notNull: true, reference: { table: 'church_role', column: 'id' } },
    quantity_required: { type: 'NUMERIC', notNull: true, default: 1 }, // how many people needed
    quantity_filled: { type: 'NUMERIC', default: 0 }, // denormalized, auto-updated
    priority_level: { type: 'TEXT', default: "'normal'" }, // "critical" | "normal" | "nice_to_have"
    notes: { type: 'TEXT' }, // "Must arrive 30 min early"
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' }
  }
}

export const churchProgrameAssignment = {
  table: 'church_programe_assignment',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    role_slot_id: {
      type: 'TEXT',
      notNull: true,
      reference: { table: 'church_programe_role_slot', column: 'id' }
    },
    person_id: { type: 'TEXT', notNull: true, reference: { table: 'member', column: 'id' } },
    status: { type: 'TEXT', default: "'invited'" }, // invited | accepted | declined | confirmed | no_show | completed
    invited_at: { type: 'TEXT' },
    responded_at: { type: 'TEXT' },
    checked_in_at: { type: 'TEXT' },
    checked_out_at: { type: 'TEXT' },
    substitute_for: {
      type: 'TEXT',
      reference: { table: 'church_programe_assignment', column: 'id' }
    },
    feedback_score: { type: 'NUMERIC' }, // post-event rating
    feedback_notes: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    update_at: { type: 'TEXT' }
  }
}
