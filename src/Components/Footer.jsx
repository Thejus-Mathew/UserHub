import { MDBContainer, MDBFooter, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { Flip, ToastContainer } from 'react-toastify'

function Footer() {
  return (
    <footer>
        <ToastContainer position="top-center" theme="colored" transition= {Flip}/>
        <MDBFooter className='text-center text-white w-100' style={{ backgroundColor: 'rgb(125, 233, 255)' }}>
        <MDBContainer className='pt-4 border-bottom fs-4 d-flex justify-content-center align-items-center gap-4 text-light' style={{height:"10vh"}}>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%", height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-facebook-f' />
            </div>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%",height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-twitter' />
            </div>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%",height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-google' />
            </div>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%", height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-instagram' />
            </div>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%",height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-linkedin' />
            </div>
            <div className='bg-light text-info d-flex justify-content-center align-items-center p-3 mb-3 fs-6' style={{aspectRatio:"1/1",borderRadius:"50%",height:"30px",width:"30px"}}>
            <MDBIcon fab className='fab fa-github' />
            </div>
        </MDBContainer>

        <div className='text-center text-light p-3 bg-info'>
            © 2025 Copyright:
            <a className='text-light ms-2 text-decoration-none' href='/'>
            UserHub.com
            </a>
        </div>
        </MDBFooter>
    </footer>
  )
}

export default Footer
