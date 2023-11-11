import React from 'react'
import Heading from './parts/Heading'
import { Outlet } from 'react-router-dom'

const MainContainer = () => {
  return (
    <div className='main-container'>
      <Heading/>
      <Outlet/>
    </div>
  )
}

export default MainContainer
