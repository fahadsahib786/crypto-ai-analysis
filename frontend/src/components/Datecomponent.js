import React from 'react'

const Datecomponent = ({isoDate}) => {
    console.log(isoDate)
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      })
  console.log(formattedDate)
  return (
    <>
          {
            formattedDate
          }
    </>
  )
}

export default Datecomponent