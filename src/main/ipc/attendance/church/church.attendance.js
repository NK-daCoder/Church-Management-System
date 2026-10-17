import electron from 'electron'
import { DatabaseOrm } from '../../../database/modules/orm/orm'
import { ChurchServiceDefinitionService } from '../../services/church-service.definition'

export class ChurchAttendance {
  static RecordAttendanceIpc = () => {
    electron.ipcMain.handle('service:definition', (_event, payload) => {
      return DatabaseOrm.Transaction(ChurchServiceDefinitionService.RecordAttendance(payload))
    })
  }
  static DeleteAttendanceIpc = () => {}
  static GetAllAttedanceIpc = () => {}
  static GetSingleAttendanceIpc = () => {}
  static RegisterIpc = () => {
    this.RecordAttendanceIpc()
    this.DeleteAttendanceIpc()
    this.GetAllAttedanceIpc()
    this.GetSingleAttendanceIpc()
  }
}
