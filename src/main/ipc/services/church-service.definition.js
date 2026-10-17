import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm'

export class ChurchServiceDefinitionService {
  static ServiceDefinition = async (payload) => {
    const { definition, participants } = payload
    const serviceDefinition = await DatabaseOrm.Insert({
      table: 'church_services_definition',
      data: {
        id: crypto.randomUUID(),
        title: definition.title,
        purpose: definition.purpose,
        service_type: definition.serviceType,
        date_in: definition.schedule.dateIn,
        date_out: definition.schedule.dateOut,
        start_time: definition.schedule.timeIn,
        end_time: definition.schedule.timeOut,
        expected_capacity: definition.expectedCapacity
      }
    })

    return serviceDefinition
  }

  static UpdateServiceDefinition = () => {}

  static DeleteServiceDefinition = () => {}
}
