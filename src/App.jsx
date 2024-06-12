import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import About from './assets/pages/About'
import SignUp from './assets/pages/SignUp'
import Stories from './assets/pages/Stories'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBlog from './assets/pages/AddBlog'
import Dashboard from './component/UserDashboard'
import BlogFullView from './assets/pages/BlogFullView'
import LoginButton from './assets/pages/Authlogin'


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/login' element={<LoginButton />} /> */}
          <Route path='/blogs' element={<Stories />} />
          <Route path='/addBlog' element={<AddBlog />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/blogView' element={<BlogFullView />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
