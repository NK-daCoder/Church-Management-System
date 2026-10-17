export const ChurchServices = {
  table: 'church_services_definition',
  schema: {
    id: { type: 'text', notNull: true, primaryKey: true },
    title: { type: 'text', notNull: true }, // "Sunday Morning Service"
    purpose: { type: 'text' },
    service_type: { type: 'text' }, // 'sunday_service', 'small_group', 'bible_study', 'youth'
    date_in: { type: 'text' },
    date_out: { type: 'text' },
    start_time: { type: 'text' }, // ISO datetime of this instance
    end_time: { type: 'text' },
    expected_capacity: { type: 'integer' }, // for % calculations
    created_at: { type: 'text', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'text' }
  }
}

export const ChurchServiceParticipants = {
  table: 'church_service_participants',
  schema: {
    id: { type: 'text', notNull: true, primaryKey: true },
    cs_definition: {
      type: 'text',
      notNull: true,
      reference: { table: 'church_services_definition', column: 'id' }
    },
    participant_id: { type: 'text', notNull: true, reference: { table: 'people', column: 'id' } },
    participant_role: { type: 'text' },
    created_at: { type: 'text', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'text' }
  }
}

export const PeopleChurchAttendance = {
  table: 'people_church_attendance',
  schema: {
    id: { type: 'text', notNull: true, primaryKey: true },
    people_id: { type: 'text', notNull: true, references: { table: 'people', column: 'id' } },
    service_id: {
      type: 'text',
      notNull: true,
      references: { table: 'church_services_definition', column: 'id' }
    },

    // Attendance detail
    status: { type: 'text', notNull: true, default: 'present' }, // 'present' | 'absent' | 'late' | 'excused'
    time_in: { type: 'text' }, // ISO datetime
    time_out: { type: 'text' }, // ISO datetime

    // Context flags
    is_first_time_visitor: { type: 'integer', default: 0 }, // 0/1
    check_in_method: { type: 'text' }, // 'kiosk' | 'qr' | 'manual' | 'headcount' | 'self_report'
    recorded_by: { type: 'text', references: { table: 'people', column: 'id' } }, // staff/volunteer who logged it
    recorded_at: { type: 'text', default: 'CURRENT_TIMESTAMP' },

    notes: { type: 'text' },
    created_at: { type: 'text', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'text' }
  }
}
