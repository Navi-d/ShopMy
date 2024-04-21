import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      {/* Outlet render show all the router nested children */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
