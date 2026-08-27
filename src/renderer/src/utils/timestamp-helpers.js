// 🔹 CORE HELPERS (SINGLE SOURCE OF TRUTH)

// Convert anything → JS Date
export const convertToJSDate = (input) => {
  let date

  if (input instanceof Date) {
    date = input
  } else if (typeof input === 'number') {
    // Unix (seconds or ms)
    date = input < 1e12 ? new Date(input * 1000) : new Date(input)
  } else if (typeof input === 'string') {
    // SQL or ISO
    date = new Date(input.replace(' ', 'T'))
  } else {
    throw new Error('Invalid date input')
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date value')
  }

  return date
}

// Convert anything → SQL timestamp (YYYY-MM-DD HH:mm:ss)
export const normalizeToSQLTimestamp = (input) => {
  const date = convertToJSDate(input)

  const pad = (n) => String(n).padStart(2, '0')

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  )
}

// BUILD / SPLIT (FOR FORMS)

// Build SQL timestamp from inputs
export const buildTimestamp = (date, time) => {
  if (!date) throw new Error('Date required')

  const normalizedTime = time ? (time.length === 5 ? `${time}:00` : time) : '00:00:00'

  return `${date} ${normalizedTime}`
}

// Split timestamp → form fields
export const splitTimestamp = (timestamp) => {
  if (!timestamp) return { date: '', time: '' }

  const [date, time] = timestamp.split(' ')

  return {
    date: date || '',
    time: time?.slice(0, 5) || ''
  }
}

// Extract parts
export const getDateOnly = (timestamp) => {
  return timestamp.split(' ')[0] || ''
}

export const getTimeOnly = (timestamp) => {
  return timestamp.split(' ')[1] || ''
}

// ==============================
// 🔹 NOW / CURRENT TIME
// ==============================

export const nowTimestamp = () => {
  return normalizeToSQLTimestamp(new Date())
}

export const nowUnix = (inSeconds = false) => {
  const ms = Date.now()
  return inSeconds ? Math.floor(ms / 1000) : ms
}

// ==============================
// 🔹 UNIX CONVERSIONS
// ==============================

export const toUnix = (timestamp, inSeconds = false) => {
  const ms = convertToJSDate(timestamp).getTime()
  return inSeconds ? Math.floor(ms / 1000) : ms
}

export const fromUnix = (timestamp) => {
  return normalizeToSQLTimestamp(timestamp)
}

// VALIDATION

export const isValidTimestamp = (timestamp) => {
  // Start at the beginning of the string and check for YYYY-MM-DD HH:mm:ss format
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

  if (!regex.test(timestamp)) {
    return {
      isValidTimestamp: false,
      error: 'Invalid format',
      input: timestamp
    }
  }

  try {
    const jsDate = convertToJSDate(timestamp)

    return {
      isValidTimestamp: !isNaN(jsDate.getTime()),
      input: timestamp,
      output: normalizeToSQLTimestamp(jsDate)
    }
  } catch {
    return {
      isValidTimestamp: false,
      error: 'Invalid date',
      input: timestamp
    }
  }
}

// COMPARISON (STRING SAFE)

export const isBefore = (a, b) => {
  return convertToJSDate(a).getTime() < convertToJSDate(b).getTime()
}

export const isAfter = (a, b) => {
  return convertToJSDate(a).getTime() > convertToJSDate(b).getTime()
}

export const isSameDay = (a, b) => {
  return getDateOnly(a) === getDateOnly(b)
}

export const compareTimestamps = (a, b) => {
  return convertToJSDate(a).getTime() - convertToJSDate(b).getTime()
}

// RANGE / FILTERING (STRING BASED)

export const isWithinRange = (timestamp, start, end) => {
  const t = convertToJSDate(timestamp).getTime()

  return t >= convertToJSDate(start).getTime() && t <= convertToJSDate(end).getTime()
}

export const startOfDay = (date) => {
  return `${date} 00:00:00`
}

export const endOfDay = (date) => {
  return `${date} 23:59:59`
}

// For UI readability
export const formatDateTime = (timestamp) => {
  const date = convertToJSDate(timestamp)

  return date.toLocaleString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
