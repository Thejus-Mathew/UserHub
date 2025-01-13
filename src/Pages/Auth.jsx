import React, { useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { useIndexedDB } from 'react-indexed-db-hook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Auth() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[name,setName]=useState('')
    const[login,setLogin]=useState(true)

    const usersDB = useIndexedDB('users');
    const blockedListDB = useIndexedDB('blockedList');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(login){
            handleLogin()
        }else{
            handleRegister()
        }
    }


    const handleLogin=async()=>{
        try{
            const user = await usersDB.getByIndex('email',email)
            if(user?.password===password){
                const time = new Date().toLocaleTimeString()
                const date = new Date().toLocaleDateString()
                let data = {...user,preLogged:`${date} ${time}`}
                await usersDB.update(data)
                sessionStorage.setItem("email",email)
                navigate('/home')
            }else{
                toast.warn('Invalid User Credentials')
            }
        }catch(err){
            toast.error(`Failed to login ${err}`)
        }
    }


    const handleRegister=async ()=>{
        try{
            const user = await usersDB.getByIndex('email',email)
            if(user){
                toast.warn('Email is already registered')
            }else{
                const time = new Date().toLocaleTimeString()
                const date = new Date().toLocaleDateString()
                await usersDB.add({name,email,password,preLogged:`${date} ${time}`,addedUsers:[],blockedUsers:[]})
                await blockedListDB.add({email,list:[]})
                toast.success(`${name} registered successfully`)
                handleSwitch()
            }
        }catch(err){
            toast.error(`Failed to register ${err}`)
            console.log(`Failed to register ${err}`,err)
        }
    }


    const handleSwitch = () => {
        setEmail("")
        setName("")
        setPassword("")
        setLogin(login?false:true)
    }
  return (
    <>
      <Header auth={true} />
      <section id='authentication' style={{minHeight:"70dvh"}}>
        <div className="container my-5 border border-3 rounded border-info shadow">
            <div className="row">
                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center px-5 py-5">
                    <h2 className='text-info mb-5'>{login?"Login":"Register"}</h2>
                    <form onSubmit={handleSubmit} className='w-100'>
                        {
                            login?<></>:
                            <input type="text" className="form-control mb-3" placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                        }
                        <input type="email" className="form-control mb-3" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" className="form-control mb-3" placeholder='Password' required value={password} minLength="8" onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='submit' className='btn btn-info text-light w-100'>{login?"Login":"Register"}</button>
                    </form>
                </div>
                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center py-5 border-top border-info">
                    <h2 className='text-info mb-2'>Welcome</h2>
                    <span className='fs-5'>{login?"Don't have an account?":"Have an account?"}</span>
                    <button className='btn btn-dark mt-4' onClick={()=>handleSwitch()}>{login?"Register Here":"Login Here"}</button>
                </div>
            </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Auth
