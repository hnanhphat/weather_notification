import React from 'react'

const Header = (props) => {
  return (
    <header>
      <a href="." className="logo">
        <img src={props.logo} alt="Weather Notification"/>
      </a>
      <nav className="directory">
        <a href=".">Features</a>
        <a href=".">Pricing</a>
        <a href=".">Profile</a>
        <a href=".">Settings</a>
      </nav>
    </header>
  )
}

export default Header