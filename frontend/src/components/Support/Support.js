import React from 'react'

export const Support = () => {
  return (
    
    <section className="support-wrapper bg-dark ">
    <div className="container py-5">
        <div className="support-center-wrapper">
          <div className="card" style={{borderRadius: "1rem", height: "663px"}}>
            <div className="row">
              <div className="col-md-7 col-lg-7 d-md-block">
                <img src="/Products/images/sideimage.png"
                  alt="we are happy to help you" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem", height: "661px"}} />
              </div>
              <div className="col-md-5 col-lg-5 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5">
                    <div className="d-flex">
                    </div>
                    <div class="d-grid gap-5 col-lg mx-auto">
                      <button class="btn btn-lg btn-outline-dark p-3" type="button">Contact us</button>
                      <button class="btn btn-lg btn-outline-dark p-3" type="button">Contact chatbot</button>
                      <button class="btn btn-lg btn-outline-dark p-3" type="button">FAQ</button>
                    </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
};

export default Support
