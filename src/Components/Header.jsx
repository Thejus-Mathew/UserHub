import { MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Header({auth}) {
    const[search,setSearch]=useState("")

    const handleSearch =()=>{
        if(!search){
            toast.info("please enter search content")
        }else{
            toast.success("handle search")
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch()
        }
    }
  return (
    <header>
        <Navbar expand="lg" className="bg-info text-light">
            <Container fluid>
                <Link to='/' style={{textDecoration:"none"}}><Navbar.Brand className='fs-3 fw-bold text-light'>UserHub</Navbar.Brand></Link>
                {
                    auth?
                    <></>:
                    <>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 d-flex align-items-center"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to='/' style={{textDecoration:"none"}}><Navbar.Brand className='text-light fs-6 m-2'>All Users</Navbar.Brand></Link>
                        <Link to='pending' style={{textDecoration:"none"}}><Navbar.Brand className='text-light fs-6 m-2'>Blocked Users</Navbar.Brand></Link>
                    </Nav>
                    <div className='d-flex justify-content-center'>
                        <MDBInput value={search}  type="text" onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder='Search User'/>
                        <button className='btn btn-outline-light mx-3' onClick={handleSearch}>Search</button>
                    </div>
                    </Navbar.Collapse>
                    </>
                }
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
