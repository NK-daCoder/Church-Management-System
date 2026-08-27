import { GenerateUid } from '../../util/uid.generator'
import { peopleSeedDummyData } from './people.seeding'

/*
|--------------------------------------------------------------------------
| PEOPLE STATUS + ORGANIZATIONAL ROLE SEED
|--------------------------------------------------------------------------
|
| Status distribution:
|
|  1 - 8   → visitor
|  9 - 20  → member
| 21 - 25  → staff
| 26 - 30  → leader
|
| Organizational roles are only assigned where appropriate.
|
|--------------------------------------------------------------------------
*/

export const peopleStatusSeed = peopleSeedDummyData.map((person, index) => {
  // -----------------------------------------------------------------------
  // VISITORS
  // -----------------------------------------------------------------------

  if (index < 8) {
    return {
      status: {
        id: GenerateUid(),
        person_id: person.id,
        current_status: 'visitor',
        prev_status: null,
        created_at: '2026-01-01T09:00:00',
        updated_at: '2026-01-01T09:00:00'
      },

      role: null
    }
  }

  // -----------------------------------------------------------------------
  // MEMBERS
  // -----------------------------------------------------------------------

  if (index < 20) {
    return {
      status: {
        id: GenerateUid(),
        person_id: person.id,
        current_status: 'member',
        prev_status: 'visitor',
        created_at: '2026-02-01T09:00:00',
        updated_at: '2026-02-01T09:00:00'
      },

      role: null
    }
  }

  // -----------------------------------------------------------------------
  // STAFF
  // -----------------------------------------------------------------------

  if (index < 25) {
    const staffRoles = [
      {
        role: 'administrator',
        responsibilities: [
          'Manage church administrative records',
          'Maintain member documentation',
          'Coordinate internal administrative tasks'
        ]
      },
      {
        role: 'finance administrator',
        responsibilities: [
          'Assist with financial records',
          'Process financial documentation',
          'Maintain contribution records'
        ]
      },
      {
        role: 'communications coordinator',
        responsibilities: [
          'Manage church announcements',
          'Coordinate communication channels',
          'Prepare church communication material'
        ]
      },
      {
        role: 'media coordinator',
        responsibilities: [
          'Coordinate media operations',
          'Manage media equipment',
          'Support services with audio and visual media'
        ]
      },
      {
        role: 'facilities coordinator',
        responsibilities: [
          'Coordinate church facilities',
          'Monitor facility requirements',
          'Assist with maintenance scheduling'
        ]
      }
    ]

    const staff = staffRoles[index - 20]

    const roleId = GenerateUid()

    return {
      status: {
        id: GenerateUid(),
        person_id: person.id,
        current_status: 'staff',
        prev_status: 'member',
        created_at: '2026-03-01T09:00:00',
        updated_at: '2026-03-01T09:00:00'
      },

      role: {
        id: roleId,
        person_id: person.id,
        role: staff.role,
        responsibilities: staff.responsibilities
      }
    }
  }

  // -----------------------------------------------------------------------
  // CHURCH LEADERS
  // -----------------------------------------------------------------------

  const leadershipRoles = [
    {
      role: 'pastor',
      responsibilities: [
        'Provide spiritual leadership',
        'Teach and preach',
        'Provide pastoral care',
        'Oversee church ministries'
      ]
    },
    {
      role: 'elder',
      responsibilities: [
        'Provide spiritual oversight',
        'Support pastoral leadership',
        'Counsel members',
        'Participate in leadership decisions'
      ]
    },
    {
      role: 'ministry leader',
      responsibilities: [
        'Lead an assigned ministry',
        'Coordinate ministry activities',
        'Equip ministry volunteers',
        'Report ministry progress'
      ]
    },
    {
      role: 'department leader',
      responsibilities: [
        'Oversee department operations',
        'Coordinate department members',
        'Plan department activities',
        'Manage department responsibilities'
      ]
    },
    {
      role: 'assistant pastor',
      responsibilities: [
        'Assist pastoral leadership',
        'Provide pastoral care',
        'Support preaching and teaching',
        'Assist with ministry oversight'
      ]
    }
  ]

  const leader = leadershipRoles[index - 25]

  const roleId = GenerateUid()

  return {
    status: {
      id: GenerateUid(),
      person_id: person.id,
      current_status: 'leader',
      prev_status: 'member',
      created_at: '2026-04-01T09:00:00',
      updated_at: '2026-04-01T09:00:00'
    },

    role: {
      id: roleId,
      person_id: person.id,
      role: leader.role,
      responsibilities: leader.responsibilities
    }
  }
})
