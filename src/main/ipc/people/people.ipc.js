import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm'

export class PeopleIpc {
  static CreateProfile = () => {
    electron.ipcMain.handle('people:create', (_event, payload) => {
      const personType = payload.type

      // --------------------------------------------------
      // Validate person category
      // --------------------------------------------------

      if (!['visitor', 'member'].includes(personType)) {
        return {
          success: false,
          message: 'Not a valid category',
          reason: 'CATEGORY NOT FOUND'
        }
      }

      try {
        const result = DatabaseOrm.Transaction(() => {
          // ==================================================
          // 1. PEOPLE
          // ==================================================

          const person = DatabaseOrm.Insert({
            table: 'people',
            data: {
              id: payload.id || crypto.randomUUID(),
              full_name: payload.fullName,
              dob: payload.dateOfBirth,
              anniversary_date: payload.anniversaryDate,
              gender: payload.gender,
              marital_status: payload.maritalStatus,
              stage_of_human_development: payload.stageOfHumanDevelopment,
              created_at: payload.createdAt || new Date().toISOString()
            }
          })

          const personId = person.id

          // ==================================================
          // 2. ADDRESS
          // ==================================================

          if (payload.address) {
            DatabaseOrm.Insert({
              table: 'people_address',
              data: {
                id: payload.address.id || crypto.randomUUID(),
                people_id: personId,
                country: payload.address.country,
                city: payload.address.city,
                province: payload.address.province,
                code: payload.address.code,
                area: payload.address.area,
                street_name: payload.address.streetName,
                house_type: payload.address.houseType,
                house_number: payload.address.houseNumber
              }
            })
          }

          // ==================================================
          // 3. FAMILY MEMBERS
          // ==================================================

          if (Array.isArray(payload.familyMembers)) {
            for (const familyMember of payload.familyMembers) {
              DatabaseOrm.Insert({
                table: 'people_family',
                data: {
                  id: familyMember.id || crypto.randomUUID(),
                  people_id: personId,
                  full_name: familyMember.familyMemberFullName,
                  relation: familyMember.relation,
                  dob: familyMember.dateOfBirth,
                  stage_of_human_development: familyMember.stageOfDevelopment,
                  gender: familyMember.gender
                }
              })
            }
          }

          // ==================================================
          // 4. PRIMARY CONTACT INFORMATION
          // ==================================================

          if (payload.contactInformation) {
            DatabaseOrm.Insert({
              table: 'people_contact_information',
              data: {
                id: crypto.randomUUID(),
                people_id: personId,
                prefered_contact: payload.contactInformation.preferedContactMethod,
                contact: payload.contactInformation.contactPhoneOrLink
              }
            })

            // ==================================================
            // 5. OTHER CONTACT INFORMATION
            // ==================================================

            if (Array.isArray(payload.contactInformation.other)) {
              for (const contact of payload.contactInformation.other) {
                DatabaseOrm.Insert({
                  table: 'people_extra_contact',
                  data: {
                    id: crypto.randomUUID(),
                    people_id: personId,
                    prefered_contact: contact.platform,
                    contact: contact.contact
                  }
                })
              }
            }
          }

          // ==================================================
          // 6. EDUCATION
          // ==================================================

          if (payload.additionalInformation?.school) {
            const school = payload.additionalInformation.school

            DatabaseOrm.Insert({
              table: 'people_education',
              data: {
                id: crypto.randomUUID(),
                people_id: personId,
                school_name: school.schoolName,
                education_level: school.educationLevel
              }
            })
          }

          // ==================================================
          // 7. OCCUPATION
          // ==================================================

          if (Array.isArray(payload.additionalInformation?.occupation)) {
            for (const occupation of payload.additionalInformation.occupation) {
              DatabaseOrm.Insert({
                table: 'people_job_occupation',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  occupation: occupation.occupation,
                  specialization: occupation.specialization,
                  employer: occupation.employer,
                  work_no: occupation.workPhone,
                  emergency_no: occupation.workEmergencyPhone
                }
              })
            }
          }

          // ==================================================
          // 8. HOBBIES
          // ==================================================

          if (Array.isArray(payload.additionalInformation?.hobbies)) {
            for (const hobby of payload.additionalInformation.hobbies) {
              DatabaseOrm.Insert({
                table: 'people_hobby',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  name: hobby.hobbyName,
                  type: hobby.hobbyType,
                  environmental_preferences: hobby.hobbyEnvironmentPreferences,
                  is_professional_skill: hobby.isProfessionalSkill ? 1 : 0
                }
              })
            }
          }

          // ==================================================
          // 9. INITIAL STATUS
          // ==================================================

          DatabaseOrm.Insert({
            table: 'people_status_category_history',
            data: {
              id: crypto.randomUUID(),
              person_id: personId,
              current_status: personType,
              prev_status: personType === 'visitor' ? 'none' : 'visitor',
              change_reason:
                personType === 'visitor'
                  ? 'new comer'
                  : payload.reason || 'Participation in church',
              created_at: new Date().toISOString()
            }
          })

          // Return the person that was actually created.
          return person
        })

        // ==================================================
        // SUCCESS
        // ==================================================

        return {
          success: true,
          message: 'Person profile created successfully',
          data: result
        }
      } catch (error) {
        // ==================================================
        // TRANSACTION FAILED
        // ==================================================

        return {
          success: false,
          message: 'Failed to create person profile',
          reason: error.message,
          error
        }
      }
    })
  }

  static UpdateProfile = () => {
    electron.ipcMain.handle('people:update', (_event, payload) => {
      if (!payload?.id) {
        return {
          success: false,
          message: 'Person ID is required',
          reason: 'PERSON ID NOT FOUND'
        }
      }

      try {
        const result = DatabaseOrm.Transaction(() => {
          const personId = payload.id

          // ==================================================
          // 1. UPDATE PERSON
          // ==================================================

          const person = DatabaseOrm.Update({
            table: 'people',

            condition: {
              id: personId
            },

            data: {
              full_name: payload.fullName,
              dob: payload.dateOfBirth,
              anniversary_date: payload.anniversaryDate,
              gender: payload.gender,
              marital_status: payload.maritalStatus,
              stage_of_human_development: payload.stageOfHumanDevelopment,
              updated_at: new Date().toISOString()
            }
          })

          if (!person) {
            throw new Error('Person not found.')
          }

          // ==================================================
          // 2. UPDATE ADDRESS
          // ==================================================

          if (payload.address) {
            const existingAddress = DatabaseOrm.SelectOne({
              sql: `
              SELECT *
              FROM people_address
              WHERE people_id = ?
            `,
              params: [personId]
            })

            if (existingAddress) {
              DatabaseOrm.Update({
                table: 'people_address',

                condition: {
                  id: existingAddress.id
                },

                data: {
                  country: payload.address.country,
                  city: payload.address.city,
                  province: payload.address.province,
                  code: payload.address.code,
                  area: payload.address.area,
                  street_name: payload.address.streetName,
                  house_type: payload.address.houseType,
                  house_number: payload.address.houseNumber
                }
              })
            } else {
              DatabaseOrm.Insert({
                table: 'people_address',

                data: {
                  id: payload.address.id || crypto.randomUUID(),
                  people_id: personId,
                  country: payload.address.country,
                  city: payload.address.city,
                  province: payload.address.province,
                  code: payload.address.code,
                  area: payload.address.area,
                  street_name: payload.address.streetName,
                  house_type: payload.address.houseType,
                  house_number: payload.address.houseNumber
                }
              })
            }
          }

          // ==================================================
          // 3. UPDATE PRIMARY CONTACT
          // ==================================================

          if (payload.contactInformation) {
            const existingContact = DatabaseOrm.SelectOne({
              sql: `
              SELECT *
              FROM people_contact_information
              WHERE people_id = ?
            `,
              params: [personId]
            })

            if (existingContact) {
              DatabaseOrm.Update({
                table: 'people_contact_information',

                condition: {
                  id: existingContact.id
                },

                data: {
                  prefered_contact: payload.contactInformation.preferedContactMethod,

                  contact: payload.contactInformation.contactPhoneOrLink
                }
              })
            } else {
              DatabaseOrm.Insert({
                table: 'people_contact_information',

                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  prefered_contact: payload.contactInformation.preferedContactMethod,
                  contact: payload.contactInformation.contactPhoneOrLink
                }
              })
            }
          }

          // ==================================================
          // 4. EDUCATION
          // ==================================================

          if (payload.additionalInformation?.school) {
            const school = payload.additionalInformation.school

            const existingEducation = DatabaseOrm.SelectOne({
              sql: `
              SELECT *
              FROM people_education
              WHERE people_id = ?
            `,
              params: [personId]
            })

            if (existingEducation) {
              DatabaseOrm.Update({
                table: 'people_education',

                condition: {
                  id: existingEducation.id
                },

                data: {
                  school_name: school.schoolName,
                  education_level: school.educationLevel
                }
              })
            } else {
              DatabaseOrm.Insert({
                table: 'people_education',

                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  school_name: school.schoolName,
                  education_level: school.educationLevel
                }
              })
            }
          }

          // ==================================================
          // 5. RETURN UPDATED PERSON
          // ==================================================

          return DatabaseOrm.SelectOne({
            sql: `
            SELECT *
            FROM people
            WHERE id = ?
          `,
            params: [personId]
          })
        })

        return {
          success: true,
          message: 'Person profile updated successfully',
          data: result
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update person profile',
          reason: error.message
        }
      }
    })
  }

  static DeleteProfile = () => {
    electron.ipcMain.handle('people:delete', (_event, id) => {
      if (!id) {
        return {
          success: false,
          message: 'Person ID is required',
          reason: 'PERSON ID NOT PROVIDED'
        }
      }

      try {
        const result = DatabaseOrm.Transaction(() => {
          const deleted = DatabaseOrm.Delete({
            table: 'people',
            condition: {
              id
            }
          })

          if (deleted.changes === 0) {
            throw new Error('Person not found.')
          }

          return deleted
        })

        return {
          success: true,
          message: 'Person deleted successfully',
          data: {
            changes: result.changes
          }
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to delete person',
          reason: error.message
        }
      }
    })
  }

  static FindProfileById = () => {
    electron.ipcMain.handle('people:find-by-id', (_event, id) => {
      if (!id) {
        return {
          success: false,
          message: 'Person ID is required',
          reason: 'PERSON ID NOT PROVIDED'
        }
      }

      try {
        console.time('query executed')
        const result = DatabaseOrm.Select({
          sql: `
            select 
              people.id as people_id,
              people.full_name,
              people.anniversary_date,
              people.dob,
              people.gender,
              people.stage_of_human_development as people_stage_of_human_development,
              people.marital_status,
              people.created_at,
              people_family.id as people_fm_id,
              people_family.full_name as people_fm_full_name,
              people_family.relation,
              people_family.gender as fm_gender,
              people_family.dob as fm_dob,
              people_family.stage_of_human_development as fm_stage_of_human_development,
              people_address.id as people_address_id,
              people_address.country,
              people_address.city,
              people_address.province,
              people_address.code,
              people_address.area,
              people_address.street_name,
              people_address.house_type,
              people_address.house_number,
              people_hobby.id as people_hobby_id,
              people_hobby.name as people_hobby_name,
              people_hobby.type,
              people_hobby.environmental_preferences,
              people_hobby.is_professional_skill,
              people_contact_information.id as people_contact_info_id,
              people_contact_information.prefered_contact,
              people_contact_information.contact,
              people_extra_contact.id as people_extra_contact_id,
              people_extra_contact.prefered_contact as extra_contact_prefered,
              people_extra_contact.contact as extra_contact_contact,
              people_education.id as people_education_id,
              people_education.school_name,
              people_education.education_level,
              people_job_occupation.id as people_occupation_id,
              people_job_occupation.occupation,
              people_job_occupation.specialization,
              people_job_occupation.employer,
              people_job_occupation.work_no,
              people_job_occupation.emergency_no
            from people
            left join people_family on people_family.people_id = people.id
            left join people_address on people_address.people_id = people.id
            left join people_hobby on people_hobby.people_id = people.id
            left join people_contact_information on people_contact_information.people_id = people.id
            left join people_extra_contact on people_extra_contact.people_id = people.id
            left join people_education on people_education.people_id = people.id
            left join people_job_occupation on people_job_occupation.people_id = people.id
            where people.id = ?
          `,
          params: [id]
        })
        console.timeEnd('query executed')

        const peopleMap = new Map()

        console.time('construct obj from query')
        for (const person of result) {
          let profile = peopleMap.get(person.people_id)

          if (!profile) {
            profile = {
              id: person.people_id,
              fullName: person.full_name,
              dateOfBirth: person.dob,
              anniversaryDate: person.anniversary_date,
              gender: person.gender,
              maritalStatus: person.marital_status,
              stageOfHumanDevelopment: person.people_stage_of_human_development,

              address: {
                id: person.people_address_id,
                country: person.country,
                city: person.city,
                province: person.province,
                code: person.code,
                area: person.area,
                streetName: person.street_name,
                houseType: person.house_type,
                houseNumber: person.house_number
              },

              family: [],

              contactInformation: {
                preferedContactMethod: person.prefered_contact ?? '',
                contactPhoneOrLink: person.contact ?? '',
                other: []
              },

              additionalInformation: {
                school: {
                  schoolName: person.school_name ?? '',
                  educationLevel: person.education_level ?? ''
                },

                occupation: [],

                hobbies: []
              },

              createdAt: person.created_at,
              updatedAt: ''
            }

            peopleMap.set(person.people_id, profile)
          }

          // -------------------------
          // Family
          // -------------------------

          if (person.people_fm_id) {
            const familyExists = profile.family.some(
              (familyMember) => familyMember.id === person.people_fm_id
            )

            if (!familyExists) {
              profile.family.push({
                id: person.people_fm_id,
                familyMemberFullName: person.people_fm_full_name,
                relation: person.relation,
                dateOfBirth: person.fm_dob,
                stageOfDevelopment: person.fm_stage_of_human_development,
                gender: person.fm_gender
              })
            }
          }

          // -------------------------
          // Extra contacts
          // -------------------------

          if (person.people_extra_contact_id) {
            // allows us not to have duplicate values but a single object
            const contactExists = profile.contactInformation.other.some(
              (contact) => contact.id === person.people_extra_contact_id
            )

            if (!contactExists) {
              profile.contactInformation.other.push({
                id: person.people_extra_contact_id,
                platform: person.extra_contact_prefered,
                contact: person.extra_contact_contact
              })
            }
          }

          // -------------------------
          // Occupation
          // -------------------------

          if (person.people_occupation_id) {
            const occupationExists = profile.additionalInformation.occupation.some(
              (occupation) => occupation.id === person.people_occupation_id
            )

            if (!occupationExists) {
              profile.additionalInformation.occupation.push({
                id: person.people_occupation_id,
                occupation: person.occupation,
                specialization: person.specialization,
                employer: person.employer,
                workPhone: person.work_no,
                workEmergencyPhone: person.emergency_no
              })
            }
          }

          // -------------------------
          // Hobbies
          // -------------------------

          if (person.people_hobby_id) {
            const hobbyExists = profile.additionalInformation.hobbies.some(
              (hobby) => hobby.id === person.people_hobby_id
            )

            if (!hobbyExists) {
              profile.additionalInformation.hobbies.push({
                id: person.people_hobby_id,
                hobbyName: person.people_hobby_name,
                hobbyType: person.type,
                hobbyEnvironmentPreferences: person.environmental_preferences,
                isProfessionalSkill: Boolean(person.is_professional_skill)
              })
            }
          }
        }
        console.timeEnd('construct obj from query')

        return peopleMap.get(id)
      } catch (error) {
        return {
          success: false,
          message: 'Failed to retrieve person profile',
          reason: error.message
        }
      }
    })
  }

  static GetAllProfiles = () => {
    electron.ipcMain.handle('people:get-all', () => {
      try {
        const queryPeopleTable = `
          select 
            people.id as people_id,
            people.full_name,
            people.dob,
            people.anniversary_date,
            people.stage_of_human_development,
            people.gender,
            people.marital_status,
            people.created_at,
            people_status_category_history.id as people_category_id,
            people_status_category_history.current_status as people_category_current_status,
            people_status_category_history.created_at as people_category_created_at
          from people
          left join people_status_category_history on people_status_category_history.person_id = people.id
        `

        const peopleResult = DatabaseOrm.Select({
          sql: queryPeopleTable
        })

        const peopleMap = new Map()

        for (const people of peopleResult) {
          if (!peopleMap.has(people.people_id)) {
            peopleMap.set(people.people_id, {
              id: people.people_id,
              fullName: people.full_name,
              gender: people.gender,
              maritalStatus: people.marital_status,
              status: people.people_category_current_status,
              createdAt: people.created_at
            })
          }
        }

        const result = [...peopleMap.values()]

        return result
      } catch (error) {
        return {
          success: false,
          message: 'failed to retrieve people from table',
          error: error.message
        }
      }
    })
  }

  static RegisterIpcs = () => {
    this.CreateProfile()
    this.DeleteProfile()
    this.FindProfileById()
    this.GetAllProfiles()
    this.UpdateProfile()

    return {
      success: true,
      message: 'People IPC registered'
    }
  }
}
