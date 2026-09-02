export const organizationalRoles = {
  table: 'people_organizational_roles',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    person_id: { type: 'TEXT', references: { table: 'people', column: 'id', onDelete: 'CASCADE' } },
    role: { type: 'TEXT' },
    responsibilities: { type: 'TEXT' }
  }
}

export const organizationalRolesResponsibility = {
  table: 'people_organizational_roles_responsibilities',
  schema: {
    id: { type: 'TEXT', notNull: true, primaryKey: true },
    role_id: {
      type: 'TEXT',
      references: { table: 'people_organizational_roles', column: 'id', onDelete: 'CASCADE' }
    },
    responsibilities: { type: 'TEXT' }
  }
}
