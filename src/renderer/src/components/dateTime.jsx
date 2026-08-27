import { Calendar, Clock } from 'lucide-react'
import React from 'react'

const DateTimeWidget = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-1">
        <Clock size={16} />
        <p>{currentDateTime.toLocaleTimeString()}</p>
      </div>
      <div className="flex items-center gap-1">
        <Calendar size={16} />
        {currentDateTime.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  )
}

export default DateTimeWidget
