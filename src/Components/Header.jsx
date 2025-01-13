import { MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Header({auth}) {
    const[search,setSearch]=useState("")
    const navigate = useNavigate()

    const handleSearch =()=>{
        if(!search){
            toast.info("please enter search content")
        }else{
            sessionStorage.setItem("search",search)
            navigate('/searchUser')
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch()
        }
    }

    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }
  return (
    <header>
        <Navbar expand="lg" className="bg-info text-light">
            <Container fluid>
                <Link to='/home' style={{textDecoration:"none"}}><Navbar.Brand className='fs-3 fw-bold text-light'>UserHub</Navbar.Brand></Link>
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
                        <Link to='/allUsers' style={{textDecoration:"none"}}><Navbar.Brand className='text-light fs-6 m-2'>All Users</Navbar.Brand></Link>
                        <Link to='/blockedUsers' style={{textDecoration:"none"}}><Navbar.Brand className='text-light fs-6 m-2'>Blocked Users</Navbar.Brand></Link>
                        <Navbar.Brand className='text-light fs-6 m-2 pointer' onClick={()=>handleLogout()}>Logout</Navbar.Brand>
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
