import React from 'react'
import { Link } from 'react-router-dom'
import Meta from './Meta';


const BreadCrumbs = (props) => {
  const {title} = props;
  return (
    <>
        <Meta title={title} />
        <div class="breadcrumb py-0 mb-0">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-12 align-items-center">
                        <p className='text-center'>
                            <Link className='a ' to="/home" class="text-dark">
                               Home {" "}
                            </Link>
                            / {title} 
                            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default BreadCrumbs
