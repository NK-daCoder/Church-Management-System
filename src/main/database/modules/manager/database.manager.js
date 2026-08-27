import Database from 'better-sqlite3'
import { app, dialog } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { DatabaseOrm } from '../orm/orm'

export class DatabaseManager {
  static instance = null

  #database = null
  #databasePath = null

  #configPath = path.join(app.getPath('userData'), 'config.json')

  constructor() {}

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }

    return DatabaseManager.instance
  }

  get connection() {
    return this.#database
  }

  get currentPath() {
    return this.#databasePath
  }

  get isConnected() {
    return this.#database !== null
  }

  async create(window, name) {
    const result = await dialog.showSaveDialog(window, {
      title: 'Create Database',
      defaultPath: `${name}.db`,
      filters: [
        {
          name: 'SQLite Database',
          extensions: ['db', 'sqlite', 'sqlite3']
        }
      ]
    })

    if (result.canceled) {
      return {
        success: false,
        message: 'Database creation cancelled.',
        code: 'USER_CANCELLED',
        databasePath: null
      }
    }

    if (!result.filePath) {
      return {
        success: false,
        message: 'No database path was selected.',
        code: 'CREATE_FAILED',
        databasePath: null
      }
    }

    try {
      this.connect(result.filePath)

      this.saveConfig(result.filePath)

      return {
        success: true,
        message: 'Database successfully created.',
        code: 'SUCCESS',
        databasePath: this.currentPath,
        databaseName: path.basename(result.filePath)
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create database.',
        code: 'SQLITE_ERROR',
        databasePath: null,
        error
      }
    }
  }

  async open(window) {
    const result = await dialog.showOpenDialog(window, {
      title: 'Open Database',
      properties: ['openFile'],
      filters: [
        {
          name: 'SQLite Database',
          extensions: ['db', 'sqlite', 'sqlite3']
        }
      ]
    })

    if (result.canceled) {
      return {
        success: false,
        message: 'Database selection cancelled.',
        code: 'USER_CANCELLED',
        databasePath: null
      }
    }

    if (result.filePaths.length === 0) {
      return {
        success: false,
        message: 'No database was selected.',
        code: 'DATABASE_NOT_FOUND',
        databasePath: null
      }
    }

    const databasePath = result.filePaths[0]

    try {
      this.connect(databasePath)

      this.saveConfig(databasePath)

      return {
        success: true,
        message: 'Database opened successfully.',
        code: 'SUCCESS',
        databasePath: this.currentPath,
        databaseName: path.basename(databasePath)
      }
    } catch (error) {
      return {
        success: false,
        message: 'Unable to open database.',
        code: 'SQLITE_ERROR',
        databasePath,
        error
      }
    }
  }

  connect(databasePath) {
    // Always close the current database first.
    this.close()

    const database = new Database(databasePath)

    // SQLite configuration
    database.pragma('journal_mode = WAL')
    database.pragma('synchronous = NORMAL')
    database.pragma('foreign_keys = ON')
    database.pragma('busy_timeout = 5000')

    this.#database = database
    this.#databasePath = databasePath

    console.log('database connected: ', this.#configPath)

    DatabaseOrm.setDatabase(this.#database)
  }

  close() {
    if (!this.#database) {
      return
    }

    try {
      this.#database.close()
    } finally {
      this.#database = null
      this.#databasePath = null
    }
    return {
      success: true,
      message: 'successfully closed the database'
    }
  }

  // --------------------------------------------------------
  // Restore Last Database
  // --------------------------------------------------------

  restoreLastDatabase() {
    const config = this.loadConfig()

    if (!config.lastDatabase) {
      return {
        success: false,
        message: 'No previously opened database was found.',
        code: 'RESTORE_FAILED',
        databasePath: null
      }
    }

    if (!fs.existsSync(config.lastDatabase)) {
      return {
        success: false,
        message:
          'The previously used database could not be found. It may have been moved, renamed, or deleted.',
        code: 'DATABASE_NOT_FOUND',
        databasePath: config.lastDatabase
      }
    }

    try {
      this.connect(config.lastDatabase)

      return {
        success: true,
        message: 'Successfully restored the previously opened database.',
        code: 'SUCCESS',
        databasePath: this.currentPath,
        databaseName: path.basename(config.lastDatabase)
      }
    } catch (error) {
      return {
        success: false,
        message: 'The database exists, but SQLite could not open it.',
        code: 'SQLITE_ERROR',
        databasePath: config.lastDatabase,
        error
      }
    }
  }

  // --------------------------------------------------------
  // Save Config
  // --------------------------------------------------------

  saveConfig(databasePath) {
    fs.writeFileSync(
      this.#configPath,
      JSON.stringify(
        {
          lastDatabase: databasePath
        },
        null,
        2
      ),
      'utf8'
    )
  }

  // --------------------------------------------------------
  // Load Config
  // --------------------------------------------------------

  loadConfig() {
    if (!fs.existsSync(this.#configPath)) {
      return {
        lastDatabase: null
      }
    }

    try {
      const config = JSON.parse(fs.readFileSync(this.#configPath, 'utf8'))

      return {
        lastDatabase: config.lastDatabase ?? null
      }
    } catch {
      return {
        lastDatabase: null
      }
    }
  }
}
