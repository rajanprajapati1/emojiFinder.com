import React, { createContext, useState, useContext } from 'react'

const Mycontext = createContext();

const MyContextProvider = ({ children }) => {
    const [Emoji, SetEmoji] = useState([]);
    const [loading, Setloading] = useState(true);
    const [user, setuser] = useState(null);

    return (
        <Mycontext.Provider value={{Emoji, SetEmoji,loading, Setloading,user, setuser}}>
            {children}
        </Mycontext.Provider>
    )
}

const Mycomponent = () => {
    const {   Emoji, SetEmoji,loading, Setloading,user, setuser } = useContext(Mycontext);
}



export { MyContextProvider, Mycontext };