import Layout from "../components/Layout";
import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const DashboardPage = () => {

    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    if (!isAuthenticated && !loading && user===null)
        return  <Navigate to='/login' />;


    return (
        <Layout title='Auth Site | Dashboard' content='Dashboard page'>
            {loading || user === null ? (
                <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            ) : (
                <>
                    <h1 className='mb-5'>Dashboard</h1>
                    <p>User Details</p>
                    <ul>
                        <li>User name: {user.name}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                </>
            )}
        </Layout>

    );
};

export default DashboardPage;