import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  Clock3,
  Download,
  Filter,
  History,
  Search,
  Users,
  UserCheck,
  UserRoundX,
  X,
  Database,
  Plus,
  Minimize,
  Maximize,
} from 'lucide-react'
import { logo } from '../../../assets/media';
import DateTimeWidget from '../../../components/dateTime';
import PropTypes from 'prop-types'

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const BREADCRUMBS = [
  { label: 'People', path: 'people' },
  { label: 'Attendance', path: 'church-attendance' },
]

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

const CONGREGANT_TYPES = ['All types', 'Member', 'Visitor', 'Leader', 'Staff']

const ATTENDANCE_STATUSES = [
  'All statuses',
  'Present',
  'Absent',
  'Not recorded',
]

const STATUS_STYLES = {
  Present: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  Absent: 'bg-rose-50 text-rose-700 ring-rose-600/15',
  'Not recorded': 'bg-stone-100 text-stone-600 ring-stone-500/10',
}

const SERVICE_TYPES = [
    'Celebration',
    'Children',
    'Midweek',
    'Regular sunday service (AM)',
    'Regular sunday service (PM)'
]

/* -------------------------------------------------------------------------- */
/* Date helpers                                                               */
/* -------------------------------------------------------------------------- */

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDate(dateString) {
  if (!dateString) return ''

  // Use local calendar dates rather than parsing YYYY-MM-DD as UTC.
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getDateMode(selectedDate) {
  const today = getLocalDateString()

  if (selectedDate < today) return 'history'
  if (selectedDate > today) return 'future'

  return 'today'
}

/* -------------------------------------------------------------------------- */
/* Dummy attendance data                                                      */
/* -------------------------------------------------------------------------- */

const PEOPLE = [
  {
    id: 'person-001',
    fullname: 'Thabo Mokoena',
    type: 'Member',
    timeIn: '09:12',
    timeOut: '11:04',
    status: 'Present',
  },
  {
    id: 'person-002',
    fullname: 'Lerato Molefe',
    type: 'Leader',
    timeIn: '08:42',
    timeOut: '',
    status: 'Present',
  },
  {
    id: 'person-003',
    fullname: 'Kabelo Nkosi',
    type: 'Visitor',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-004',
    fullname: 'Naledi Dlamini',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Absent',
  },
  {
    id: 'person-005',
    fullname: 'Sipho Khumalo',
    type: 'Staff',
    timeIn: '09:03',
    timeOut: '11:10',
    status: 'Present',
  },
  {
    id: 'person-006',
    fullname: 'Mpho Ndlovu',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-007',
    fullname: 'Palesa Modise',
    type: 'Visitor',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-008',
    fullname: 'Tumelo Molefe',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Absent',
  },
  {
    id: 'person-009',
    fullname: 'Karabo Seema',
    type: 'Leader',
    timeIn: '08:51',
    timeOut: '',
    status: 'Present',
  },
  {
    id: 'person-010',
    fullname: 'Boitumelo Radebe',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-011',
    fullname: 'Neo Ramokgopa',
    type: 'Staff',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-012',
    fullname: 'Refilwe Maseko',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-013',
    fullname: 'Tshepo Phiri',
    type: 'Visitor',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-014',
    fullname: 'Amogelang Tsoai',
    type: 'Member',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
  {
    id: 'person-015',
    fullname: 'Keaobaka Mokoena',
    type: 'Leader',
    timeIn: '',
    timeOut: '',
    status: 'Not recorded',
  },
]

function getDummyAttendanceForDate(date, person) {
  const mode = getDateMode(date)

  // Historical records should be date-specific.
  // These deterministic examples are only for the prototype.
  if (mode === 'history') {
    const day = Number(date.slice(-2))
    const attended = (day + person.id.length) % 4 !== 0

    return {
      ...person,
      status: attended ? 'Present' : 'Absent',
      timeIn: attended ? person.timeIn || '09:05' : '',
      timeOut: attended ? person.timeOut || '11:00' : '',
    }
  }

  if (mode === 'future') {
    return {
      ...person,
      status: 'Not recorded',
      timeIn: '',
      timeOut: '',
    }
  }

  return { ...person }
}

/* -------------------------------------------------------------------------- */
/* Small reusable components                                                  */
/* -------------------------------------------------------------------------- */

function IconButton({
  label,
  onClick,
  children,
  disabled = false,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-lg',
        'border border-stone-200 bg-white p-2 text-stone-600',
        'transition-colors hover:bg-stone-50 hover:text-stone-950',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-stone-900 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  iconClassName,
}) {
  return (
    <article className="rounded-2xl bg-white shadow p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
            {value}
          </p>
        </div>

        <span
          className={[
            'flex h-10 w-10 items-center justify-center rounded-xl',
            iconClassName,
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon size={19} strokeWidth={1.8} />
        </span>
      </div>

      <p className="mt-3 text-xs leading-5 text-stone-500">{description}</p>
    </article>
  )
}

function StatusBadge({ status }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1',
        'text-xs font-medium ring-1 ring-inset',
        STATUS_STYLES[status],
      ].join(' ')}
    >
      {status === 'Present' && (
        <Check size={13} className="mr-1.5" aria-hidden="true" />
      )}

      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Attendance row                                                             */
/* -------------------------------------------------------------------------- */

function AttendanceRow({
  person,
  selected,
  onSelect,
  onStatusChange,
  onTimeChange,
  readOnly,
}) {
  return (
    <tr className="group border-b border-stone-100 transition-colors hover:bg-stone-50/70 last:border-0">
      <td className="w-12 px-5 py-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => onSelect(person.id, event.target.checked)}
          aria-label={`Select ${person.fullname}`}
          className="h-4 w-4 cursor-pointer rounded border-stone-300 accent-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
        />
      </td>

      <th scope="row" className="min-w-56 px-4 py-4 text-left">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-700"
          >
            {person.fullname
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')}
          </span>

          <div>
            <p className="font-medium text-stone-900">{person.fullname}</p>
            <p className="mt-0.5 text-xs text-stone-400">
              {person.id.toUpperCase()}
            </p>
          </div>
        </div>
      </th>

      <td className="px-4 py-4">
        <span className="inline-flex rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-600">
          {person.type}
        </span>
      </td>

      <td className="px-4 py-4">
        <label className="sr-only" htmlFor={`time-in-${person.id}`}>
          Time in for {person.fullname}
        </label>

        <input
          id={`time-in-${person.id}`}
          type="time"
          value={person.timeIn}
          disabled={readOnly || person.status !== 'Present'}
          onChange={(event) =>
            onTimeChange(person.id, 'timeIn', event.target.value)
          }
          className="w-32 rounded-lg border border-stone-200 bg-white px-2.5 py-2 text-sm text-stone-700 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400"
        />
      </td>

      <td className="px-4 py-4">
        <label className="sr-only" htmlFor={`time-out-${person.id}`}>
          Time out for {person.fullname}
        </label>

        <input
          id={`time-out-${person.id}`}
          type="time"
          value={person.timeOut}
          disabled={readOnly || person.status !== 'Present'}
          onChange={(event) =>
            onTimeChange(person.id, 'timeOut', event.target.value)
          }
          className="w-32 rounded-lg border border-stone-200 bg-white px-2.5 py-2 text-sm text-stone-700 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400"
        />
      </td>

      <td className="px-4 py-4">
        <div className="flex min-w-40 items-center gap-2">
          <StatusBadge status={person.status} />

          {!readOnly && (
            <label className="sr-only" htmlFor={`status-${person.id}`}>
              Attendance status for {person.fullname}
            </label>
          )}

          {!readOnly && (
            <select
              id={`status-${person.id}`}
              value={person.status}
              onChange={(event) =>
                onStatusChange(person.id, event.target.value)
              }
              className="max-w-32 rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-600 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
            >
              <option value="Not recorded">Not recorded</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          )}
        </div>
      </td>
    </tr>
  )
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Attendance table pagination"
      className="flex flex-col gap-4 border-t border-stone-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
        <p aria-live="polite" aria-atomic="true">
          Showing <span className="font-medium text-stone-900">{start}–{end}</span>{' '}
          of <span className="font-medium text-stone-900">{totalItems}</span>
        </p>

        <label htmlFor="attendance-page-size" className="sr-only">
          Rows per page
        </label>

        <select
          id="attendance-page-size"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          label="Go to previous page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ArrowLeft size={16} />
        </IconButton>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={[
              'h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900',
              page === currentPage
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100',
            ].join(' ')}
          >
            {page}
          </button>
        ))}

        <IconButton
          label="Go to next page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ArrowRight size={16} />
        </IconButton>
      </div>
    </nav>
  )
}

Pagination.proptypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired
}

/* -------------------------------------------------------------------------- */
/* Main attendance page                                                       */
/* -------------------------------------------------------------------------- */

const PeopleChurchAttendance = ({ setView }) => {
  const today = getLocalDateString()

  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All types')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [serviceType, setServiceType] = useState('Regular sunday service (AM)')
  const [showServiceDefinitionForm, setShowServiceDefinitionForm] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedIds, setSelectedIds] = useState([])
  const [notice, setNotice] = useState('')

  const dateMode = getDateMode(selectedDate)
  const readOnly = dateMode === 'history'

  const [attendanceByDate, setAttendanceByDate] = useState(() => ({
    [today]: PEOPLE.map((person) => ({ ...person })),
  }))

  const attendance = useMemo(() => {
    if (attendanceByDate[selectedDate]) {
      return attendanceByDate[selectedDate]
    }

    return PEOPLE.map((person) =>
      getDummyAttendanceForDate(selectedDate, person),
    )
  }, [attendanceByDate, selectedDate])

  const filteredPeople = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return attendance.filter((person) => {
      const matchesSearch =
        !normalizedSearch ||
        person.fullname.toLowerCase().includes(normalizedSearch) ||
        person.id.toLowerCase().includes(normalizedSearch)

      const matchesType =
        typeFilter === 'All types' || person.type === typeFilter

      const matchesStatus =
        statusFilter === 'All statuses' || person.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
  }, [attendance, search, typeFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredPeople.length / pageSize))

  const paginatedPeople = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredPeople.slice(start, start + pageSize)
  }, [filteredPeople, page, pageSize])

  const presentCount = attendance.filter(
    (person) => person.status === 'Present',
  ).length

  const absentCount = attendance.filter(
    (person) => person.status === 'Absent',
  ).length

  const unrecordedCount = attendance.filter(
    (person) => person.status === 'Not recorded',
  ).length

  const attendanceRate =
    attendance.length - unrecordedCount > 0
      ? Math.round(
          (presentCount / (attendance.length - unrecordedCount)) * 100,
        )
      : 0

  const currentPageIds = paginatedPeople.map((person) => person.id)

  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id))

  /* Reset pagination and selection when the dataset changes. */
  useEffect(() => {
    setPage(1)
    setSelectedIds([])
  }, [selectedDate, search, typeFilter, statusFilter, pageSize])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  /* Keep mutations scoped to the selected date. */
  function updateAttendance(updater) {
    setAttendanceByDate((previous) => {
      const current =
        previous[selectedDate] ??
        PEOPLE.map((person) => getDummyAttendanceForDate(selectedDate, person))

      return {
        ...previous,
        [selectedDate]: updater(current),
      }
    })
  }

  function updatePersonStatus(personId, status) {
    updateAttendance((people) =>
      people.map((person) =>
        person.id === personId
          ? {
              ...person,
              status,
              timeIn:
                status === 'Present'
                  ? person.timeIn || new Date().toTimeString().slice(0, 5)
                  : '',
              timeOut: status === 'Present' ? person.timeOut : '',
            }
          : person,
      ),
    )

    setNotice('Attendance status updated.')
  }

  function updatePersonTime(personId, field, value) {
    updateAttendance((people) =>
      people.map((person) =>
        person.id === personId
          ? {
              ...person,
              [field]: value,
              ...(field === 'timeIn' && value
                ? { status: 'Present' }
                : {}),
            }
          : person,
      ),
    )

    setNotice('Attendance time updated.')
  }

  function togglePerson(personId, checked) {
    setSelectedIds((previous) =>
      checked
        ? [...new Set([...previous, personId])]
        : previous.filter((id) => id !== personId),
    )
  }

  function toggleCurrentPage(checked) {
    setSelectedIds((previous) => {
      if (checked) {
        return [...new Set([...previous, ...currentPageIds])]
      }

      return previous.filter((id) => !currentPageIds.includes(id))
    })
  }

  function markSelectedPresent() {
    if (readOnly || selectedIds.length === 0) return

    updateAttendance((people) =>
      people.map((person) =>
        selectedIds.includes(person.id)
          ? {
              ...person,
              status: 'Present',
              timeIn:
                person.timeIn || new Date().toTimeString().slice(0, 5),
            }
          : person,
      ),
    )

    setNotice(`${selectedIds.length} people marked present.`)
    setSelectedIds([])
  }

  function clearFilters() {
    setSearch('')
    setTypeFilter('All types')
    setStatusFilter('All statuses')
    setPage(1)
  }

  function exportAttendance() {
    const headers = [
      'Person ID',
      'Full name',
      'Congregant type',
      'Status',
      'Time in',
      'Time out',
      'Attendance date',
    ]

    const rows = filteredPeople.map((person) => [
      person.id,
      person.fullname,
      person.type,
      person.status,
      person.timeIn,
      person.timeOut,
      selectedDate,
    ])

    const escapeCsv = (value) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(','))
      .join('\r\n')

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `church-attendance-${selectedDate}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    setNotice('Attendance CSV exported.')
  }

  const pageHeading =
    dateMode === 'history'
      ? 'Attendance history'
      : dateMode === 'future'
        ? 'Plan attendance'
        : 'Church attendance'

  const dateDescription =
    dateMode === 'history'
      ? 'Review the attendance recorded for this date.'
      : dateMode === 'future'
        ? 'Prepare attendance records for an upcoming service.'
        : 'Record and manage attendance for today’s service.'

  return (
    <main className='p-6 relative'>
      <div className="space-y-7">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {BREADCRUMBS.map((crumb, index) => {
              const isLast = index === BREADCRUMBS.length - 1

              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="font-medium text-stone-900"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setView?.(crumb.path)}
                      className="text-stone-500 transition-colors hover:text-stone-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                    >
                      {crumb.label}
                    </button>
                  )}

                  {!isLast && (
                    <span aria-hidden="true" className="text-stone-300">
                      /
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Page heading and date selection */}
        <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                {pageHeading}
              </h1>

              {dateMode === 'history' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-200 px-2.5 py-1 text-xs font-medium text-stone-700">
                  <History size={13} aria-hidden="true" />
                  Historical record
                </span>
              )}

              {dateMode === 'future' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  <CalendarDays size={13} aria-hidden="true" />
                  Upcoming
                </span>
              )}
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
              {dateDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <button 
                type='button'
                className='text-sm flex items-center gap-3 text-white rounded-lg px-4 h-11 cursor-pointer shadow-lg shadow-orange-200 bg-orange-500 border border-t border-orange-300'
                title='when you click this button, you will be able to define a new service type for the selected date'
                onClick={() => {
                  setShowServiceDefinitionForm(true)
                }}
            >
                <Plus size={16}/>
                Define Service
            </button>
            <div className="min-w-0 sm:min-w-64">
              <label
                htmlFor="attendance-date"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500"
              >
                Attendance date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="attendance-date"
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="h-11 w-full rounded-xl border border-stone-200 bg-white pl-10 pr-3 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
                />
              </div>
            </div>

            <button 
                type='button'
                className='text-sm flex items-center gap-3 text-white rounded-lg px-4 h-11 cursor-pointer shadow-lg shadow-orange-200 bg-orange-500 border border-t border-orange-300'
            >
                <Database size={16}/>
                Save Record
            </button>

            <button
              type="button"
              onClick={exportAttendance}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
              title='Export CSV'
            >
              <Download size={16} aria-hidden="true" />
            </button>

          </div>
        </header>

        {/* Date-specific recording notice */}
        <section
          aria-label="Selected attendance session"
          className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
              {dateMode === 'history' ? (
                <History size={19} aria-hidden="true" />
              ) : dateMode === 'future' ? (
                <CalendarDays size={19} aria-hidden="true" />
              ) : (
                <Clock3 size={19} aria-hidden="true" />
              )}
            </span>

            <div>
              <p className="font-medium text-stone-900">
                {formatDate(selectedDate)}
              </p>

              <p className="mt-1 text-sm text-stone-500">
                {dateMode === 'history'
                  ? 'Read-only view. Choose today or a future date to record attendance.'
                  : dateMode === 'future'
                    ? 'Attendance can be prepared for this date.'
                    : 'You can update attendance as people arrive and leave.'}
              </p>
            </div>
          </div>

          {dateMode !== 'today' && (
            <button
              type="button"
              onClick={() => setSelectedDate(today)}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 sm:self-center"
            >
              Return to today
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          )}
        </section>

        {/* Summary cards */}
        <section aria-label="Attendance summary">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Total people"
              value={attendance.length}
              description="People in the selected attendance list"
              icon={Users}
              iconClassName="bg-stone-100 text-stone-700"
            />

            <SummaryCard
              label="Present"
              value={presentCount}
              description="People marked as attending"
              icon={UserCheck}
              iconClassName="bg-emerald-50 text-emerald-700"
            />

            <SummaryCard
              label="Absent"
              value={absentCount}
              description="People explicitly marked absent"
              icon={UserRoundX}
              iconClassName="bg-rose-50 text-rose-700"
            />

            <SummaryCard
              label="Attendance rate"
              value={`${attendanceRate}%`}
              description={
                unrecordedCount
                  ? `${unrecordedCount} people still need a recorded status`
                  : 'Based on recorded attendance statuses'
              }
              icon={CheckCheck}
              iconClassName="bg-blue-50 text-blue-700"
            />
          </div>
        </section>

        {/* Attendance workspace */}
        <section
          aria-labelledby="attendance-list-heading"
          className="overflow-hidden rounded-2xl bg-white shadow"
        >
          {/* Table header */}
          <div className="flex flex-col gap-4 border-b border-stone-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="attendance-list-heading"
                className="text-lg font-semibold tracking-tight text-stone-950"
              >
                Attendance register
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                Manage attendance records for your congregation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0">
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <label htmlFor="attendance-search" className="sr-only">
                  Search people by name or person ID
                </label>

                <input
                  id="attendance-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search people..."
                  className="h-10 w-full rounded-xl border border-stone-200 bg-white pl-9 pr-9 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
                />

                {search && (
                  <IconButton
                    label="Clear search"
                    onClick={() => setSearch('')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 border-0 p-1"
                  >
                    <X size={14} />
                  </IconButton>
                )}
              </div>

              <div className="flex gap-2">
                <label htmlFor="attendance-type-filter" className="sr-only">
                  Filter by congregant type
                </label>

                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <Users
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <select
                    id="attendance-type-filter"
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-stone-200 bg-white pl-9 pr-8 text-sm text-stone-700 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 sm:w-40"
                  >
                    {CONGREGANT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>

                <label htmlFor="attendance-status-filter" className="sr-only">
                  Filter by attendance status
                </label>

                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <Filter
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <select
                    id="attendance-status-filter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-stone-200 bg-white pl-9 pr-8 text-sm text-stone-700 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 sm:w-44"
                  >
                    {ATTENDANCE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>

                <label htmlFor="attendance-status-filter" className="sr-only">
                  Filter by Congregant Type
                </label>

                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <Filter
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <select
                    id="congregant-status-filter"
                    value={serviceType}
                    onChange={(event) => setServiceType(event.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-stone-200 bg-white pl-9 pr-8 text-sm text-stone-700 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 sm:w-44"
                  >
                    {SERVICE_TYPES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>
            </div>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedIds.length > 0 && (
            <div className="flex flex-col gap-3 border-b border-stone-100 bg-stone-50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-stone-700" aria-live="polite">
                {selectedIds.length} {selectedIds.length === 1 ? 'person' : 'people'} selected
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {!readOnly && (
                  <button
                    type="button"
                    onClick={markSelectedPresent}
                    className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
                  >
                    <Check size={15} aria-hidden="true" />
                    Mark present
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  Clear selection
                </button>
              </div>
            </div>
          )}

          {/* Accessible table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Congregation attendance for {formatDate(selectedDate)}.
                Select a person to perform bulk attendance actions.
              </caption>

              <thead className="bg-stone-50/80">
                <tr className="border-b border-stone-100 text-left">
                  <th scope="col" className="w-12 px-5 py-3">
                    <input
                      type="checkbox"
                      checked={allCurrentPageSelected}
                      onChange={(event) =>
                        toggleCurrentPage(event.target.checked)
                      }
                      aria-label="Select all people on this page"
                      aria-checked={
                        selectedIds.some((id) => currentPageIds.includes(id)) &&
                        !allCurrentPageSelected
                          ? 'mixed'
                          : allCurrentPageSelected
                      }
                      className="h-4 w-4 cursor-pointer rounded border-stone-300 accent-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
                    />
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
                  >
                    Full name
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
                  >
                    Congregant type
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
                  >
                    Time in
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
                  >
                    Time out
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
                  >
                    Attendance status
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedPeople.length > 0 ? (
                  paginatedPeople.map((person) => (
                    <AttendanceRow
                      key={person.id}
                      person={person}
                      selected={selectedIds.includes(person.id)}
                      onSelect={togglePerson}
                      onStatusChange={updatePersonStatus}
                      onTimeChange={updatePersonTime}
                      readOnly={readOnly}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
                        <Search size={20} aria-hidden="true" />
                      </span>

                      <p className="mt-4 font-medium text-stone-900">
                        No people found
                      </p>

                      <p className="mt-1 text-sm text-stone-500">
                        Try changing your search or filters.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredPeople.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </section>

        {/* Live feedback for assistive technology */}
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {notice}
        </div>
      </div>

      {
        showServiceDefinitionForm  === true  && (
          <section className='fixed top-0 left-0 h-screen w-full backdrop-blur-sm bg-stone-900/50 z-50 flex items-center justify-center'>
            <form className='bg-white mx-auto w-1/2 rounded-lg h-[36rem] flex flex-col overflow-hidden'>
              <section className='p-2 flex items-center justify-between border-b border-stone-300 bg-white'>
                <div className='flex items-center gap-2' aria-hidden={true}>
                  <img src={logo} alt="church logo" className='size-5' />
                  <h2 className='text-sm text-stone-600'>Service Definition</h2>
                </div>
                <ul className='flex items-center gap-3'>
                  {
                    [
                      { id: 'maximize', label: 'Maximize', icon: Maximize, onCall: () => console.log('some information') },
                      { id: 'close', label: 'Close', icon: X, onCall: () => setShowServiceDefinitionForm(false)}
                    ].map(({ id, label, icon: Icon, onCall }) => (
                      <li key={id}>
                        <button 
                          type='button' 
                          className='flex items-center gap-4 size-8 shadow border-t border-stone-200 justify-center rounded-lg' title={label}
                          onClick={onCall}
                        >
                          <Icon size={20} />
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </section>
              <section className='bg-stone-200 flex-1 min-h-0 overflow-y-auto p-2'>
               
              </section>
              <section className='p-2 bg-white text-stone-600 text-sm'>
                <DateTimeWidget />
              </section>
            </form>
          </section>
        )
      }
    </main>
  )
}

PeopleChurchAttendance.prototype = {
  setView: PropTypes.func.isRequired
}

export default PeopleChurchAttendance
