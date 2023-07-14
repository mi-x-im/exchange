import Layout from "../components/Layout";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {register} from "../features/user";
import React from "react";
const RegisterPage = () => {
    const dispatch = useDispatch();
    const {registered, loading} = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(register({name, email, password }));
    }

    if (registered)
        return <Navigate to='/login'/>
    return (
        <Layout title='Auth Site | Register' content='Register page'>
            <h1>Register for an Account</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='name'>Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='name'
                        onChange={onChange}
                        value={name}
                        required
                    />
                </div>

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
					<button className='btn btn-primary mt-4'>Register</button>
				)}
            </form>
        </Layout>
    )
}

export default RegisterPage;