import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm'

export class MinistryIpc {
  // ============================================================
  // INTERNAL HELPERS
  // ============================================================

  static #buildMinistry = (ministryRow) => {
    if (!ministryRow) {
      return null
    }

    const roles = DatabaseOrm.Select({
      sql: `
        SELECT *
        FROM ministry_roles
        WHERE ministry_id = ?
        ORDER BY rowid
      `,
      params: [ministryRow.id]
    })

    const formattedRoles = roles.map((role) => {
      const qualifications = DatabaseOrm.Select({
        sql: `
          SELECT qualification
          FROM ministry_role_qualifications
          WHERE ministry_role_id = ?
          ORDER BY rowid
        `,
        params: [role.id]
      })

      const goals = DatabaseOrm.Select({
        sql: `
          SELECT goal
          FROM ministry_role_goals
          WHERE ministry_role_id = ?
          ORDER BY rowid
        `,
        params: [role.id]
      })

      return {
        id: role.id,

        title: role.title || '',

        purpose: role.purpose || '',

        roleFor: role.role_for || '',

        prerequisites: qualifications.map((item) => item.qualification),

        goals: goals.map((item) => item.goal),

        notes: role.notes || ''
      }
    })

    return {
      id: ministryRow.id,

      divisionId: ministryRow.divisions_id,

      ministry: {
        name: ministryRow.ministry_title || '',
        purpose: ministryRow.ministry_purpose || ''
      },

      roles: formattedRoles,

      createdAt: ministryRow.create_at || '',

      updatedAt: ministryRow.update_at || ''
    }
  }

  // ============================================================
  // CREATE MINISTRY
  // ============================================================

  static CreateMinistry = () => {
    electron.ipcMain.handle('ministry:create', (_event, payload) => {
      if (!payload) {
        return {
          success: false,
          message: 'Ministry data is required',
          reason: 'INVALID PAYLOAD'
        }
      }

      if (!payload.divisionId) {
        return {
          success: false,
          message: 'Division ID is required',
          reason: 'DIVISION ID NOT PROVIDED'
        }
      }

      if (!payload.ministry?.name?.trim()) {
        return {
          success: false,
          message: 'Ministry name is required',
          reason: 'MINISTRY NAME REQUIRED'
        }
      }

      try {
        const ministry = DatabaseOrm.Transaction(() => {
          const ministryId = payload.id || crypto.randomUUID()

          // ==================================================
          // MINISTRY
          // ==================================================

          DatabaseOrm.Insert({
            table: 'ministry',

            data: {
              id: ministryId,

              divisions_id: payload.divisionId,

              ministry_title: payload.ministry.name.trim(),

              ministry_purpose: payload.ministry.purpose || '',

              create_at: payload.createdAt || new Date().toISOString(),

              update_at: payload.updatedAt || ''
            }
          })

          // ==================================================
          // ROLES
          // ==================================================

          for (const role of payload.roles || []) {
            const roleId = role.id || crypto.randomUUID()

            DatabaseOrm.Insert({
              table: 'ministry_roles',

              data: {
                id: roleId,

                ministry_id: ministryId,

                title: role.title || '',

                purpose: role.purpose || '',

                role_for: role.roleFor || '',

                notes: role.notes || ''
              }
            })

            // ==============================================
            // QUALIFICATIONS
            // ==============================================

            for (const qualification of role.prerequisites || []) {
              if (!qualification?.trim()) {
                continue
              }

              DatabaseOrm.Insert({
                table: 'ministry_role_qualifications',

                data: {
                  id: crypto.randomUUID(),

                  ministry_role_id: roleId,

                  qualification: qualification.trim()
                }
              })
            }

            // ==============================================
            // GOALS
            // ==============================================

            for (const goal of role.goals || []) {
              if (!goal?.trim()) {
                continue
              }

              DatabaseOrm.Insert({
                table: 'ministry_role_goals',

                data: {
                  id: crypto.randomUUID(),

                  ministry_role_id: roleId,

                  goal: goal.trim()
                }
              })
            }
          }

          // ==================================================
          // RETURN COMPLETE MINISTRY
          // ==================================================

          const createdMinistry = DatabaseOrm.SelectOne({
            sql: `
              SELECT *
              FROM ministry
              WHERE id = ?
            `,
            params: [ministryId]
          })

          return this.#buildMinistry(createdMinistry)
        })

        return {
          success: true,
          message: 'Ministry created successfully',
          data: ministry
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create ministry',
          reason: error.message
        }
      }
    })
  }

  // ============================================================
  // FIND ONE MINISTRY
  // ============================================================

  static FindOneMinistry = () => {
    electron.ipcMain.handle('ministry:find-one', (_event, payload) => {
      if (!payload) {
        return {
          success: false,
          message: 'Ministry ID is required',
          reason: 'MINISTRY ID NOT PROVIDED'
        }
      }

      try {
        const ministry = DatabaseOrm.SelectOne({
          sql: `
              SELECT *
              FROM ministry
              WHERE id = ?
            `,
          params: [payload]
        })

        if (!ministry) {
          return {
            success: false,
            message: 'Ministry not found',
            reason: 'MINISTRY NOT FOUND'
          }
        }

        const result = this.#buildMinistry(ministry)

        return {
          success: true,
          message: 'Ministry fetched successfully',
          data: result
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch ministry',
          reason: error.message
        }
      }
    })
  }

  // ============================================================
  // FIND ALL MINISTRIES
  // ============================================================

  static FindAllMinistries = () => {
    electron.ipcMain.handle('ministry:find-all', () => {
      try {
        const ministries = DatabaseOrm.Select({
          sql: `
              SELECT *
              FROM ministry
              ORDER BY create_at DESC
            `
        })

        const result = ministries.map((ministry) => this.#buildMinistry(ministry))

        return {
          success: true,
          message: 'Ministries fetched successfully',
          data: result
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to fetch ministries',
          reason: error.message
        }
      }
    })
  }

  // ============================================================
  // UPDATE MINISTRY
  // ============================================================

  static UpdateMinistry = () => {
    electron.ipcMain.handle('ministry:update', (_event, payload) => {
      if (!payload) {
        return {
          success: false,
          message: 'Ministry data is required',
          reason: 'INVALID PAYLOAD'
        }
      }

      if (!payload.id) {
        return {
          success: false,
          message: 'Ministry ID is required',
          reason: 'MINISTRY ID NOT PROVIDED'
        }
      }

      if (!payload.divisionId) {
        return {
          success: false,
          message: 'Division ID is required',
          reason: 'DIVISION ID NOT PROVIDED'
        }
      }

      if (!payload.ministry?.name?.trim()) {
        return {
          success: false,
          message: 'Ministry name is required',
          reason: 'MINISTRY NAME REQUIRED'
        }
      }

      try {
        const ministry = DatabaseOrm.Transaction(() => {
          // ============================================
          // CHECK MINISTRY
          // ============================================

          const existing = DatabaseOrm.SelectOne({
            sql: `
                    SELECT *
                    FROM ministry
                    WHERE id = ?
                  `,
            params: [payload.id]
          })

          if (!existing) {
            throw new Error('Ministry not found')
          }

          // ============================================
          // UPDATE MINISTRY
          // ============================================

          DatabaseOrm.Update({
            table: 'ministry',

            data: {
              divisions_id: payload.divisionId,

              ministry_title: payload.ministry.name.trim(),

              ministry_purpose: payload.ministry.purpose || '',

              update_at: payload.updatedAt || new Date().toISOString()
            },

            condition: {
              id: payload.id
            }
          })

          // ============================================
          // REMOVE EXISTING CHILDREN
          //
          // Because the FK has ON DELETE CASCADE,
          // deleting the roles automatically deletes
          // qualifications and goals.
          // ============================================

          DatabaseOrm.Delete({
            table: 'ministry_roles',

            condition: {
              ministry_id: payload.id
            }
          })

          // ============================================
          // INSERT UPDATED ROLES
          // ============================================

          for (const role of payload.roles || []) {
            const roleId = role.id || crypto.randomUUID()

            DatabaseOrm.Insert({
              table: 'ministry_roles',

              data: {
                id: roleId,

                ministry_id: payload.id,

                title: role.title || '',

                purpose: role.purpose || '',

                role_for: role.roleFor || '',

                notes: role.notes || ''
              }
            })

            // ==========================================
            // QUALIFICATIONS
            // ==========================================

            for (const qualification of role.prerequisites || []) {
              if (!qualification?.trim()) {
                continue
              }

              DatabaseOrm.Insert({
                table: 'ministry_role_qualifications',

                data: {
                  id: crypto.randomUUID(),

                  ministry_role_id: roleId,

                  qualification: qualification.trim()
                }
              })
            }

            // ==========================================
            // GOALS
            // ==========================================

            for (const goal of role.goals || []) {
              if (!goal?.trim()) {
                continue
              }

              DatabaseOrm.Insert({
                table: 'ministry_role_goals',

                data: {
                  id: crypto.randomUUID(),

                  ministry_role_id: roleId,

                  goal: goal.trim()
                }
              })
            }
          }

          // ============================================
          // RETURN UPDATED MINISTRY
          // ============================================

          const updatedMinistry = DatabaseOrm.SelectOne({
            sql: `
                    SELECT *
                    FROM ministry
                    WHERE id = ?
                  `,
            params: [payload.id]
          })

          return this.#buildMinistry(updatedMinistry)
        })

        return {
          success: true,
          message: 'Ministry updated successfully',
          data: ministry
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update ministry',
          reason: error.message
        }
      }
    })
  }

  // ============================================================
  // DELETE MINISTRY
  // ============================================================

  static DeleteMinistry = () => {
    electron.ipcMain.handle('ministry:delete', (_event, payload) => {
      if (!payload) {
        return {
          success: false,
          message: 'Ministry ID is required',
          reason: 'MINISTRY ID NOT PROVIDED'
        }
      }

      try {
        const result = DatabaseOrm.Delete({
          table: 'ministry',

          condition: {
            id: payload
          }
        })

        if (result.changes === 0) {
          return {
            success: false,
            message: 'Ministry not found',
            reason: 'MINISTRY NOT FOUND'
          }
        }

        return {
          success: true,
          message: 'Ministry deleted successfully',
          data: {
            id: payload
          }
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to delete ministry',
          reason: error.message
        }
      }
    })
  }

  // ============================================================
  // REGISTER ALL IPCs
  // ============================================================

  static RegisterIpcs = () => {
    this.CreateMinistry()
    this.FindOneMinistry()
    this.FindAllMinistries()
    this.UpdateMinistry()
    this.DeleteMinistry()

    return {
      success: true,
      message: 'Ministry IPCs registered'
    }
  }
}
