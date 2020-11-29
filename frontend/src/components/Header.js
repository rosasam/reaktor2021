import React, { useState, useEffect } from 'react'

const Header = ({ timestamp, buttonHandler }) => {
  const [time, setTime] = useState(Date.now())

  const formatTimestamp = (oldTime, newTime) => {
    const date = new Date(oldTime)
    const timeDelta = Math.max((newTime - oldTime) / 1000, 0)
    const minutes = Math.floor(timeDelta / 60)
    return `Data last updated: ${date.toUTCString()} (${minutes} minute${minutes === 1 ? '' : 's'} ago)`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 60000)
    return () => clearInterval(interval)
  }, [time])

  return (
    <div className="header">
      <div>
        {timestamp ? formatTimestamp(timestamp, time) : ''}
        <button type="submit" onClick={buttonHandler}>
          Update
        </button>
      </div>
    </div>
  )
}

export default Header
