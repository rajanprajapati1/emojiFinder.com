import React, { useContext, useEffect, useState } from 'react'
import Homepage from './Pages/Homepage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import SingleEmoji from './Pages/SingleEmoji'
import { Mycontext } from './utils/context'

const App = () => {
    const {user,
        setuser} = useContext(Mycontext)
    const LoginUser = async()=>{
        try {
          const res = await fetch('http://localhost:4000/auth/login/Success',{
          method: "GET",
          credentials: "include",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      });
      if (res.ok) {
          const data = await res.json();
          setuser(data?.user)
          console.log(data?.user)
      } else {
          throw new Error("Authentication has been failed");
      }
    } catch (err) {
      console.log(err);
    }
    };
    useEffect(()=>{
      LoginUser();
    },[])
    return (
        <div className='main'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/Login' element={user ? <Navigate to={"/"} /> : <Login />} />
                    <Route path='/emoji/:id' element={user ?  <SingleEmoji /> : <Navigate to={"/Login"}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
