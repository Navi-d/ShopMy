import React from 'react'
import '../Support/support.css'

const Footer = () => {
  return (
    <>
    <div class="continer-xxl bg-dark p-4 px-5">
      <div class="row">
        <div class="col-3">
          <ul class="list-group list-group-flush list-group-dark">
            <h6 className='text-white'>Get to Know Us</h6>
            <li><small class="text-light">
              Careers
              </small>
            </li>
            <li><small class="text-light">
              Blog
              </small>
            </li>
            <li><small class="text-light">
              About ShopMY
              </small>
            </li>
            <li><small class="text-light">
              Investor Relations
              </small>
            </li>
          </ul>
        </div>

        <div class="col-3">
          <ul class="list-group list-group-flush list-group-dark">
            <h6 className='text-white'>Make Money with Us</h6>
            <li><small class="text-light">
              Sell Products
              </small>
            </li>
            <li><small class="text-light">
              Sell apps on ShopMY
              </small>
            </li>
            <li><small class="text-light">
              Self-Publish with Us
              </small>
            </li>
            <li><small class="text-light">
              Host on our Website
              </small>
            </li>
          </ul>
        </div>
        <div class="col-3">
        <ul class="list-group list-group-flush list-group-dark">
            <h6 className='text-white'>ShopMY Payment Products</h6>
            <li><small class="text-light">
              Business Card
              </small>
            </li>
            <li><small class="text-light">
              Shop with points
              </small>
            </li>
            <li><small class="text-light">
              Reload your balance
              </small>
            </li>
            <li><small class="text-light">
              Currency Converter
              </small>
            </li>
          </ul>
        </div>
        <div class="col-3">
        <ul class="list-group list-group-flush list-group-dark">
            <h6 className='text-white'>Let Us Help You</h6>
            <li><small class="text-light">
              <a class='a a-modern' 
              style={{"color" : "white"}}
              href="/profile">Your Profile</a>
              </small>
            </li>
            <li><small class="text-light">
            <a class='a a-modern' 
              style={{"color" : "white"}}
              href="/manageorders">Your Orders</a>
              </small>
            </li>
            <li><small class="text-light">
              <a class='a a-modern' 
              style={{"color" : "white"}}
              href="/support">Help</a>
              </small>
            </li>
          </ul>
        </div>

      </div>
      
      <div class="row">
          <div class="col">
            <div class="d-flex justify-content-center mt-5">
              <h3 className='text-light'>ShopMY</h3>

              <select name="select" id="" className='footer-form mx-3 form-control form-select h-25'>
                <option value="manual">English</option>
                <option value="malay">Bahasa Melayu</option>
              </select>

              <select name="select" id="" className='footer-form me-3 form-control form-select h-25'>
                <option value="manual">USD</option>
                <option value="malay">Ringgit</option>
              </select>
            </div>
          </div>
      </div>

      <div class="row">
        <div class="col">
        <hr className='text-light'/>
          <p class="p-footer text-light">
          Conditions of Use
          Privacy Notice
          Consumer Health Data Privacy Disclosure
          Your Ads Privacy Choices <br />
          © 2024, ShopMY.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Footer
