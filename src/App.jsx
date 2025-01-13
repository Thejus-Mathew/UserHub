import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import BlockedUser from './Pages/BlockedUser'
import AllUser from './Pages/AllUser'
import Searchuser from './Pages/Searchuser'


function App() {

  return (
    <>
    <Routes>
      <Route element={<Auth/>} path='/' />
      <Route element={<Home/>} path='/home' />
      <Route element={<BlockedUser/>} path='/BlockedUsers' />
      <Route element={<AllUser/>} path='/AllUsers' />
      <Route element={<Searchuser/>} path='/searchUser' />
    </Routes>
    </>
  )
}

export default App
