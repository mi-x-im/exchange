import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import { fetchCryptocurrencies } from '../features/actions';

const HomePage = () => {
    const dispatch = useDispatch();
    const cryptocurrencies = useSelector(state => state.cryptocurrencies);

    useEffect(() => {
        dispatch(fetchCryptocurrencies());
    }, [dispatch]);

    return (
        <ul>
            {cryptocurrencies.map(crypto => (
                <li key={crypto.id}>
                    {crypto.name}: {crypto.price}
                </li>
            ))}
        </ul>
    );
};

export default HomePage;