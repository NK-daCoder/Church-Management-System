import { DatabaseOrm } from '../modules/orm/orm'

export const GenerateTable = (schema) => {
  const result = DatabaseOrm.CreateTable(schema)
  if (!result.success) return result
  return result.message
}
