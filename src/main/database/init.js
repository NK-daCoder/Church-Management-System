import { mainWindow } from '../window/primary.window.js'
import { DatabaseManager } from './modules/manager/database.manager.js'
import {
  peopleAddressSchema,
  peopleContactSchema,
  peopleEducationSchema,
  peopleExtraContactSchema,
  peopleFamilySchema,
  peopleHobbySchema,
  peopleJobSchema,
  peopleProfileSchema,
  peopleSpiritualJourney
} from '../schemas/people/profile.schema.js'
import { DatabaseOrm } from './modules/orm/orm.js'
import {
  DivisionSchema,
  ministryProfileSchema,
  ministryRoleGoalsSchema,
  ministryRoleQualification,
  ministryRolesSchema
} from '../schemas/ministry/profile.schema.js'
import {
  ministerTraining,
  ministryMinisterLeadership,
  ministryMinisterStatus
} from '../schemas/ministry/minister.schema.js'
import {
  ministryCustomeGrowthStatus,
  ministryCustomeStatusRules,
  ministryGrowthStatus,
  ministryGrowthStatusDefinition
} from '../schemas/ministry/status.schema.js'
import { customeKpiDefinition } from '../schemas/kpi/kpi.schema.js'
import {
  bookingApprovals,
  bookingProfile,
  bookingResources
} from '../schemas/bookings/booking.profile.schema.js'
import { peopleStatusHistorySchema } from '../schemas/people/status.schema.js'
import { ministryActivityGoals, ministryActivityTracking } from '../schemas/ministry/activities.schema.js';

export class DatabaseInitialization {
  static #databaseManager = DatabaseManager.getInstance()

  static InitSchema = () => {
    // insert all schemas obj in array
    const schemas = [
      customeKpiDefinition,
      peopleProfileSchema,
      peopleFamilySchema,
      peopleAddressSchema,
      peopleHobbySchema,
      peopleContactSchema,
      peopleExtraContactSchema,
      peopleEducationSchema,
      peopleStatusHistorySchema,
      peopleJobSchema,
      DivisionSchema,
      peopleSpiritualJourney,
      ministryProfileSchema,
      ministryRoleGoalsSchema,
      ministryRoleQualification,
      ministryRolesSchema,
      ministryMinisterLeadership,
      ministerTraining,
      ministryMinisterStatus,
      ministryCustomeGrowthStatus,
      ministryCustomeStatusRules,
      ministryGrowthStatusDefinition,
      ministryActivityTracking,
      ministryActivityGoals,
      ministryGrowthStatus,
      bookingProfile,
      bookingApprovals,
      bookingResources
    ]

    for (const schema of schemas) {
      const result = DatabaseOrm.CreateTable(schema)
      if (!result.success) return result
      console.log(result)
    }
  }

  static RestoreLastDatabase = () => {
    const restored = this.#databaseManager.restoreLastDatabase()

    if (restored.success) {
      this.InitSchema()
    }

    return restored
  }

  static CreateNewDatabase = (table) => {
    const createDb = this.#databaseManager.create(mainWindow, table)
    if (createDb.success) {
      this.InitSchema()
    }

    return createDb
  }
}
