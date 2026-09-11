import electron from 'electron'
import { DatabaseManager } from '../database/modules/manager/database.manager.js'
import { DatabaseInitialization } from '../database/init.js'
import { mainWindow } from '../window/primary.window.js'
import { PeopleIpc } from './people/people.ipc.js'
import { EquipmentIpc } from './equipment/equipment.ipc.js'
import { MinistryIpc } from './ministry/ministry.ipc.js'
import { DivisionIpc } from './ministry/division.ipc.js'

export class DatabaseIpc {
  static #databaseManager = DatabaseManager.getInstance()
  static registerCreateDatabaseIpc = () => {
    electron.ipcMain.handle('db:create', (_event, payload) => {
      const createdDatabase = DatabaseInitialization.CreateNewDatabase(payload)
      return createdDatabase
    })
  }

  static registerRemoveDatabaseIpc = () => {
    electron.ipcMain.handle('db:remove-current', () => {})
  }

  static registerChooseDatabaseIpc = () => {
    electron.ipcMain.handle('db:choose-database', () => {
      const result = this.#databaseManager.open(mainWindow)
      return result
    })
  }

  static registerIpcs = () => {
    this.registerChooseDatabaseIpc()
    this.registerRemoveDatabaseIpc()
    this.registerCreateDatabaseIpc()
    const peopleIpc = PeopleIpc.RegisterIpcs()
    const equipmentIpc = EquipmentIpc.registerIpc()
    const ministryIpc = MinistryIpc.RegisterIpcs()
    const divisionIpc = DivisionIpc.RegisterIpcs()
    return {
      success: true,
      message: [
        'DatabaseIpcs registered',
        [peopleIpc.message, equipmentIpc.message, ministryIpc.message, divisionIpc.message]
      ]
    }
  }
}
