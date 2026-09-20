export const peopleProfileSchema = {
  table: 'people',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    full_name: { type: 'TEXT' },
    dob: { type: 'TEXT' },
    anniversary_date: { type: 'TEXT' },
    gender: { type: 'TEXT' },
    marital_status: { type: 'TEXT' },
    stage_of_human_development: { type: 'TEXT' },
    created_at: { type: 'TEXT', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'TEXT' }
  }
}

export const peopleFamilySchema = {
  table: 'people_family',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    full_name: { type: 'TEXT' },
    relation: { type: 'TEXT' },
    dob: { type: 'TEXT' },
    stage_of_human_development: { type: 'TEXT' },
    gender: { type: 'TEXT' }
  }
}

export const peopleAddressSchema = {
  table: 'people_address',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    country: { type: 'TEXT' },
    city: { type: 'TEXT' },
    province: { type: 'TEXT' },
    code: { type: 'TEXT' },
    area: { type: 'TEXT' },
    street_name: { type: 'TEXT' },
    house_type: { type: 'TEXT' },
    house_number: { type: 'TEXT' }
  }
}

export const peopleHobbySchema = {
  table: 'people_hobby',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    name: { type: 'TEXT' },
    type: { type: 'TEXT' },
    environmental_preferences: { type: 'TEXT' },
    is_professional_skill: { type: 'INTEGER' }
  }
}

export const peopleContactSchema = {
  table: 'people_contact_information',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    prefered_contact: { type: 'TEXT' },
    contact: { type: 'TEXT' }
  }
}

export const peopleExtraContactSchema = {
  table: 'people_extra_contact',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    prefered_contact: { type: 'TEXT' },
    contact: { type: 'TEXT' }
  }
}

export const peopleEducationSchema = {
  table: 'people_education',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    school_name: { type: 'TEXT' },
    education_level: { type: 'TEXT' }
  }
}

export const peopleJobSchema = {
  table: 'people_job_occupation',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    occupation: { type: 'TEXT' },
    specialization: { type: 'TEXT' },
    employer: { type: 'TEXT' },
    work_no: { type: 'TEXT' },
    emergency_no: { type: 'TEXT' }
  }
}

export const peopleSpiritualJourney = {
  table: 'people_spiritual_journey',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    prev_spiritual_status: { type: 'text' },
    current_spiritual_status: { type: 'text', default: 'none' },
    change_reason: { type: 'text' },
    created_at: { type: 'text', default: 'current_timestamp' },
    update_at: { type: 'text' }
  }
}

export const peopleFirstImpressions = {
  table: 'people_first_impressions',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    impressions: { type: 'TEXT' }
  }
}

export const peopleExpectations = {
  table: 'people_expectations',
  schema: {
    id: { type: 'TEXT', primaryKey: true, notNull: true },
    people_id: {
      type: 'TEXT',
      references: { table: 'people', column: 'id', onDelete: 'CASCADE' }
    },
    expectation: { type: 'TEXT' }
  }
}
