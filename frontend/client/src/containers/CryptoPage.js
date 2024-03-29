import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";

import { getCryptos } from "../features/crypto.mjs";
import {Navigate} from "react-router-dom";

const CryptoPage = () => {
  const { cryptos, loading, error } = useSelector((state) => state.cryptos);
  const { isAuthenticated,user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCryptos());
  }, [dispatch]);

  if (!isAuthenticated  && user===null)
        return  <Navigate to='/login' />;
    return (
                <Layout title='Auth Site | Dashboard' content='Dashboard page'>

      <div className="home-page">
        <h1>Таблица криптовалют</h1>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(cryptos).map((crypto, index) => (
                <tr key={index}>
                  <td>{crypto.id}</td>
                  <td>{crypto.name}</td>
                  <td>{crypto.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
                </Layout>
    );
};

export default CryptoPage;