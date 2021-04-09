import React from 'react'

const Sidebar = (props) => {
  const cities = ['Kuala Lumpur', 'Paris', 'New York', 'Miami', 'San Francisco', 'Moscow', 'Tokyo', 'Vancouver']
  return (
    <nav id="sidebar">
      {cities.map((item) => <button key={item} onClick={() => props.getCity(item)}>{item}</button>)}
    </nav>
  )
}

export default Sidebar
