import React from 'react'
import Navbar from './Navbar'

const MainLayout = props => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="pt-24 bg-gray-100 min-h-screen px-4 text-gray-800">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default MainLayout