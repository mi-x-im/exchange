import Layout from "../components/Layout";
import React, {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {login, resetRegistered} from "../features/user";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user);

    useEffect(() => {
        if (registered)
            dispatch(resetRegistered());
    }, [registered]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(login({email, password}));
    };

    if (isAuthenticated && !loading)
        return <Navigate to='/dashboard'/>;

    return (
        <Layout title='Auth Site | Login' content='Login page'>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>

                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        onChange={onChange}
                        value={email}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        name='password'
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>

                {loading ? (
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                ) : (
                    <button className='btn btn-primary mt-4'>Login</button>
                )}
            </form>
        </Layout>
    );
};

export default LoginPage;