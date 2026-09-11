import { useMemo, useState } from 'react'
import {
  Bolt,
  Check,
  ChevronLeft,
  ChevronRight,
  Church,
  MoreHorizontal,
  Search,
  Users,
  X
} from 'lucide-react'

import { MinimalKPI } from '../../components/kpi'

const ITEMS_PER_PAGE = 8

const MINISTRIES = [
  {
    id: 'min-001',
    name: 'Deliverance Ministry',
    division: 'Spiritual Affairs Division',
    members: 54,
    growth: 'Formation',
    createdAt: '12 Jan 2026'
  },
  {
    id: 'min-002',
    name: 'Worship Ministry',
    division: 'Creative Arts Division',
    members: 86,
    growth: 'Growing',
    createdAt: '18 Jan 2026'
  },
  {
    id: 'min-003',
    name: 'Youth Ministry',
    division: 'Next Generation Division',
    members: 124,
    growth: 'Growing',
    createdAt: '24 Jan 2026'
  },
  {
    id: 'min-004',
    name: 'Children Ministry',
    division: 'Next Generation Division',
    members: 97,
    growth: 'Growing',
    createdAt: '02 Feb 2026'
  },
  {
    id: 'min-005',
    name: 'Men Ministry',
    division: 'Family Division',
    members: 73,
    growth: 'Stable',
    createdAt: '08 Feb 2026'
  },
  {
    id: 'min-006',
    name: 'Women Ministry',
    division: 'Family Division',
    members: 112,
    growth: 'Growing',
    createdAt: '14 Feb 2026'
  },
  {
    id: 'min-007',
    name: 'Prayer Ministry',
    division: 'Spiritual Affairs Division',
    members: 68,
    growth: 'Growing',
    createdAt: '21 Feb 2026'
  },
  {
    id: 'min-008',
    name: 'Evangelism Ministry',
    division: 'Outreach Division',
    members: 61,
    growth: 'Growing',
    createdAt: '04 Mar 2026'
  },
  {
    id: 'min-009',
    name: 'Missions Ministry',
    division: 'Outreach Division',
    members: 42,
    growth: 'Stable',
    createdAt: '11 Mar 2026'
  },
  {
    id: 'min-010',
    name: 'Media Ministry',
    division: 'Creative Arts Division',
    members: 38,
    growth: 'Growing',
    createdAt: '19 Mar 2026'
  },
  {
    id: 'min-011',
    name: 'Hospitality Ministry',
    division: 'Operations Division',
    members: 46,
    growth: 'Stable',
    createdAt: '26 Mar 2026'
  },
  {
    id: 'min-012',
    name: 'Protocol Ministry',
    division: 'Operations Division',
    members: 31,
    growth: 'Stable',
    createdAt: '02 Apr 2026'
  },
  {
    id: 'min-013',
    name: 'Intercession Ministry',
    division: 'Spiritual Affairs Division',
    members: 59,
    growth: 'Growing',
    createdAt: '09 Apr 2026'
  },
  {
    id: 'min-014',
    name: 'Discipleship Ministry',
    division: 'Spiritual Affairs Division',
    members: 77,
    growth: 'Growing',
    createdAt: '16 Apr 2026'
  },
  {
    id: 'min-015',
    name: 'Young Adults Ministry',
    division: 'Next Generation Division',
    members: 91,
    growth: 'Growing',
    createdAt: '24 Apr 2026'
  },
  {
    id: 'min-016',
    name: 'Leadership Ministry',
    division: 'Leadership Division',
    members: 28,
    growth: 'Stable',
    createdAt: '03 May 2026'
  },
  {
    id: 'min-017',
    name: 'Care Ministry',
    division: 'Family Division',
    members: 36,
    growth: 'Formation',
    createdAt: '10 May 2026'
  },
  {
    id: 'min-018',
    name: 'Counselling Ministry',
    division: 'Family Division',
    members: 24,
    growth: 'Stable',
    createdAt: '17 May 2026'
  },
  {
    id: 'min-019',
    name: 'Security Ministry',
    division: 'Operations Division',
    members: 35,
    growth: 'Stable',
    createdAt: '24 May 2026'
  },
  {
    id: 'min-020',
    name: 'Technical Ministry',
    division: 'Creative Arts Division',
    members: 29,
    growth: 'Growing',
    createdAt: '31 May 2026'
  },
  {
    id: 'min-021',
    name: 'Transport Ministry',
    division: 'Operations Division',
    members: 22,
    growth: 'Stable',
    createdAt: '07 Jun 2026'
  },
  {
    id: 'min-022',
    name: 'Community Ministry',
    division: 'Outreach Division',
    members: 55,
    growth: 'Growing',
    createdAt: '14 Jun 2026'
  },
  {
    id: 'min-023',
    name: 'Food Ministry',
    division: 'Operations Division',
    members: 41,
    growth: 'Stable',
    createdAt: '21 Jun 2026'
  },
  {
    id: 'min-024',
    name: 'Education Ministry',
    division: 'Leadership Division',
    members: 48,
    growth: 'Growing',
    createdAt: '28 Jun 2026'
  },
  {
    id: 'min-025',
    name: 'Bible Study Ministry',
    division: 'Spiritual Affairs Division',
    members: 64,
    growth: 'Growing',
    createdAt: '05 Jul 2026'
  },
  {
    id: 'min-026',
    name: 'Singles Ministry',
    division: 'Family Division',
    members: 58,
    growth: 'Growing',
    createdAt: '12 Jul 2026'
  },
  {
    id: 'min-027',
    name: 'Marriage Ministry',
    division: 'Family Division',
    members: 33,
    growth: 'Stable',
    createdAt: '19 Jul 2026'
  },
  {
    id: 'min-028',
    name: 'Finance Ministry',
    division: 'Operations Division',
    members: 19,
    growth: 'Formation',
    createdAt: '26 Jul 2026'
  },
  {
    id: 'min-029',
    name: 'Prayer Warriors',
    division: 'Spiritual Affairs Division',
    members: 82,
    growth: 'Growing',
    createdAt: '02 Aug 2026'
  },
  {
    id: 'min-030',
    name: 'Outreach Ministry',
    division: 'Outreach Division',
    members: 71,
    growth: 'Growing',
    createdAt: '09 Aug 2026'
  }
]

const GROWTH_STYLES = {
  Growing: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Stable: 'bg-stone-100 text-stone-600 ring-stone-200',
  Formation: 'bg-orange-50 text-orange-700 ring-orange-200'
}

const getInitial = (name) => name.charAt(0).toUpperCase()

const MinistryPage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Map<ministryId, ministry>
  const [selectedMinistries, setSelectedMinistries] = useState(new Map())

  const filteredMinistries = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return MINISTRIES

    return MINISTRIES.filter((ministry) => {
      return (
        ministry.name.toLowerCase().includes(query) ||
        ministry.division.toLowerCase().includes(query) ||
        ministry.growth.toLowerCase().includes(query)
      )
    })
  }, [search])

  const totalPages = Math.max(1, Math.ceil(filteredMinistries.length / ITEMS_PER_PAGE))

  const paginatedMinistries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE

    return filteredMinistries.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredMinistries, currentPage])

  const pageSelected = paginatedMinistries.filter((ministry) => selectedMinistries.has(ministry.id))

  const allPageSelected =
    paginatedMinistries.length > 0 && pageSelected.length === paginatedMinistries.length

  const somePageSelected =
    pageSelected.length > 0 && pageSelected.length < paginatedMinistries.length

  const toggleSelection = (ministry) => {
    setSelectedMinistries((previous) => {
      const next = new Map(previous)

      if (next.has(ministry.id)) {
        next.delete(ministry.id)
      } else {
        next.set(ministry.id, ministry)
      }

      return next
    })
  }

  const toggleSelectAll = () => {
    setSelectedMinistries((previous) => {
      const next = new Map(previous)

      if (allPageSelected) {
        paginatedMinistries.forEach((ministry) => {
          next.delete(ministry.id)
        })
      } else {
        paginatedMinistries.forEach((ministry) => {
          next.set(ministry.id, ministry)
        })
      }

      return next
    })
  }

  const clearSelection = () => {
    setSelectedMinistries(new Map())
  }

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages))
  }

  return (
    <div className="min-h-full w-full bg-stone-50 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm">
              <Church size={20} strokeWidth={1.8} className="text-stone-700" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-stone-800">
                Ministry Management
              </h1>

              <p className="mt-0.5 text-sm text-stone-500">
                Manage ministries, assignments and membership.
              </p>
            </div>
          </div>
        </section>

        {/* KPI */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <MinimalKPI title="Total Divisions" value="6" change="+8.4%" trend="up" icon={Church} />

          <MinimalKPI
            title="Total Ministries"
            value={MINISTRIES.length.toLocaleString()}
            change="+12.5%"
            trend="up"
            icon={Users}
          />

          <MinimalKPI title="Active Members" value="1,482" change="+9.2%" trend="up" icon={Users} />

          <MinimalKPI title="New Ministries" value="4" change="+33.3%" trend="up" icon={Bolt} />
        </section>

        {/* Table container */}
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {/* Toolbar */}
          <div className="border-b border-stone-200">
            <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  Ministry List
                </h2>

                <p className="mt-0.5 text-xs text-stone-400">
                  {filteredMinistries.length} ministries
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search */}
                <div className="flex h-9 min-w-72 items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 transition focus-within:border-stone-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-stone-100">
                  <Search size={15} className="shrink-0 text-stone-400" />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder="Search ministries..."
                    className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => handleSearch('')}
                      className="rounded-md p-0.5 text-stone-400 hover:bg-stone-200 hover:text-stone-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  disabled={selectedMinistries.size === 0}
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
                >
                  <Bolt size={15} />
                  Actions
                </button>
              </div>
            </div>

            {/* Selection toolbar */}
            {selectedMinistries.size > 0 && (
              <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/80 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-semibold text-white">
                    {selectedMinistries.size}
                  </div>

                  <span className="text-sm font-medium text-stone-700">
                    {selectedMinistries.size === 1 ? 'Ministry selected' : 'Ministries selected'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs font-medium text-stone-500 transition hover:text-stone-900"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/60 text-left">
                  <th className="w-[42%] px-5 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        aria-label="Select all ministries"
                        className={`
                          flex size-4 items-center justify-center rounded-[4px] border transition
                          ${
                            allPageSelected || somePageSelected
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-300 bg-white hover:border-stone-500'
                          }
                        `}
                      >
                        {allPageSelected && <Check size={11} strokeWidth={3} />}

                        {somePageSelected && !allPageSelected && (
                          <span className="block h-[2px] w-2 rounded-full bg-white" />
                        )}
                      </button>

                      <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Ministry
                      </span>
                    </div>
                  </th>

                  <th className="px-5 py-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                      Members
                    </span>
                  </th>

                  <th className="px-5 py-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                      Growth
                    </span>
                  </th>

                  <th className="px-5 py-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                      Created
                    </span>
                  </th>

                  <th className="w-12 px-5 py-3" />
                </tr>
              </thead>

              <tbody>
                {paginatedMinistries.map((ministry) => {
                  const isSelected = selectedMinistries.has(ministry.id)

                  return (
                    <tr
                      key={ministry.id}
                      onClick={() => toggleSelection(ministry)}
                      className={`
                        group cursor-pointer border-b border-stone-100 transition-colors last:border-0
                        ${isSelected ? 'bg-stone-50' : 'hover:bg-stone-50/70'}
                      `}
                    >
                      {/* Ministry */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* Checkbox */}
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              toggleSelection(ministry)
                            }}
                            aria-label={`Select ${ministry.name}`}
                            className={`
                              flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition
                              ${
                                isSelected
                                  ? 'border-stone-900 bg-stone-900 text-white'
                                  : 'border-stone-300 bg-white group-hover:border-stone-400'
                              }
                            `}
                          >
                            {isSelected && <Check size={11} strokeWidth={3} />}
                          </button>

                          {/* Avatar */}
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-600 ring-1 ring-inset ring-stone-200">
                            {getInitial(ministry.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-stone-700">
                              {ministry.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-stone-400">
                              {ministry.division}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Members */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium tabular-nums text-stone-600">
                          {ministry.members}
                        </span>
                      </td>

                      {/* Growth */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center rounded-full px-2.5 py-1
                            text-[11px] font-medium ring-1 ring-inset
                            ${GROWTH_STYLES[ministry.growth]}
                          `}
                        >
                          {ministry.growth}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-stone-500">{ministry.createdAt}</span>
                      </td>

                      {/* More */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                          }}
                          className="flex size-8 items-center justify-center rounded-lg text-stone-300 opacity-0 transition hover:bg-stone-100 hover:text-stone-600 group-hover:opacity-100"
                          aria-label={`More actions for ${ministry.name}`}
                        >
                          <MoreHorizontal size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Empty state */}
            {paginatedMinistries.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-stone-100">
                  <Search size={18} className="text-stone-400" />
                </div>

                <p className="text-sm font-medium text-stone-700">No ministries found</p>

                <p className="mt-1 text-xs text-stone-400">
                  Try searching for a different ministry or division.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-stone-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-stone-400">
              Showing{' '}
              <span className="font-medium text-stone-600">
                {filteredMinistries.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium text-stone-600">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredMinistries.length)}
              </span>{' '}
              of <span className="font-medium text-stone-600">{filteredMinistries.length}</span>
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="flex size-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 transition hover:bg-stone-50 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`
                    flex size-8 items-center justify-center rounded-lg text-xs font-medium transition
                    ${
                      page === currentPage
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="flex size-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 transition hover:bg-stone-50 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MinistryPage
