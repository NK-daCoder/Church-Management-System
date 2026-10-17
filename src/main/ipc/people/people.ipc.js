import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm'

export class PeopleIpc {
  static CreateProfile = () => {
    electron.ipcMain.handle('people:create', (_event, payload) => {
      const personType = payload.type
      console.log(payload)

      if (!['visitor', 'member'].includes(personType)) {
        return {
          success: false,
          message: 'Not a valid category',
          reason: 'CATEGORY NOT FOUND'
        }
      }

      try {
        const result = DatabaseOrm.Transaction(() => {
          const person = DatabaseOrm.Insert({
            table: 'people',
            data: {
              id: crypto.randomUUID(),
              full_name: payload?.fullName,
              dob: payload?.dateOfBirth,
              anniversary_date: payload?.anniversaryDate,
              gender: payload?.gender,
              marital_status: payload?.maritalStatus,
              stage_of_human_development: payload?.stageOfHumanDevelopment,
              created_at: payload?.createdAt || new Date().toISOString()
            }
          })

          const personId = person.id

          if (payload?.address) {
            DatabaseOrm.Insert({
              table: 'people_address',
              data: {
                id: crypto.randomUUID(),
                people_id: personId,
                country: payload?.address?.country,
                city: payload?.address?.city,
                province: payload?.address?.province,
                code: payload?.address?.code,
                area: payload?.address?.area,
                street_name: payload?.address?.streetName,
                house_type: payload?.address?.houseType,
                house_number: payload?.address?.houseNumber
              }
            })
          }

          if (Array.isArray(payload?.family) && payload?.family.length > 0) {
            for (const familyMember of payload.family) {
              DatabaseOrm.Insert({
                table: 'people_family',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  full_name: familyMember?.familyMemberFullName,
                  relation: familyMember?.relation,
                  dob: familyMember?.dateOfBirth,
                  stage_of_human_development: familyMember?.stageOfDevelopment,
                  gender: familyMember?.gender
                }
              })
            }
          }

          if (payload.contactInformation) {
            DatabaseOrm.Insert({
              table: 'people_contact_information',
              data: {
                id: crypto.randomUUID(),
                people_id: personId,
                prefered_contact: payload?.contactInformation?.preferedContactMethod,
                contact: payload?.contactInformation?.contactPhoneOrLink
              }
            })

            if (Array.isArray(payload?.contactInformation.other ?? [])) {
              for (const contact of payload?.contactInformation.other ?? []) {
                DatabaseOrm.Insert({
                  table: 'people_extra_contact',
                  data: {
                    id: crypto.randomUUID(),
                    people_id: personId,
                    prefered_contact: contact?.platform,
                    contact: contact?.contact
                  }
                })
              }
            }
          }

          if (payload?.additionalInformation?.school) {
            const school = payload?.additionalInformation.school

            DatabaseOrm.Insert({
              table: 'people_education',
              data: {
                id: crypto.randomUUID(),
                people_id: personId,
                school_name: school?.schoolName,
                education_level: school?.educationLevel
              }
            })
          }

          if (Array.isArray(payload?.additionalInformation?.occupation)) {
            for (const occupation of payload?.additionalInformation.occupation ?? []) {
              DatabaseOrm.Insert({
                table: 'people_job_occupation',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  occupation: occupation?.occupation,
                  specialization: occupation?.specialization,
                  employer: occupation?.employer,
                  work_no: occupation?.workPhone,
                  emergency_no: occupation?.workEmergencyPhone
                }
              })
            }
          }

          if (Array.isArray(payload?.additionalInformation?.hobbies)) {
            for (const hobby of payload?.additionalInformation?.hobbies ?? []) {
              DatabaseOrm.Insert({
                table: 'people_hobby',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  name: hobby?.hobbyName,
                  type: hobby?.hobbyType,
                  environmental_preferences: hobby?.hobbyEnvironmentPreferences,
                  is_professional_skill: hobby?.isProfessionalSkill ? 1 : 0
                }
              })
            }
          }

          if (Array.isArray(payload?.expectation) && payload?.expectation.length) {
            for (const exp of payload?.expectation ?? []) {
              DatabaseOrm.Insert({
                table: 'people_expectations',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  expectation: exp
                }
              })
            }
          }

          if (Array.isArray(payload?.impressions) && payload?.impressions) {
            for (const impression of payload?.impressions ?? []) {
              DatabaseOrm.Insert({
                table: 'people_first_impressions',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  impressions: impression
                }
              })
            }
          }

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

        return {
          success: true,
          message: 'Person profile created successfully',
          data: result
        }
      } catch (error) {
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

          // --------------------------------------------------
          // 1. VERIFY PERSON EXISTS
          // --------------------------------------------------
          const existingPerson = DatabaseOrm.SelectOne({
            sql: `SELECT * FROM people WHERE id = ?`,
            params: [personId]
          })

          if (!existingPerson) {
            throw new Error('Person not found.')
          }

          // Only update fields supplied by the caller.
          const personFields = {
            full_name: payload.fullName,
            dob: payload.dateOfBirth,
            anniversary_date: payload.anniversaryDate,
            gender: payload.gender,
            marital_status: payload.maritalStatus,
            stage_of_human_development: payload.stageOfHumanDevelopment,
            updated_at: new Date().toISOString()
          }

          const personData = Object.fromEntries(
            Object.entries(personFields).filter(
              ([key, value]) => value !== undefined && key !== 'updated_at'
            )
          )

          personData.updated_at = new Date().toISOString()

          if (Object.keys(personData).length > 0) {
            DatabaseOrm.Update({
              table: 'people',
              condition: { id: personId },
              data: personData
            })
          }

          // --------------------------------------------------
          // 2. ADDRESS: UPDATE OR INSERT
          // --------------------------------------------------
          if (payload.address !== undefined && payload.address !== null) {
            const address = payload.address

            const existingAddress = DatabaseOrm.SelectOne({
              sql: `
              SELECT * FROM people_address
              WHERE people_id = ?
            `,
              params: [personId]
            })

            const addressData = {
              country: address.country,
              city: address.city,
              province: address.province,
              code: address.code,
              area: address.area,
              street_name: address.streetName,
              house_type: address.houseType,
              house_number: address.houseNumber
            }

            if (existingAddress) {
              DatabaseOrm.Update({
                table: 'people_address',
                condition: { id: existingAddress.id },
                data: Object.fromEntries(
                  Object.entries(addressData).filter(([, value]) => value !== undefined)
                )
              })
            } else {
              DatabaseOrm.Insert({
                table: 'people_address',
                data: {
                  id: address.id || crypto.randomUUID(),
                  people_id: personId,
                  ...Object.fromEntries(
                    Object.entries(addressData).filter(([, value]) => value !== undefined)
                  )
                }
              })
            }
          }

          // --------------------------------------------------
          // 3. PRIMARY CONTACT
          // --------------------------------------------------
          if (payload.contactInformation !== undefined && payload.contactInformation !== null) {
            const contact = payload.contactInformation

            const existingContact = DatabaseOrm.SelectOne({
              sql: `
              SELECT * FROM people_contact_information
              WHERE people_id = ?
            `,
              params: [personId]
            })

            const contactData = {
              prefered_contact: contact.preferedContactMethod,
              contact: contact.contactPhoneOrLink
            }

            const definedContactData = Object.fromEntries(
              Object.entries(contactData).filter(([, value]) => value !== undefined)
            )

            if (existingContact) {
              if (Object.keys(definedContactData).length > 0) {
                DatabaseOrm.Update({
                  table: 'people_contact_information',
                  condition: { id: existingContact.id },
                  data: definedContactData
                })
              }
            } else {
              DatabaseOrm.Insert({
                table: 'people_contact_information',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  ...definedContactData
                }
              })
            }

            // Extra contacts: synchronize only when supplied.
            if (Array.isArray(contact.other)) {
              DatabaseOrm.Delete({
                table: 'people_extra_contact',
                condition: { people_id: personId }
              })

              for (const extra of contact.other) {
                DatabaseOrm.Insert({
                  table: 'people_extra_contact',
                  data: {
                    id: extra.id || crypto.randomUUID(),
                    people_id: personId,
                    prefered_contact: extra.platform,
                    contact: extra.contact
                  }
                })
              }
            }
          }

          // --------------------------------------------------
          // 4. EDUCATION
          // --------------------------------------------------
          if (payload.additionalInformation?.school !== undefined) {
            const school = payload.additionalInformation.school

            const existingEducation = DatabaseOrm.SelectOne({
              sql: `
              SELECT * FROM people_education
              WHERE people_id = ?
            `,
              params: [personId]
            })

            if (school === null) {
              if (existingEducation) {
                DatabaseOrm.Delete({
                  table: 'people_education',
                  condition: { id: existingEducation.id }
                })
              }
            } else {
              const educationData = {
                school_name: school.schoolName,
                education_level: school.educationLevel
              }

              if (existingEducation) {
                DatabaseOrm.Update({
                  table: 'people_education',
                  condition: { id: existingEducation.id },
                  data: Object.fromEntries(
                    Object.entries(educationData).filter(([, value]) => value !== undefined)
                  )
                })
              } else {
                DatabaseOrm.Insert({
                  table: 'people_education',
                  data: {
                    id: crypto.randomUUID(),
                    people_id: personId,
                    ...Object.fromEntries(
                      Object.entries(educationData).filter(([, value]) => value !== undefined)
                    )
                  }
                })
              }
            }
          }

          // --------------------------------------------------
          // 5. OCCUPATIONS
          // --------------------------------------------------
          if (Array.isArray(payload.additionalInformation?.occupation)) {
            const occupations = payload.additionalInformation.occupation

            const existingOccupations = DatabaseOrm.Select({
              sql: `
              SELECT * FROM people_job_occupation
              WHERE people_id = ?
            `,
              params: [personId]
            })

            const incomingIds = new Set(
              occupations.filter((item) => item.id).map((item) => item.id)
            )

            // Remove records omitted from the submitted collection.
            for (const existing of existingOccupations) {
              if (!incomingIds.has(existing.id)) {
                DatabaseOrm.Delete({
                  table: 'people_job_occupation',
                  condition: {
                    id: existing.id,
                    people_id: personId
                  }
                })
              }
            }

            for (const occupation of occupations) {
              const occupationData = {
                occupation: occupation.occupation,
                specialization: occupation.specialization,
                employer: occupation.employer,
                work_no: occupation.workPhone,
                emergency_no: occupation.workEmergencyPhone
              }

              if (occupation.id) {
                // Verify ownership before updating an existing row.
                const ownedOccupation = existingOccupations.find(
                  (item) => item.id === occupation.id
                )

                if (!ownedOccupation) {
                  throw new Error(`Occupation ${occupation.id} does not belong to this person.`)
                }

                DatabaseOrm.Update({
                  table: 'people_job_occupation',
                  condition: {
                    id: occupation.id,
                    people_id: personId
                  },
                  data: Object.fromEntries(
                    Object.entries(occupationData).filter(([, value]) => value !== undefined)
                  )
                })
              } else {
                DatabaseOrm.Insert({
                  table: 'people_job_occupation',
                  data: {
                    id: crypto.randomUUID(),
                    people_id: personId,
                    ...Object.fromEntries(
                      Object.entries(occupationData).filter(([, value]) => value !== undefined)
                    )
                  }
                })
              }
            }
          }

          // --------------------------------------------------
          // 6. FAMILY MEMBERS
          // --------------------------------------------------
          if (Array.isArray(payload.family)) {
            DatabaseOrm.Delete({
              table: 'people_family',
              condition: { people_id: personId }
            })

            for (const familyMember of payload.family) {
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

          // --------------------------------------------------
          // 7. HOBBIES
          // --------------------------------------------------
          if (Array.isArray(payload.additionalInformation?.hobbies)) {
            DatabaseOrm.Delete({
              table: 'people_hobby',
              condition: { people_id: personId }
            })

            for (const hobby of payload.additionalInformation.hobbies) {
              DatabaseOrm.Insert({
                table: 'people_hobby',
                data: {
                  id: hobby.id || crypto.randomUUID(),
                  people_id: personId,
                  name: hobby.hobbyName,
                  type: hobby.hobbyType,
                  environmental_preferences: hobby.hobbyEnvironmentPreferences,
                  is_professional_skill: hobby.isProfessionalSkill ? 1 : 0
                }
              })
            }
          }

          // --------------------------------------------------
          // 8. EXPECTATIONS
          // Support both the current nested structure and the
          // legacy top-level payload structure.
          // --------------------------------------------------
          const expectations = payload.additionalInformation?.expectation ?? payload.expectation

          if (Array.isArray(expectations)) {
            DatabaseOrm.Delete({
              table: 'people_expectations',
              condition: { people_id: personId }
            })

            for (const expectation of expectations) {
              DatabaseOrm.Insert({
                table: 'people_expectations',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  expectation
                }
              })
            }
          }

          // --------------------------------------------------
          // 9. FIRST IMPRESSIONS
          // --------------------------------------------------
          const impressions = payload.additionalInformation?.impressions ?? payload.impressions

          if (Array.isArray(impressions)) {
            DatabaseOrm.Delete({
              table: 'people_first_impressions',
              condition: { people_id: personId }
            })

            for (const impression of impressions) {
              DatabaseOrm.Insert({
                table: 'people_first_impressions',
                data: {
                  id: crypto.randomUUID(),
                  people_id: personId,
                  impressions: impression
                }
              })
            }
          }

          // --------------------------------------------------
          // 10. RETURN THE COMPLETE UPDATED PROFILE
          // --------------------------------------------------
          const person = DatabaseOrm.SelectOne({
            sql: `SELECT * FROM people WHERE id = ?`,
            params: [personId]
          })

          const address = DatabaseOrm.SelectOne({
            sql: `
            SELECT * FROM people_address
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const primaryContact = DatabaseOrm.SelectOne({
            sql: `
            SELECT * FROM people_contact_information
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const extraContacts = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_extra_contact
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const family = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_family
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const education = DatabaseOrm.SelectOne({
            sql: `
            SELECT * FROM people_education
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const occupations = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_job_occupation
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const hobbies = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_hobby
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const expectationsResult = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_expectations
            WHERE people_id = ?
          `,
            params: [personId]
          })

          const impressionsResult = DatabaseOrm.Select({
            sql: `
            SELECT * FROM people_first_impressions
            WHERE people_id = ?
          `,
            params: [personId]
          })

          return {
            id: person.id,
            fullName: person.full_name,
            dateOfBirth: person.dob,
            anniversaryDate: person.anniversary_date,
            gender: person.gender,
            maritalStatus: person.marital_status,
            stageOfHumanDevelopment: person.stage_of_human_development,
            createdAt: person.created_at,
            updatedAt: person.updated_at,

            address: address
              ? {
                  id: address.id,
                  country: address.country,
                  city: address.city,
                  province: address.province,
                  code: address.code,
                  area: address.area,
                  streetName: address.street_name,
                  houseType: address.house_type,
                  houseNumber: address.house_number
                }
              : null,

            contactInformation: {
              id: primaryContact?.id ?? null,
              preferedContactMethod: primaryContact?.prefered_contact ?? '',
              contactPhoneOrLink: primaryContact?.contact ?? '',
              other: extraContacts.map((item) => ({
                id: item.id,
                platform: item.prefered_contact,
                contact: item.contact
              }))
            },

            family: family.map((item) => ({
              id: item.id,
              familyMemberFullName: item.full_name,
              relation: item.relation,
              dateOfBirth: item.dob,
              stageOfDevelopment: item.stage_of_human_development,
              gender: item.gender
            })),

            additionalInformation: {
              school: education
                ? {
                    schoolName: education.school_name,
                    educationLevel: education.education_level
                  }
                : null,

              occupation: occupations.map((item) => ({
                id: item.id,
                occupation: item.occupation,
                specialization: item.specialization,
                employer: item.employer,
                workPhone: item.work_no,
                workEmergencyPhone: item.emergency_no
              })),

              hobbies: hobbies.map((item) => ({
                id: item.id,
                hobbyName: item.name,
                hobbyType: item.type,
                hobbyEnvironmentPreferences: item.environmental_preferences,
                isProfessionalSkill: Boolean(item.is_professional_skill)
              })),

              expectation: expectationsResult.map((item) => item.expectation),

              impressions: impressionsResult.map((item) => item.impressions)
            }
          }
        })

        return {
          success: true,
          message: 'Person profile updated successfully',
          data: result
        }
      } catch (error) {
        console.error('Failed to update person profile:', error)

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
              people_job_occupation.emergency_no,
              people_expectations.id as expectation_id,
              people_expectations.expectation,
              people_expectations.people_id as expectation_people_id,
              people_first_impressions.impressions,
              people_first_impressions.id as impression_id,
              people_first_impressions.people_id as impression_people_id,
              people_status_category_history.id as people_category_id,
              people_status_category_history.current_status as people_category_current_status,
              people_status_category_history.created_at as people_category_created_at
            from people
            left join people_family on people_family.people_id = people.id
            left join people_address on people_address.people_id = people.id
            left join people_hobby on people_hobby.people_id = people.id
            left join people_contact_information on people_contact_information.people_id = people.id
            left join people_extra_contact on people_extra_contact.people_id = people.id
            left join people_education on people_education.people_id = people.id
            left join people_job_occupation on people_job_occupation.people_id = people.id
            left join people_expectations on people_expectations.people_id = people.id
            left join people_first_impressions on people_first_impressions.people_id = people.id
            left join people_status_category_history on people_status_category_history.person_id = people.id
            where people.id = ?
          `,
          params: [id]
        })
        console.timeEnd('query executed')
        // console.log()
        // console.log('RAW RESULT:', JSON.stringify(result, null, 2))

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

                hobbies: [],
                expectation: [],
                impressions: [],
                status: ''
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

          if (person.expectation_id) {
            const expectationExists = profile.additionalInformation.expectation.some(
              (expectation) => expectation.id === person.expectation_id
            )

            if (!expectationExists) {
              profile.additionalInformation.expectation.push(person.expectation)
            }
          }

          if (person.impression_id) {
            const impressionExists = profile.additionalInformation.impressions.some(
              (impression) => impression.id === person.impression_id
            )

            if (!impressionExists) {
              profile.additionalInformation.impressions.push(person.impressions)
            }
          }

          if (person.people_category_id) {
            profile.additionalInformation.status = person.people_category_current_status
          }
        }

        console.timeEnd('construct obj from query')

        console.log(peopleMap.get(id))

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
