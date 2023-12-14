import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { MdDarkMode, MdKeyboardArrowDown } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import  ghost from '../assets/img/ghost.webp'
import {Mycontext} from '../utils/context'
import { EmojiApi } from '../apis/EmojiApi';
import { Link, json } from 'react-router-dom';
const Navbar = () => {
      const {SetEmoji,user} = useContext(Mycontext);
      const UserImg = user?.photos[0]?.value;
      console.log(UserImg)
      const [translateX,SettranslateX]= useState(0);
        const InputRef = useRef();
        const SearchEmoji = async(Query)=>{
            try {
                const res = await EmojiApi(`emojis?search=${Query}&`);
                if(res.status === 'error' && res.message === 'No results found'){
            SetEmoji([])
                }
                else if (res) {
                    SetEmoji(res);
                }
                 
              } catch (error) {
                console.error('Error fetching emojis', error);
              }
        }
        const HandleSearchbar = (e)=>{
            if(e.key === 'Enter'){
                let Q = InputRef.current.value;
                SearchEmoji(Q);
        }
    }
    const Modes = {
        backgroundColor: "black",
        color: "white",
        lightMode: "inherit"
      };
      const HandleLogout = ()=>{
      window.open("http://localhost:4000/auth/logout","_Self")
      }
    
      const handleToggle = () => {
        SettranslateX((value) => {
          const newTranslateX = value === 0 ? 27 : 0;
    
          document.body.style.backgroundColor = newTranslateX === 0 ? Modes.lightMode : Modes.backgroundColor;
          document.body.style.color = newTranslateX === 0 ? Modes.lightMode : Modes.color;
    
          localStorage.setItem("transaltevalue", newTranslateX);
          localStorage.setItem("Mode", JSON.stringify(Modes));
    
          return newTranslateX;
        });
      };
    
      useEffect(() => {
        const storedValue = localStorage.getItem('transaltevalue');
        const storedMode = localStorage.getItem('Mode');
        if (storedValue) {
          SettranslateX(parseInt(storedValue));
        }
        if (storedMode) {
          const parsedMode = JSON.parse(storedMode);
          document.body.style.backgroundColor = translateX === 0 ? parsedMode.lightMode : parsedMode.backgroundColor;
          document.body.style.color = translateX === 0 ? parsedMode.lightMode : parsedMode.color;
        }
      }, [translateX]);
        return (
        <div className='navbar'>
            <div className="flex_1 bars">
               <Link to="/">
               <h1>👻Emoji Finder</h1>
               </Link>
            </div>
            <div className="flex_2 bars">
           <div className="searchbar">
           <FaSearch size={"25px"} className='sicon'/>
            <input type="text" ref={InputRef} onKeyDown={HandleSearchbar} placeholder='#Sad #Love #Happy #foodie' />
           </div>
            </div>
            <div className="flex_3 bars">
           {user ? (<>
            <img src={UserImg} alt="user"  className='bicons'/>
            <RiLogoutCircleRLine className='bicons' onClick={HandleLogout}/>
           </>) : null}
            <MdKeyboardArrowDown className='bicons' />
            <div className="mode" onClick={handleToggle}>
                <button style={{transform:`translateX(${translateX}px)` }}></button>
            </div>
            </div>
            
        </div>
    )
}

export default Navbar
