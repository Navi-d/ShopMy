import React from 'react'
import {NavLink, Link} from 'react-router-dom'


const Header = () => {
  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='continer-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p>Docs/Faqs</p>
              <p>Follow instagram facebook</p>
            </div>

            <div className='col-6'></div>
          </div> 
        </div>    
      </header>
    </>
  );
}

export default Header

