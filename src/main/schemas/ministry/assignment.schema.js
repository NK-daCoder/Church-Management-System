export const MinistryRoleAssignment = {
    table: 'ministry_role_assigner',
    schema: {
        id: { type: 'text', notNull: true, default: crypto.randomUUID() },
        role_assigned: { type: 'text', notNull: true, reference: { table: ''  }},
        role_title_snapshot: { type: 'text' },
        role_description_snapshot: { type: 'text' },
        date_assigned: { type: 'text' },
        time_assigned: { type: 'text' },
        witnessess: { type: 'numeric' },
        created_at: { type: 'text', default: 'current_timestamp' },
        update_at: { type: 'text' }
    }
}

