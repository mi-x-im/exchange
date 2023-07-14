import React from "react";
import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import DashboardPage from "./containers/DashboardPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import {checkAuth} from "./features/user";
import CryptoPage from "./containers/CryptoPage";

function App () {
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(checkAuth());
    },[]);
    return(
        <Router>
            <Routes>
                <Route path='/crypto' element={<CryptoPage/>}/>
                <Route path='/dashboard' element={<DashboardPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
