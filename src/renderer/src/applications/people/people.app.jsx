import React from 'react'

import { ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, User } from 'lucide-react'

import { usePeopleContext } from '../../hooks/context/people/usePeople.js'

const managers = [
  { label: 'visitor', category: 'application' },
  { label: 'member', category: 'application' }
]

const ITEMS_PER_PAGE = 5

const PeopleApplication = () => {
  const { peopleList } = usePeopleContext()

  const [toggleBtn, setToggleBtn] = React.useState('visitor')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchQuery, setSearchQuery] = React.useState('')

  /*
   * Filter by current category
   */
  const filterPeopleList = peopleList.filter((person) => person.status === toggleBtn)

  /*
   * Search within the selected category
   */
  const searchedPeopleList = filterPeopleList.filter((person) => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return true

    return (
      person.fullName?.toLowerCase().includes(query) ||
      person.id?.toLowerCase().includes(query) ||
      person.gender?.toLowerCase().includes(query) ||
      person.maritalStatus?.toLowerCase().includes(query)
    )
  })

  /*
   * Pagination
   */
  const totalPages = Math.ceil(searchedPeopleList.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  const currentPeople = searchedPeopleList.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  /*
   * Reset pagination whenever
   * category or search changes
   */
  React.useEffect(() => {
    setCurrentPage(1)
  }, [toggleBtn, searchQuery])

  const getInitials = (name) => {
    if (!name) return '?'

    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  return (
    <div className="relative flex h-full min-h-0 w-full p-3 bg-stone-50">
      {/* Main */}
      <section className="flex-1 min-w-0 min-h-0 overflow-y-auto">
        {/* Header */}
        <header
          className="
            sticky top-0 z-20
            flex items-center justify-between
            px-5 py-3
            bg-white/90 backdrop-blur-xl
            border border-stone-200/80
            rounded-2xl
            shadow-[0_1px_3px_rgba(0,0,0,0.04)]
          "
        >
          {/* Title */}
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex items-center justify-center
                w-8 h-8
                rounded-xl
                bg-stone-100
                text-stone-600
              "
            >
              <User size={16} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-sm font-semibold text-stone-800">
                {toggleBtn === 'visitor' ? 'Visitors' : 'Members'}
              </h1>

              <p className="text-[11px] text-stone-400">{filterPeopleList.length} people</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Segmented control */}
            <nav>
              <div
                className="
                  flex items-center
                  p-1
                  rounded-xl
                  bg-stone-100
                  border border-stone-200/60
                "
              >
                {managers.map((manager) => {
                  const active = toggleBtn === manager.label

                  return (
                    <button
                      key={manager.label}
                      type="button"
                      onClick={() => setToggleBtn(manager.label)}
                      className={`
                        h-7
                        px-4
                        rounded-lg
                        text-xs
                        font-medium
                        capitalize
                        transition-all
                        duration-200
                        cursor-pointer
                        ${
                          active
                            ? 'bg-white text-stone-900 shadow-sm'
                            : 'text-stone-500 hover:text-stone-800'
                        }
                      `}
                    >
                      {manager.label}
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* Add */}
            <button
              type="button"
              className="
                flex items-center gap-2
                h-8
                px-3
                rounded-lg
                bg-orange-400
                text-sm
                text-white
                border-t border-white
                shadow-lg
                hover:bg-orange-600
                active:bg-orange-800
                cursor-pointer
                transition-colors
              "
            >
              <Plus size={16} />
              Add {toggleBtn}
            </button>
          </div>
        </header>

        {/* Table Card */}
        <section
          className="
            mt-4
            overflow-hidden
            rounded-2xl
            border border-stone-200/80
            bg-white
            shadow-[0_1px_3px_rgba(0,0,0,0.04)]
          "
        >
          {/* Search bar */}
          <div
            className="
              flex items-center justify-between
              px-5 py-3
              border-b border-stone-100
              bg-white
            "
          >
            <div
              className="
                relative
                w-full
                max-w-sm
              "
            >
              <Search
                size={16}
                strokeWidth={1.8}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-stone-400
                  pointer-events-none
                "
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={`Search ${toggleBtn}s...`}
                className="
                  w-full
                  h-9
                  pl-9
                  pr-3
                  rounded-xl
                  border border-stone-200
                  bg-stone-50
                  text-sm
                  text-stone-800
                  placeholder:text-stone-400
                  outline-none
                  transition-all
                  duration-200
                  focus:bg-white
                  focus:border-stone-300
                  focus:ring-2
                  focus:ring-stone-100
                "
              />
            </div>

            {/* Result count */}
            <p
              className="
              ml-4
              shrink-0
              text-xs
              text-stone-400
            "
            >
              {searchedPeopleList.length} results
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Head */}
              <thead>
                <tr>
                  {['Person', 'Gender', 'Marital status', 'Created', 'Actions'].map((heading) => (
                    <th
                      key={heading}
                      className={`
                        px-4 py-3
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-stone-400
                        ${heading === 'Actions' ? 'text-right pr-5' : 'text-left'}
                      `}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {currentPeople.length > 0 ? (
                  currentPeople.map((person) => (
                    <tr
                      key={person.id}
                      className="
                        group
                        border-b border-stone-100
                        last:border-0
                        transition-colors
                        hover:bg-stone-50/70
                      "
                    >
                      {/* Person */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex items-center justify-center
                              h-9 w-9
                              shrink-0
                              rounded-full
                              bg-stone-100
                              text-[11px]
                              font-semibold
                              text-stone-600
                            "
                          >
                            {getInitials(person.fullName)}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                truncate
                                text-sm
                                font-medium
                                text-stone-800
                              "
                            >
                              {person.fullName}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-[11px]
                                text-stone-400
                              "
                            >
                              {person.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Gender */}
                      <td
                        className="
                          px-4 py-4
                          text-sm
                          text-stone-600
                        "
                      >
                        {person.gender || '—'}
                      </td>

                      {/* Marital status */}
                      <td className="px-4 py-4">
                        <span
                          className="
                            inline-flex
                            items-center
                            rounded-full
                            bg-stone-100
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            capitalize
                            text-stone-600
                          "
                        >
                          {person.maritalStatus || '—'}
                        </span>
                      </td>

                      {/* Created */}
                      <td
                        className="
                          px-4 py-4
                          text-sm
                          text-stone-500
                          whitespace-nowrap
                        "
                      >
                        {person.createdAt || '—'}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            justify-end
                            gap-1
                            opacity-0
                            translate-x-1
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all
                            duration-200
                          "
                        >
                          {/* View */}
                          <button
                            type="button"
                            title="View"
                            className="
                              flex items-center justify-center
                              h-8 w-8
                              rounded-lg
                              text-stone-400
                              hover:bg-stone-100
                              hover:text-stone-700
                              transition-colors
                              cursor-pointer
                            "
                          >
                            <Eye size={15} strokeWidth={1.8} />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit"
                            className="
                              flex items-center justify-center
                              h-8 w-8
                              rounded-lg
                              text-stone-400
                              hover:bg-stone-100
                              hover:text-stone-700
                              transition-colors
                              cursor-pointer
                            "
                          >
                            <Pencil size={15} strokeWidth={1.8} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete"
                            className="
                              flex items-center justify-center
                              h-8 w-8
                              rounded-lg
                              text-stone-400
                              hover:bg-red-50
                              hover:text-red-500
                              transition-colors
                              cursor-pointer
                            "
                          >
                            <Trash2 size={15} strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div
                          className="
                            flex items-center justify-center
                            h-12 w-12
                            rounded-2xl
                            bg-stone-100
                            text-stone-400
                          "
                        >
                          <Search size={20} strokeWidth={1.6} />
                        </div>

                        <p
                          className="
                            mt-4
                            text-sm
                            font-medium
                            text-stone-700
                          "
                        >
                          No results found
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-stone-400
                          "
                        >
                          Try searching with a different name or ID.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <footer
            className="
              flex items-center justify-between
              border-t border-stone-100
              px-5 py-3
              bg-stone-50/40
            "
          >
            <p className="text-xs text-stone-400">
              {searchedPeopleList.length === 0
                ? '0'
                : `${startIndex + 1}–${Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    searchedPeopleList.length
                  )}`}{' '}
              of {searchedPeopleList.length}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="
                  flex items-center justify-center
                  h-8 w-8
                  rounded-lg
                  border border-stone-200
                  bg-white
                  text-stone-500
                  hover:bg-stone-50
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  transition-colors
                "
              >
                <ChevronLeft size={15} />
              </button>

              <div
                className="
                  flex items-center justify-center
                  min-w-8 h-8
                  px-2
                  rounded-lg
                  bg-stone-900
                  text-xs
                  font-medium
                  text-white
                "
              >
                {currentPage}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNext}
                className="
                  flex items-center justify-center
                  h-8 w-8
                  rounded-lg
                  border border-stone-200
                  bg-white
                  text-stone-500
                  hover:bg-stone-50
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  transition-colors
                "
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </footer>
        </section>
      </section>
    </div>
  )
}

export default PeopleApplication
