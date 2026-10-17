import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Search,
  Plus,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  LayoutGrid,
  List,
  Check,
  X,
  Users,
  ArrowUpRight,
  UserCheck,
  LoaderCircle,
  BookA,
  Edit,
  Calendar
} from 'lucide-react'

import { usePeopleContext } from '../../../hooks/context/people/usePeople'

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50]

const MANAGERS = [
  { label: 'visitor', title: 'Visitors' },
  { label: 'member', title: 'Members' }
]

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || '?'

const getDisplayDate = (value) => {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return String(value)

  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const PersonAvatar = ({ name }) => (
  <div
    aria-hidden="true"
    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-xs font-semibold tracking-wide text-stone-700"
  >
    {getInitials(name)}
  </div>
)

PersonAvatar.propTypes = {
  name: PropTypes.string
}

const ActionButton = ({ icon: Icon, label, onClick, danger = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
      danger ? 'text-red-600 hover:bg-red-50' : 'text-stone-700 hover:bg-stone-100'
    }`}
  >
    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
    {label}
  </button>
)

ActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  danger: PropTypes.bool
}

const PersonActions = ({ onView, onEdit, onDelete }) => (
  <details className="group/actions relative">
    <summary
      aria-label="Open person actions"
      title="More actions"
      className="flex size-9 cursor-pointer list-none items-center justify-center rounded-xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 [&::-webkit-details-marker]:hidden"
    >
      <MoreHorizontal size={19} aria-hidden="true" />
    </summary>

    <div className="absolute right-0 top-10 z-30 w-48 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl shadow-stone-900/10">
      <ActionButton icon={Eye} label="View profile" onClick={onView} />
      <ActionButton icon={Pencil} label="Edit details" onClick={onEdit} />

      <div className="my-1 border-t border-stone-100" />

      <ActionButton icon={Trash2} label="Delete person" onClick={onDelete} danger />
    </div>
  </details>
)

PersonActions.propTypes = {
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const PeopleApplication = ({ setView, setFormMode }) => {
  const { peopleList, findPersonProfileById, deletePeople, setPeopleTemplate } = usePeopleContext()

  const [activeType, setActiveType] = useState('visitor')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [viewMode, setViewMode] = useState('table')
  const [isWorking, setIsWorking] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Protect the UI from a temporarily null or non-array context value.
  const people = Array.isArray(peopleList) ? peopleList : []

  const filteredPeople = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return people.filter((person) => {
      if (person.status !== activeType) return false
      if (!query) return true

      return [person.fullName, person.id, person.gender, person.maritalStatus].some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(query)
      )
    })
  }, [people, activeType, searchQuery])

  const totalPages = Math.ceil(filteredPeople.length / pageSize)
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1))

  const currentPeople = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredPeople.slice(start, start + pageSize)
  }, [filteredPeople, safePage, pageSize])

  const visibleIds = currentPeople.map((person) => person.id)

  const selectedVisibleCount = visibleIds.filter((id) => selectedIds.has(id)).length

  const allVisibleSelected = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length

  const someVisibleSelected = selectedVisibleCount > 0

  const selectedCount = selectedIds.size

  const rangeStart = filteredPeople.length ? (safePage - 1) * pageSize + 1 : 0

  const rangeEnd = Math.min(safePage * pageSize, filteredPeople.length)

  useEffect(() => {
    setCurrentPage(1)
    setSelectedIds(new Set())
  }, [activeType, searchQuery, pageSize])

  // Remove IDs that no longer exist in the data source.
  useEffect(() => {
    const existingIds = new Set(people.map((person) => person.id))

    setSelectedIds((previous) => {
      const next = new Set([...previous].filter((id) => existingIds.has(id)))

      return next.size === previous.size ? previous : next
    })
  }, [people])

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(1, totalPages)))
  }, [totalPages])

  const togglePerson = useCallback((id) => {
    setSelectedIds((previous) => {
      const next = new Set(previous)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }, [])

  const toggleVisiblePeople = () => {
    setSelectedIds((previous) => {
      const next = new Set(previous)

      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id))
      } else {
        visibleIds.forEach((id) => next.add(id))
      }

      return next
    })
  }

  const clearSelection = () => setSelectedIds(new Set())

  const handleAdd = () => {
    setFormMode('register')
    setView(activeType === 'member' ? 'membershipForm' : 'visitorForm')
  }

  const handleView = async (person) => {
    setErrorMessage('')
    setIsWorking(true)

    try {
      const result = await findPersonProfileById(person.id)

      if (!result) {
        throw new Error('The person profile could not be found.')
      }

      setPeopleTemplate(result)
      setView('peopleProfile')
    } catch (error) {
      setErrorMessage(error.message || 'Unable to open this profile.')
    } finally {
      setIsWorking(false)
    }
  }

  const handleEdit = async (person) => {
    setErrorMessage('')
    setIsWorking(true)

    try {
      const result = await findPersonProfileById(person.id)

      if (!result) {
        throw new Error('The person profile could not be found.')
      }

      setPeopleTemplate(result)
      setFormMode('edit')
      setView(activeType === 'member' ? 'membershipForm' : 'visitorForm')
    } catch (error) {
      setErrorMessage(error.message || 'Unable to edit this profile.')
    } finally {
      setIsWorking(false)
    }
  }

  const handleDelete = async (person) => {
    const confirmed = window.confirm(
      `Delete ${person.fullName || 'this person'}? This action may not be reversible.`
    )

    if (!confirmed) return

    setErrorMessage('')
    setIsWorking(true)

    try {
      const result = await deletePeople(person.id)

      if (result === false) {
        throw new Error('The person could not be deleted.')
      }

      setSelectedIds((previous) => {
        const next = new Set(previous)
        next.delete(person.id)
        return next
      })
    } catch (error) {
      setErrorMessage(error.message || 'Unable to delete this person.')
    } finally {
      setIsWorking(false)
    }
  }

  const handleBulkDelete = async () => {
    const peopleToDelete = people.filter((person) => selectedIds.has(person.id))

    if (!peopleToDelete.length) return

    const confirmed = window.confirm(
      `Delete ${peopleToDelete.length} selected ${
        peopleToDelete.length === 1 ? 'person' : 'people'
      }? This action may not be reversible.`
    )

    if (!confirmed) return

    setErrorMessage('')
    setIsWorking(true)

    try {
      const results = await Promise.allSettled(
        peopleToDelete.map((person) => deletePeople(person.id))
      )

      const failedIds = results.flatMap((result, index) => {
        if (result.status === 'rejected' || result.value === false) {
          return [peopleToDelete[index].id]
        }

        return []
      })

      setSelectedIds(new Set(failedIds))

      if (failedIds.length) {
        setErrorMessage(
          `${failedIds.length} person(s) could not be deleted. Failed records remain selected.`
        )
      }
    } catch {
      setErrorMessage('Some records could not be deleted. Please try again.')
    } finally {
      setIsWorking(false)
    }
  }

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages || 1)))
  }

  const pageNumbers = useMemo(() => {
    const pages = new Set([1, totalPages, safePage - 1, safePage, safePage + 1])

    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b)
      .reduce((items, page, index, array) => {
        if (index > 0 && page - array[index - 1] > 1) {
          items.push('ellipsis-' + page)
        }

        items.push(page)
        return items
      }, [])
  }, [safePage, totalPages])

  return (
    <main className="min-h-full bg-stone-50/80 p-4 text-stone-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Workspace heading */}
        <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white shadow-sm">
              <Users size={21} strokeWidth={1.7} aria-hidden="true" />
            </div>

            <div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">People</h1>
              <p className="mt-1 text-sm text-stone-500">
                Manage your visitors and church membership.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Choose people category"
              className="inline-flex rounded-xl border border-stone-200 bg-white p-1 shadow-sm"
            >
              {MANAGERS.map((manager) => {
                const active = activeType === manager.label

                return (
                  <button
                    key={manager.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveType(manager.label)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                      active
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    {manager.title}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="text-sm inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
            >
              <Plus size={16} aria-hidden="true" />
              Add {activeType}
            </button>
            <button
              type="button"
              title="click to view attendance"
              onClick={() => {
                setView('church-attendance')
              }}
              className="size-10 rounded-xl border-t border-stone-300 cursor-pointer shadow bg-white flex items-center justify-center active:opacity-20 transition-opacity"
            >
              <Calendar size={16} />
            </button>
          </div>
        </header>

        {/* Summary strip */}
        <section aria-label="People overview" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-500">
                Total {activeType === 'visitor' ? 'visitors' : 'members'}
              </p>
              <UserRound size={17} className="text-stone-400" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {people.filter((person) => person.status === activeType).length}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-500">Matching records</p>
              <Search size={17} className="text-stone-400" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{filteredPeople.length}</p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-500">Selected</p>
              <UserCheck size={17} className="text-stone-400" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{selectedCount}</p>
          </div>
        </section>

        {/* Main data workspace */}
        <section className="overflow-visible rounded-2xl border border-stone-200/80 bg-white shadow-sm shadow-stone-900/[0.03]">
          {/* Search and view controls */}
          <div className="flex flex-col gap-4 border-b border-stone-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold">
                {activeType === 'visitor' ? 'Visitor directory' : 'Member directory'}
              </h2>
              <p className="mt-1 text-xs text-stone-500">
                Search, select and manage individual records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block w-full sm:w-80">
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <span className="sr-only">Search {activeType}s</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${activeType}s by name or ID...`}
                  className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50/70 pl-10 pr-10 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-200 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}
              </label>

              <div
                role="group"
                aria-label="Change directory layout"
                className="flex h-11 items-center rounded-xl border border-stone-200 bg-white p-1"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  aria-pressed={viewMode === 'table'}
                  aria-label="Table view"
                  title="Table view"
                  className={`flex size-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                    viewMode === 'table'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  <List size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  aria-pressed={viewMode === 'cards'}
                  aria-label="Card view"
                  title="Card view"
                  className={`flex size-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                    viewMode === 'cards'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  <LayoutGrid size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Selection toolbar */}
          {selectedCount > 0 && (
            <div className="flex flex-col gap-3 border-b border-stone-200 bg-stone-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-stone-900 text-white">
                  <Check size={16} aria-hidden="true" />
                </div>
                <p className="text-sm font-medium">
                  {selectedCount} {selectedCount === 1 ? 'person' : 'people'} selected
                </p>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs font-medium text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                >
                  Clear selection
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isWorking}
                  onClick={handleBulkDelete}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  {isWorking ? (
                    <LoaderCircle size={15} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 size={15} aria-hidden="true" />
                  )}
                  Delete selected
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="m-4 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <p>{errorMessage}</p>
              <button
                type="button"
                onClick={() => setErrorMessage('')}
                aria-label="Dismiss error"
                className="rounded p-1 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          {isWorking && (
            <div className="sr-only" role="status" aria-live="polite">
              Processing person record…
            </div>
          )}

          {/* Table layout */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto h-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">
                  {activeType === 'visitor' ? 'Visitors' : 'Members'} directory
                </caption>

                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/60">
                    <th scope="col" className="w-12 px-5 py-3">
                      <input
                        type="checkbox"
                        checked={allVisibleSelected}
                        ref={(element) => {
                          if (element) {
                            element.indeterminate = someVisibleSelected && !allVisibleSelected
                          }
                        }}
                        onChange={toggleVisiblePeople}
                        aria-label="Select all people on this page"
                        className="size-4 cursor-pointer rounded border-stone-300 accent-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                      />
                    </th>
                    {['Person', 'Gender', 'Marital status', 'Created'].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400"
                      >
                        {heading}
                      </th>
                    ))}
                    <th scope="col" className="w-16 px-5 py-3 text-right">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {currentPeople.map((person) => {
                    const selected = selectedIds.has(person.id)

                    return (
                      <tr
                        key={person.id}
                        onClick={() => togglePerson(person.id)}
                        className={`group cursor-pointer transition-colors ${
                          selected ? 'bg-stone-100/80' : 'hover:bg-stone-50/80'
                        }`}
                      >
                        <td className="px-5 py-4" onClick={(event) => event.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => togglePerson(person.id)}
                            aria-label={`Select ${person.fullName || 'person'}`}
                            className="size-4 cursor-pointer rounded border-stone-300 accent-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                          />
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <PersonAvatar name={person.fullName} />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-stone-800">
                                {person.fullName || 'Unnamed person'}
                              </p>
                              <p className="mt-1 truncate font-mono text-[11px] text-stone-400">
                                {person.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-stone-600">{person.gender || '—'}</td>

                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs capitalize text-stone-600">
                            {person.maritalStatus || '—'}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-stone-500">
                          {getDisplayDate(person.createdAt)}
                        </td>

                        <td className="px-5 py-3" onClick={(event) => event.stopPropagation()}>
                          <ul className="flex items-center gap-2 text-stone-600">
                            {[
                              {
                                label: 'view profile',
                                icon: Eye,
                                oncall: () => handleView(person)
                              },
                              {
                                label: 'edit profile',
                                icon: Edit,
                                oncall: () => handleEdit(person)
                              }
                            ].map(({ label, icon: Icon, oncall }) => (
                              <li key={label}>
                                <button
                                  title={label}
                                  type="button"
                                  aria-label={label}
                                  onClick={oncall}
                                  className="size-10 flex items-center justify-center border border-stone-200 shadow cursor-pointer rounded-lg "
                                >
                                  <Icon size={20} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Card layout */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {currentPeople.map((person) => {
                const selected = selectedIds.has(person.id)

                return (
                  <article
                    key={person.id}
                    onClick={() => togglePerson(person.id)}
                    className={`min-w-0 cursor-pointer rounded-2xl border p-4 transition duration-200 ${
                      selected
                        ? 'border-stone-500 bg-stone-50 ring-1 ring-stone-300'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <label
                        className="flex min-w-0 items-center gap-3"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => togglePerson(person.id)}
                          aria-label={`Select ${person.fullName || 'person'}`}
                          className="size-4 shrink-0 cursor-pointer accent-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                        />
                        <PersonAvatar name={person.fullName} />
                      </label>

                      <div onClick={(event) => event.stopPropagation()}>
                        <PersonActions
                          onView={() => handleView(person)}
                          onEdit={() => handleEdit(person)}
                          onDelete={() => handleDelete(person)}
                        />
                      </div>
                    </div>

                    <div className="mt-4 min-w-0">
                      <h3 className="truncate text-sm font-semibold text-stone-900">
                        {person.fullName || 'Unnamed person'}
                      </h3>
                      <p className="mt-1 truncate font-mono text-[11px] text-stone-400">
                        {person.id}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4">
                      <div>
                        <p className="text-[11px] text-stone-400">Gender</p>
                        <p className="mt-1 text-sm text-stone-700">{person.gender || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-stone-400">Marital status</p>
                        <p className="mt-1 truncate text-sm capitalize text-stone-700">
                          {person.maritalStatus || '—'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-xs text-stone-400">Created</span>
                      <span className="text-xs text-stone-600">
                        {getDisplayDate(person.createdAt)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleView(person)
                      }}
                      className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                    >
                      View profile
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  </article>
                )
              })}
            </div>
          )}

          {/* Empty state */}
          {currentPeople.length === 0 && (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400">
                <Search size={20} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-stone-800">
                {searchQuery ? 'No matching people' : `No ${activeType}s yet`}
              </h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-stone-500">
                {searchQuery
                  ? 'Try another name or ID, or clear your search to see all records.'
                  : `When you add a ${activeType}, their information will appear here.`}
              </p>
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-lg px-3 py-2 text-sm font-medium text-stone-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                >
                  Clear search
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                >
                  <Plus size={16} aria-hidden="true" />
                  Add {activeType}
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          <footer className="flex flex-col gap-4 border-t border-stone-100 bg-stone-50/50 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-xs text-stone-500" aria-live="polite" aria-atomic="true">
                Showing{' '}
                <span className="font-semibold text-stone-800">
                  {rangeStart}–{rangeEnd}
                </span>{' '}
                of <span className="font-semibold text-stone-800">{filteredPeople.length}</span>
              </p>

              <label className="flex items-center gap-2 text-xs text-stone-500">
                Rows per page
                <select
                  value={pageSize}
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  className="h-8 rounded-lg border border-stone-200 bg-white px-2 text-xs font-medium text-stone-700 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <nav
              aria-label="People directory pagination"
              className="flex flex-wrap items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1 || totalPages === 0}
                aria-label="Go to previous page"
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 text-xs font-medium text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                <ChevronLeft size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {pageNumbers.map((page) =>
                typeof page === 'string' ? (
                  <span
                    key={page}
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center text-xs text-stone-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={safePage === page ? 'page' : undefined}
                    className={`flex size-9 items-center justify-center rounded-xl text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                      safePage === page
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages || totalPages === 0}
                aria-label="Go to next page"
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 text-xs font-medium text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </nav>
          </footer>
        </section>

        <p className="px-1 text-xs text-stone-400">
          Changes made here are managed through your existing people context.
        </p>
      </div>
    </main>
  )
}

PeopleApplication.propTypes = {
  setView: PropTypes.func.isRequired,
  setFormMode: PropTypes.func.isRequired
}

export default PeopleApplication
