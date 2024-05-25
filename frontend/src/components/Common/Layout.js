import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      {/* Outlet render show all the router nested children */}
      <div class="default-window-footer">
        <Outlet />
      </div>
     
      <Footer />
    </>
  )
}

export default Layout
