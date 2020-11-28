import React, { useState, useEffect } from 'react'

const Header = ({ timestamp, buttonHandler }) => {
  const [time, setTime] = useState(Date.now())

  const formatTimestamp = (oldTime, newTime) => {
    const date = new Date(oldTime)
    let timeDelta = (newTime - oldTime) / 1000
    const minutes = Math.floor(timeDelta / 60)
    timeDelta -= minutes * 60
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
        {formatTimestamp(timestamp, time)}
      </div>
      <div>
        <button type="submit" onClick={buttonHandler}>
          Update
        </button>
      </div>
    </div>
  )
}

export default Header
