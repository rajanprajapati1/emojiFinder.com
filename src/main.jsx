import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css';
import {MyContextProvider} from './utils/context'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
    <MyContextProvider>
    <App/>
    </MyContextProvider>
    </React.Fragment>
)
