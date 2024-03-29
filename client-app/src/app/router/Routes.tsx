import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestError from '../../features/errors/TestError';
import App from '../layout/App';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: 'activities', element: <ActivityDashboard /> },
			{ path: 'activities/:id', element: <ActivityDetails /> },
			{ path: 'createActivity', element: <ActivityForm key='create' /> },
			{ path: 'manage/:id', element: <ActivityForm key='manage' /> },
			// { path: 'profiles/:username', element: <ProfilePage /> },
			{ path: 'errors', element: <TestError /> },
			{ path: 'server-error', element: <ServerError /> },
			{ path: 'not-found', element: <NotFound /> },
			{ path: '*', element: <Navigate replace to='/not-found' /> }
		]
	}
];

export const router = createBrowserRouter(routes);
