export class DatabaseOrm {
  static database = null

  static setDatabase(database) {
    this.database = database
  }

  static getDatabase() {
    if (!this.database) {
      throw new Error('No active database connection.')
    }

    return this.database
  }

  static CreateTable({ table, schema }) {
    const database = this.getDatabase()

    const columnDefs = []
    const foreignKeys = []

    for (const [column, def] of Object.entries(schema)) {
      const parts = [column, def.type]

      // PRIMARY KEY
      if (def.primaryKey) {
        parts.push('PRIMARY KEY')
      }

      // AUTOINCREMENT
      if (def.autoIncrement) {
        if (!def.primaryKey || def.type.toUpperCase() !== 'INTEGER') {
          throw new Error(`"${column}" must be INTEGER PRIMARY KEY AUTOINCREMENT.`)
        }

        parts.push('AUTOINCREMENT')
      }

      // NOT NULL
      if (def.notNull) {
        parts.push('NOT NULL')
      }

      // UNIQUE
      if (def.unique) {
        parts.push('UNIQUE')
      }

      // DEFAULT
      if (def.default !== undefined) {
        if (def.default === 'CURRENT_TIMESTAMP') {
          parts.push('DEFAULT CURRENT_TIMESTAMP')
        } else {
          parts.push(`DEFAULT ${JSON.stringify(def.default)}`)
        }
      }

      columnDefs.push(parts.join(' '))

      // FOREIGN KEY
      if (def.references) {
        const fk = def.references
        const actions = []

        if (fk.onDelete) {
          actions.push(`ON DELETE ${fk.onDelete}`)
        }

        if (fk.onUpdate) {
          actions.push(`ON UPDATE ${fk.onUpdate}`)
        }

        foreignKeys.push(
          `FOREIGN KEY (${column}) REFERENCES ${fk.table}(${fk.column}) ${actions.join(' ')}`
        )
      }
    }

    const sql = `
      CREATE TABLE IF NOT EXISTS ${table} (
        ${[...columnDefs, ...foreignKeys].join(',\n')}
      )
    `

    try {
      database.exec(sql)

      return {
        success: true,
        message: `Table "${table}" created successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to create table "${table}".`,
        error
      }
    }
  }

  static Insert({ table, data }) {
    const database = this.getDatabase()

    const columns = Object.keys(data)
    const values = Object.values(data)

    const placeholders = columns.map(() => '?').join(', ')

    const sql = `
      INSERT INTO ${table}
      (${columns.join(', ')})
      VALUES (${placeholders})
    `

    const statement = database.prepare(sql)

    const result = statement.run(values)

    const id = data.id ?? result.lastInsertRowid

    return database.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id)
  }

  static Update({ table, data, condition }) {
    const database = this.getDatabase()

    const dataColumns = Object.keys(data)
    const dataValues = Object.values(data)

    const conditionColumns = Object.keys(condition)
    const conditionValues = Object.values(condition)

    const setClause = dataColumns.map((column) => `${column} = ?`).join(', ')

    const whereClause = conditionColumns.map((column) => `${column} = ?`).join(' AND ')

    const sql = `
    UPDATE ${table}
    SET ${setClause}
    WHERE ${whereClause}
  `

    const statement = database.prepare(sql)

    const result = statement.run([...dataValues, ...conditionValues])

    if (result.changes === 0) {
      return null
    }

    return database.prepare(`SELECT * FROM ${table} WHERE ${whereClause}`).get(conditionValues)
  }

  static Delete({ table, condition }) {
    const database = this.getDatabase()

    const columns = Object.keys(condition)

    const values = Object.values(condition)

    const whereClause = columns.map((column) => `${column} = ?`).join(' AND ')

    const sql = `
      DELETE FROM ${table}
      WHERE ${whereClause}
    `

    const statement = database.prepare(sql)

    return statement.run(values)
  }

  static Select({ sql, params = [] }) {
    const database = this.getDatabase()
    console.log(params)

    const statement = database.prepare(sql)

    return statement.all(...params)
  }

  static SelectOne({ sql, params = [] }) {
    const database = this.getDatabase()

    const statement = database.prepare(sql)

    return statement.get(params)
  }

  static CustomeExecute(sql) {
    const database = this.getDatabase()
    return database.exec(sql)
  }

  static Transaction(callback) {
    const database = this.getDatabase()

    const transaction = database.transaction(() => {
      return callback(database)
    })

    return transaction()
  }
}
