import { nowTimestamp } from '@renderer/utils/timestamp-helpers'

export const AttendanceRecordTemplate = {
  id: crypto.randomUUID(),
  serviceId: '',
  personId: '',
  dateAttended: '',
  metrics: {
    isFirstTime: false,
    firstVisitDate: '',
    visitCount: 0,
    howDidTheyHearAboutUs: ''
  },
  record: {
    recordedBy: '',
    recordedAt: '',
    notes: ''
  },
  notes: '',
  createdAt: nowTimestamp(),
  updatedAt: ''
}
