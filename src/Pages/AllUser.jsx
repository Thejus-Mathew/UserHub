import React, { useEffect, useState } from 'react'
import { useIndexedDB } from 'react-indexed-db-hook';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Footer from '../Components/Footer';
import { toast } from 'react-toastify';

function AllUser() {
    const[userList,setUserList]=useState([])
    const[blockedList,setBlockedList]=useState({email:"",list:[]})
    const[user,setuser]=useState({})

    const usersDB = useIndexedDB('users');
    const blockedListDB = useIndexedDB('blockedList');

    const email = sessionStorage.getItem('email')
    const navigate = useNavigate()


    const getUserData = async () => {
        try{
            const data = await usersDB.getByIndex('email',email)
            setuser(data)
        }catch(err){
            toast.error(`Failed to load data ${err}`)
        }
    }
    
    const getUserList = async () => {
        try{
            const data = await usersDB.getAll()
            setUserList(data)
        }catch(err){
            toast.error(`Failed to load data ${err}`)
        }
    }

    const getBlockedList = async () => {
        try{
            const data = await blockedListDB.getByIndex('email',email)
            setBlockedList(data)
        }catch(err){
            toast.error(`Failed to load data ${err}`)
        }
    }

    useEffect(()=>{
        if(email){
            getUserData()
            getUserList()
            getBlockedList()
        }else{
            navigate('/')
        }
    },[])

    const handleRemove = async (mailId) => {
        try{
            console.log(user.addedUsers);
            let array = user.addedUsers.filter(item=>item != mailId)
            console.log(array);
            
            const data = {...user,addedUsers:array}
            await usersDB.update(data)
            getUserData()
        }catch(err){
            toast.error(`failed to Add ${err}`)
        }
    }
    const handleAdd = async (mailId) => {
        try{
            console.log(user);
            const data = {...user,addedUsers:[...user.addedUsers,mailId]}
            console.log(data);
            await usersDB.update(data)
            getUserData()
        }catch(err){
            toast.error(`failed to Add ${err}`)
        }
    }

    const handleBlock = async (mailId) => {
        try{
            let data =await blockedListDB.getByIndex('email',mailId)
            console.log(data)
            let array = [...data.list]
            array.push(email)
            data.list = array
            console.log(data);
            await blockedListDB.update(data)

            const data1 = {...user,blockedUsers:[...user.blockedUsers,mailId]}
            await usersDB.update(data1)
            getUserData()
        }catch(err){
            toast.error(`failed to Block ${err}`)
        }
    }
    
  return (
    <>
      <Header/>
      <section id='All UserList'>
        <div className="table-responsive container my-5" style={{minHeight:"64dvh"}}>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr className='border-bottom border-dark'>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Previous Login</th>
                        <th scope='col'>Add/Remove</th>
                        <th scope='col'>Block</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        userList.length>0?
                        userList.filter((item)=>item?.email != user?.email && !blockedList?.list.includes(item?.email) && !user.blockedUsers.includes(item?.email))
                        .map((item,index)=>(
                            <tr key={index} className='border-bottom border-info'>
                                <td>
                                    {item?.name}
                                </td>
                                <td>
                                    {item?.email}
                                </td>
                                <td>
                                    df
                                </td>
                                <td>
                                    {
                                        user?.addedUsers.includes(item?.email)?
                                        <button className='btn btn-light text-danger m-1' onClick={()=>handleRemove(item?.email)}><i className="fa-solid fa-square-minus"></i></button>
                                        :<button className='btn btn-light text-success m-1' onClick={()=>handleAdd(item?.email)}><i className="fa-solid fa-square-plus"></i></button>
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-light text-danger m-1' onClick={()=>handleBlock(item?.email)}><i className="fa-solid fa-ban"></i></button>
                                </td>
                            </tr>
                        ))
                        :<></>
                    }
                </MDBTableBody>
            </MDBTable>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default AllUser