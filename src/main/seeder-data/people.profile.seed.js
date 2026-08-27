import { GenerateUid } from '../../util/uid.generator'

export const peopleSeedDummyData = [
  {
    id: GenerateUid(),
    fullName: 'Person 1',
    dateOfBirth: '1981-02-11',
    anniversaryDate: '2011-02-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 1',
      streetName: 'Street 1',
      houseNumber: '11',
      houseType: 'House',
      code: '9301'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 1',
        relation: 'Spouse',
        dateOfBirth: '1981-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Female'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001001',
      other: [{ platform: 'Email', contact: 'person1@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 1',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 1',
          specialization: 'Specialization 1',
          employer: 'Company 1',
          workPhone: '0514000001',
          workEmergencyPhone: '0515000001'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 2',
    dateOfBirth: '1982-03-12',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 2',
      streetName: 'Street 2',
      houseNumber: '12',
      houseType: 'House',
      code: '9302'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001002',
      other: [{ platform: 'Email', contact: 'person2@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 2',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 2',
          specialization: 'Specialization 2',
          employer: 'Company 2',
          workPhone: '0514000002',
          workEmergencyPhone: '0515000002'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 3',
    dateOfBirth: '1983-04-13',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 3',
      streetName: 'Street 3',
      houseNumber: '13',
      houseType: 'House',
      code: '9303'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001003',
      other: [{ platform: 'Email', contact: 'person3@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 3',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 3',
          specialization: 'Specialization 3',
          employer: 'Company 3',
          workPhone: '0514000003',
          workEmergencyPhone: '0515000003'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 4',
    dateOfBirth: '1984-05-14',
    anniversaryDate: '2014-05-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 4',
      streetName: 'Street 4',
      houseNumber: '14',
      houseType: 'House',
      code: '9304'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 4',
        relation: 'Spouse',
        dateOfBirth: '1984-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Male'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001004',
      other: [{ platform: 'Email', contact: 'person4@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 4',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 4',
          specialization: 'Specialization 4',
          employer: 'Company 4',
          workPhone: '0514000004',
          workEmergencyPhone: '0515000004'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 5',
    dateOfBirth: '1985-06-15',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 5',
      streetName: 'Street 5',
      houseNumber: '15',
      houseType: 'House',
      code: '9305'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001005',
      other: [{ platform: 'Email', contact: 'person5@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 5',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 5',
          specialization: 'Specialization 5',
          employer: 'Company 5',
          workPhone: '0514000005',
          workEmergencyPhone: '0515000005'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 6',
    dateOfBirth: '1986-07-16',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 6',
      streetName: 'Street 6',
      houseNumber: '16',
      houseType: 'House',
      code: '9306'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001006',
      other: [{ platform: 'Email', contact: 'person6@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 6',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 6',
          specialization: 'Specialization 6',
          employer: 'Company 6',
          workPhone: '0514000006',
          workEmergencyPhone: '0515000006'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 7',
    dateOfBirth: '1987-08-17',
    anniversaryDate: '2017-08-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 7',
      streetName: 'Street 7',
      houseNumber: '17',
      houseType: 'House',
      code: '9307'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 7',
        relation: 'Spouse',
        dateOfBirth: '1987-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Female'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001007',
      other: [{ platform: 'Email', contact: 'person7@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 7',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 7',
          specialization: 'Specialization 7',
          employer: 'Company 7',
          workPhone: '0514000007',
          workEmergencyPhone: '0515000007'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 8',
    dateOfBirth: '1988-09-18',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 8',
      streetName: 'Street 8',
      houseNumber: '18',
      houseType: 'House',
      code: '9308'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001008',
      other: [{ platform: 'Email', contact: 'person8@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 8',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 8',
          specialization: 'Specialization 8',
          employer: 'Company 8',
          workPhone: '0514000008',
          workEmergencyPhone: '0515000008'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 9',
    dateOfBirth: '1989-01-10',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 9',
      streetName: 'Street 9',
      houseNumber: '19',
      houseType: 'House',
      code: '9309'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001009',
      other: [{ platform: 'Email', contact: 'person9@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 9',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 9',
          specialization: 'Specialization 9',
          employer: 'Company 9',
          workPhone: '0514000009',
          workEmergencyPhone: '0515000009'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 10',
    dateOfBirth: '1980-02-11',
    anniversaryDate: '2010-02-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 10',
      streetName: 'Street 10',
      houseNumber: '20',
      houseType: 'House',
      code: '9300'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 10',
        relation: 'Spouse',
        dateOfBirth: '1980-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Male'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001010',
      other: [{ platform: 'Email', contact: 'person10@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 10',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 10',
          specialization: 'Specialization 10',
          employer: 'Company 10',
          workPhone: '0514000010',
          workEmergencyPhone: '0515000010'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 11',
    dateOfBirth: '1981-03-12',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 11',
      streetName: 'Street 11',
      houseNumber: '21',
      houseType: 'House',
      code: '9301'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001011',
      other: [{ platform: 'Email', contact: 'person11@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 11',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 11',
          specialization: 'Specialization 11',
          employer: 'Company 11',
          workPhone: '0514000011',
          workEmergencyPhone: '0515000011'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 12',
    dateOfBirth: '1982-04-13',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 12',
      streetName: 'Street 12',
      houseNumber: '22',
      houseType: 'House',
      code: '9302'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001012',
      other: [{ platform: 'Email', contact: 'person12@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 12',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 12',
          specialization: 'Specialization 12',
          employer: 'Company 12',
          workPhone: '0514000012',
          workEmergencyPhone: '0515000012'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 13',
    dateOfBirth: '1983-05-14',
    anniversaryDate: '2013-05-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 13',
      streetName: 'Street 13',
      houseNumber: '23',
      houseType: 'House',
      code: '9303'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 13',
        relation: 'Spouse',
        dateOfBirth: '1983-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Female'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001013',
      other: [{ platform: 'Email', contact: 'person13@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 13',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 13',
          specialization: 'Specialization 13',
          employer: 'Company 13',
          workPhone: '0514000013',
          workEmergencyPhone: '0515000013'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 14',
    dateOfBirth: '1984-06-15',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 14',
      streetName: 'Street 14',
      houseNumber: '24',
      houseType: 'House',
      code: '9304'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001014',
      other: [{ platform: 'Email', contact: 'person14@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 14',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 14',
          specialization: 'Specialization 14',
          employer: 'Company 14',
          workPhone: '0514000014',
          workEmergencyPhone: '0515000014'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 15',
    dateOfBirth: '1985-07-16',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 15',
      streetName: 'Street 15',
      houseNumber: '25',
      houseType: 'House',
      code: '9305'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001015',
      other: [{ platform: 'Email', contact: 'person15@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 15',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 15',
          specialization: 'Specialization 15',
          employer: 'Company 15',
          workPhone: '0514000015',
          workEmergencyPhone: '0515000015'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 16',
    dateOfBirth: '1986-08-17',
    anniversaryDate: '2016-08-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 16',
      streetName: 'Street 16',
      houseNumber: '26',
      houseType: 'House',
      code: '9306'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 16',
        relation: 'Spouse',
        dateOfBirth: '1986-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Male'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001016',
      other: [{ platform: 'Email', contact: 'person16@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 16',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 16',
          specialization: 'Specialization 16',
          employer: 'Company 16',
          workPhone: '0514000016',
          workEmergencyPhone: '0515000016'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 17',
    dateOfBirth: '1987-09-18',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 17',
      streetName: 'Street 17',
      houseNumber: '27',
      houseType: 'House',
      code: '9307'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001017',
      other: [{ platform: 'Email', contact: 'person17@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 17',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 17',
          specialization: 'Specialization 17',
          employer: 'Company 17',
          workPhone: '0514000017',
          workEmergencyPhone: '0515000017'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 18',
    dateOfBirth: '1988-01-10',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 18',
      streetName: 'Street 18',
      houseNumber: '28',
      houseType: 'House',
      code: '9308'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001018',
      other: [{ platform: 'Email', contact: 'person18@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 18',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 18',
          specialization: 'Specialization 18',
          employer: 'Company 18',
          workPhone: '0514000018',
          workEmergencyPhone: '0515000018'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 19',
    dateOfBirth: '1989-02-11',
    anniversaryDate: '2019-02-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 19',
      streetName: 'Street 19',
      houseNumber: '29',
      houseType: 'House',
      code: '9309'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 19',
        relation: 'Spouse',
        dateOfBirth: '1989-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Female'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001019',
      other: [{ platform: 'Email', contact: 'person19@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 19',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 19',
          specialization: 'Specialization 19',
          employer: 'Company 19',
          workPhone: '0514000019',
          workEmergencyPhone: '0515000019'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 20',
    dateOfBirth: '1980-03-12',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 20',
      streetName: 'Street 20',
      houseNumber: '30',
      houseType: 'House',
      code: '9300'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001020',
      other: [{ platform: 'Email', contact: 'person20@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 20',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 20',
          specialization: 'Specialization 20',
          employer: 'Company 20',
          workPhone: '0514000020',
          workEmergencyPhone: '0515000020'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 21',
    dateOfBirth: '1981-04-13',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 21',
      streetName: 'Street 21',
      houseNumber: '31',
      houseType: 'House',
      code: '9301'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001021',
      other: [{ platform: 'Email', contact: 'person21@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 21',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 21',
          specialization: 'Specialization 21',
          employer: 'Company 21',
          workPhone: '0514000021',
          workEmergencyPhone: '0515000021'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 22',
    dateOfBirth: '1982-05-14',
    anniversaryDate: '2012-05-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 22',
      streetName: 'Street 22',
      houseNumber: '32',
      houseType: 'House',
      code: '9302'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 22',
        relation: 'Spouse',
        dateOfBirth: '1982-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Male'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001022',
      other: [{ platform: 'Email', contact: 'person22@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 22',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 22',
          specialization: 'Specialization 22',
          employer: 'Company 22',
          workPhone: '0514000022',
          workEmergencyPhone: '0515000022'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 23',
    dateOfBirth: '1983-06-15',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 23',
      streetName: 'Street 23',
      houseNumber: '33',
      houseType: 'House',
      code: '9303'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001023',
      other: [{ platform: 'Email', contact: 'person23@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 23',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 23',
          specialization: 'Specialization 23',
          employer: 'Company 23',
          workPhone: '0514000023',
          workEmergencyPhone: '0515000023'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 24',
    dateOfBirth: '1984-07-16',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 24',
      streetName: 'Street 24',
      houseNumber: '34',
      houseType: 'House',
      code: '9304'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001024',
      other: [{ platform: 'Email', contact: 'person24@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 24',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 24',
          specialization: 'Specialization 24',
          employer: 'Company 24',
          workPhone: '0514000024',
          workEmergencyPhone: '0515000024'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 25',
    dateOfBirth: '1985-08-17',
    anniversaryDate: '2015-08-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 25',
      streetName: 'Street 25',
      houseNumber: '35',
      houseType: 'House',
      code: '9305'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 25',
        relation: 'Spouse',
        dateOfBirth: '1985-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Female'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001025',
      other: [{ platform: 'Email', contact: 'person25@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 25',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 25',
          specialization: 'Specialization 25',
          employer: 'Company 25',
          workPhone: '0514000025',
          workEmergencyPhone: '0515000025'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 26',
    dateOfBirth: '1986-09-18',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 26',
      streetName: 'Street 26',
      houseNumber: '36',
      houseType: 'House',
      code: '9306'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001026',
      other: [{ platform: 'Email', contact: 'person26@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 26',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 26',
          specialization: 'Specialization 26',
          employer: 'Company 26',
          workPhone: '0514000026',
          workEmergencyPhone: '0515000026'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 27',
    dateOfBirth: '1987-01-10',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 27',
      streetName: 'Street 27',
      houseNumber: '37',
      houseType: 'House',
      code: '9307'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001027',
      other: [{ platform: 'Email', contact: 'person27@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 27',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 27',
          specialization: 'Specialization 27',
          employer: 'Company 27',
          workPhone: '0514000027',
          workEmergencyPhone: '0515000027'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 28',
    dateOfBirth: '1988-02-11',
    anniversaryDate: '2018-02-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 28',
      streetName: 'Street 28',
      houseNumber: '38',
      houseType: 'House',
      code: '9308'
    },
    familyMembers: [
      {
        id: GenerateUid(),
        familyMemberFullName: 'Spouse 28',
        relation: 'Spouse',
        dateOfBirth: '1988-05-10',
        stageOfDevelopment: 'Adult',
        gender: 'Male'
      }
    ],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001028',
      other: [{ platform: 'Email', contact: 'person28@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 28',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: true
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 28',
          specialization: 'Specialization 28',
          employer: 'Company 28',
          workPhone: '0514000028',
          workEmergencyPhone: '0515000028'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 29',
    dateOfBirth: '1989-03-12',
    anniversaryDate: '',
    gender: 'Male',
    maritalStatus: 'Divorced',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 29',
      streetName: 'Street 29',
      houseNumber: '39',
      houseType: 'House',
      code: '9309'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001029',
      other: [{ platform: 'Email', contact: 'person29@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 29',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 29',
          specialization: 'Specialization 29',
          employer: 'Company 29',
          workPhone: '0514000029',
          workEmergencyPhone: '0515000029'
        }
      ]
    }
  },

  {
    id: GenerateUid(),
    fullName: 'Person 30',
    dateOfBirth: '1980-04-13',
    anniversaryDate: '',
    gender: 'Female',
    maritalStatus: 'Single',
    stageOfHumanDevelopment: 'Adult',
    address: {
      id: GenerateUid(),
      country: 'South Africa',
      province: 'Free State',
      city: 'Bloemfontein',
      area: 'Area 30',
      streetName: 'Street 30',
      houseNumber: '40',
      houseType: 'House',
      code: '9300'
    },
    familyMembers: [],
    contactInformation: {
      preferedContactMethod: 'Phone',
      contactPhoneOrLink: '0820001030',
      other: [{ platform: 'Email', contact: 'person30@example.com' }]
    },
    additionalInformation: {
      hobbies: [
        {
          hobbyName: 'Hobby 30',
          hobbyType: 'General',
          hobbyEnvironmentPreferences: 'Indoor',
          isProfessionalSkill: false
        }
      ],
      occupation: [
        {
          occupation: 'Occupation 30',
          specialization: 'Specialization 30',
          employer: 'Company 30',
          workPhone: '0514000030',
          workEmergencyPhone: '0515000030'
        }
      ]
    }
  }
]
