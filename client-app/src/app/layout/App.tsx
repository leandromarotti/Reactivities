import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';
import HomePage from '../../features/home/HomePage';
import { useStore } from '../stores/store';

function App() {
	const location = useLocation();

	return (
		<>
			<ToastContainer position='bottom-right' hideProgressBar />
			{location.pathname === '/' ? (
				<HomePage />
			) : (
				<>
					<NavBar />
					<Container style={{ marginTop: '7em' }}>
						<Outlet />
					</Container>
				</>
			)}
		</>
	);
}

export default observer(App);
