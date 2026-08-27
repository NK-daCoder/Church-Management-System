import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm'

export class DivisionIpc {
  // ============================================
  // CREATE
  // ============================================

  static CreateDivision = () => {
    electron.ipcMain.handle('division:create', (_event, payload) => {
      if (!payload) {
        return {
          success: false,
          message: 'Division data is required',
          reason: 'INVALID PAYLOAD'
        }
      }

      if (!payload.divisionTitle?.trim()) {
        return {
          success: false,
          message: 'Division title is required',
          reason: 'TITLE REQUIRED'
        }
      }

      try {
        const division = DatabaseOrm.Insert({
          table: 'divisions',

          data: {
            id: payload.id || crypto.randomUUID(),
            title: payload.divisionTitle.trim(),
            purpose: payload.purpose || '',
            notes: payload.notes || '',
            created_at: payload.createdAt || new Date().toISOString(),
            updated_at: payload.updatedAt || ''
          }
        })

        return {
          success: true,
          message: 'Division created successfully',
          data: this.#MapDivision(division)
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create division',
          reason: error.message
        }
      }
    })
  }

  // ============================================
  // UPDATE
  // ============================================

  static UpdateDivision = () => {
    electron.ipcMain.handle('division:update', (_event, payload) => {
      if (!payload?.id) {
        return {
          success: false,
          message: 'Division ID is required',
          reason: 'ID NOT PROVIDED'
        }
      }

      if (!payload.divisionTitle?.trim()) {
        return {
          success: false,
          message: 'Division title is required',
          reason: 'TITLE REQUIRED'
        }
      }

      try {
        const division = DatabaseOrm.Update({
          table: 'divisions',

          condition: {
            id: payload.id
          },

          data: {
            title: payload.divisionTitle.trim(),
            purpose: payload.purpose || '',
            notes: payload.notes || '',
            updated_at: new Date().toISOString()
          }
        })

        if (!division) {
          return {
            success: false,
            message: 'Division not found',
            reason: 'DIVISION NOT FOUND'
          }
        }

        return {
          success: true,
          message: 'Division updated successfully',
          data: this.#MapDivision(division)
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update division',
          reason: error.message
        }
      }
    })
  }

  // ============================================
  // DELETE
  // ============================================

  static DeleteDivision = () => {
    electron.ipcMain.handle('division:delete', (_event, id) => {
      if (!id) {
        return {
          success: false,
          message: 'Division ID is required',
          reason: 'ID NOT PROVIDED'
        }
      }

      try {
        const result = DatabaseOrm.Delete({
          table: 'divisions',

          condition: {
            id
          }
        })

        if (result.changes === 0) {
          return {
            success: false,
            message: 'Division not found',
            reason: 'DIVISION NOT FOUND'
          }
        }

        return {
          success: true,
          message: 'Division deleted successfully'
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to delete division',
          reason: error.message
        }
      }
    })
  }

  // ============================================
  // FIND BY ID
  // ============================================

  static FindDivisionById = () => {
    electron.ipcMain.handle('division:find-by-id', (_event, id) => {
      if (!id) {
        return {
          success: false,
          message: 'Division ID is required',
          reason: 'ID NOT PROVIDED'
        }
      }

      try {
        const division = DatabaseOrm.SelectOne({
          sql: `
            SELECT *
            FROM divisions
            WHERE id = ?
          `,
          params: [id]
        })

        if (!division) {
          return {
            success: false,
            message: 'Division not found',
            reason: 'DIVISION NOT FOUND'
          }
        }

        return {
          success: true,
          message: 'Division found',
          data: this.#MapDivision(division)
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to find division',
          reason: error.message
        }
      }
    })
  }

  // ============================================
  // GET ALL
  // ============================================

  static GetAllDivisions = () => {
    electron.ipcMain.handle('division:get-all', () => {
      try {
        const divisions = DatabaseOrm.Select({
          sql: `
            SELECT *
            FROM divisions
            ORDER BY created_at DESC
          `
        })

        return {
          success: true,
          message: 'Divisions retrieved successfully',
          data: divisions.map(this.#MapDivision)
        }
      } catch (error) {
        return {
          success: false,
          message: 'Failed to retrieve divisions',
          reason: error.message
        }
      }
    })
  }

  // ============================================
  // DATABASE → FRONTEND MAPPER
  // ============================================

  static #MapDivision = (division) => {
    return {
      id: division.id,

      divisionTitle: division.title || '',

      purpose: division.purpose || '',

      notes: division.notes || '',

      createdAt: division.created_at || '',

      updatedAt: division.updated_at || ''
    }
  }

  // ============================================
  // REGISTER
  // ============================================

  static RegisterIpcs = () => {
    this.CreateDivision()
    this.UpdateDivision()
    this.DeleteDivision()
    this.FindDivisionById()
    this.GetAllDivisions()

    return {
      success: true,
      message: 'Division IPCs registered'
    }
  }
}
