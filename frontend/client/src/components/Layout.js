import React from "react";
import { Helmet } from 'react-helmet';
import Navbar from '/home/fox/PycharmProjects/pythonProject/frontend/client/src/components/Navbar';

const Layout = ({ title, content, children }) => (
	<>
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={content} />
		</Helmet>
		<Navbar />
		<div className='container mt-5'>{children}</div>
	</>
);

export default Layout;