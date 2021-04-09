import React from 'react'

const Content = (props) => {
  return (
    <div className={`main-content ${props.bg ? props.bg : ''}`}>
      <div className="main-content__card">
        <p className="city">{props.city}, {props.country}</p>
        <p className="temperature">{props.celsius}&#8451; - {props.fahrenheit}&#8457;</p>
        <p className="time">{props.time}</p>
        <p className="status">{props.status}</p>
      </div>
    </div>
  )
}

export default Content
