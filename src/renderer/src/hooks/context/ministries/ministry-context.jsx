import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const MinistryContext = createContext(null)

export function MinistryContextProvider({ children }) {
  const [divisions, setDivisions] = useState([])
  const [ministries, setMinistries] = useState([])

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const loadDivisions = useCallback(async () => {
    try {
      const result = await window.api.ministry.getAllDivisions()

      if (result?.success === false) {
        throw new Error(result.message || 'Failed to load divisions')
      }

      console.log('divisions: ', result)

      setDivisions(result?.data ?? result ?? [])
    } catch (error) {
      console.error('Failed to load divisions:', error)
      setError(error.message)
    }
  }, [])

  const loadMinistries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await window.api.ministry.getAllMinistries()
      console.log('ministry: ', result)

      if (result?.success === false) {
        throw new Error(result.message || 'Failed to load ministries')
      }

      setMinistries(result?.data ?? result ?? [])
    } catch (error) {
      console.error('Failed to load ministries:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMinistryData = useCallback(async () => {
    await Promise.all([loadDivisions(), loadMinistries()])
  }, [loadDivisions, loadMinistries])

  const createMinistry = useCallback(
    async (payload) => {
      try {
        setSaving(true)
        setError(null)

        const result = await window.api.ministry.createMinistry(payload)

        if (result?.success === false) {
          throw new Error(result.message || 'Failed to create ministry')
        }

        await loadMinistries()

        return {
          success: true,
          data: result?.data ?? result
        }
      } catch (error) {
        console.error('Failed to create ministry:', error)
        setError(error.message)

        return {
          success: false,
          message: error.message
        }
      } finally {
        setSaving(false)
      }
    },
    [loadMinistries]
  )

  const updateMinistry = useCallback(
    async (payload) => {
      try {
        setSaving(true)
        setError(null)

        const result = await window.api.ministry.updateMinistry(payload)

        if (result?.success === false) {
          throw new Error(result.message || 'Failed to update ministry')
        }

        await loadMinistries()

        return {
          success: true,
          data: result?.data ?? result
        }
      } catch (error) {
        console.error('Failed to update ministry:', error)
        setError(error.message)

        return {
          success: false,
          message: error.message
        }
      } finally {
        setSaving(false)
      }
    },
    [loadMinistries]
  )

  const deleteMinistry = useCallback(
    async (id) => {
      try {
        setSaving(true)
        setError(null)

        const result = await window.api.ministry.deleteMinistry({ id })

        if (result?.success === false) {
          throw new Error(result.message || 'Failed to delete ministry')
        }

        await loadMinistries()

        return {
          success: true,
          data: result?.data ?? result
        }
      } catch (error) {
        console.error('Failed to delete ministry:', error)
        setError(error.message)

        return {
          success: false,
          message: error.message
        }
      } finally {
        setSaving(false)
      }
    },
    [loadMinistries]
  )


  const findMinistry = useCallback(async (id) => {
    try {
      setError(null)

      const result = await window.api.ministry.findMinistry({ id })

      if (result?.success === false) {
        throw new Error(result.message || 'Failed to find ministry')
      }

      return {
        success: true,
        data: result?.data ?? result
      }
    } catch (error) {
      console.error('Failed to find ministry:', error)
      setError(error.message)

      return {
        success: false,
        message: error.message
      }
    }
  }, [])


  useEffect(() => {
    const initialMinistryData = async () => await loadMinistryData()
    initialMinistryData()
  }, [loadMinistryData])

  const value = useMemo(
    () => ({
      ministries,
      divisions,

      loading,
      saving,
      error,

      loadMinistries,
      loadDivisions,
      loadMinistryData,

      createMinistry,
      updateMinistry,
      deleteMinistry,
      findMinistry
    }),
    [
      ministries,
      divisions,
      loading,
      saving,
      error,
      loadMinistries,
      loadDivisions,
      loadMinistryData,
      createMinistry,
      updateMinistry,
      deleteMinistry,
      findMinistry
    ]
  )

  return <MinistryContext.Provider value={value}>{children}</MinistryContext.Provider>
}

MinistryContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MinistryContext
