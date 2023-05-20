import React from "react";
import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import HomePage from "./containers/HomePage";
import DashboardPage from "./containers/DashboardPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import {checkAuth} from "./features/user";

function App () {
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(checkAuth());
    },[]);
    return(
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/dashboard' element={<DashboardPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
