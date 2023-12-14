import React from 'react'
import fb from '../assets/img/fb.webp'
import go from '../assets/img/google.webp'
import gi from '../assets/img/git.webp'
const Login = () => {
    const GoogleOAuth =()=>{
        window.open("http://localhost:4000/auth/google","_Self");
         }
    return (
        <div className='login'>
            <div className="login_con">
                <div className="login_box">
                    <div className="first">
                        <center><h1>Hey</h1></center>
                        <h1>Welcome To EmojiFinder</h1>
                        <h2>Sign Up</h2>
                    </div>
                    <div className="second">
                        <form>
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder='example@gmail.com' name='email' required />
                            <label htmlFor="Password">Password</label>
                            <input type="password" placeholder='Password' required />
                            <span>Forget Pasword?</span>
                            <button>Login</button>
                        </form>
                        <h2>or</h2>
                        <button className='skip_btn'>Skip For Now</button>
                    </div>
                    <div className="third">
                        <button className='social_btn' onClick={GoogleOAuth}><img src={go} alt="" /></button>
                        <button className='social_btn'><img src={fb} alt="" /></button>
                        <button className='social_btn'><img src={gi} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
