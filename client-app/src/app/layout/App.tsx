import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then(response => {
			// console.log(response);
			let activities: Activity[] = [];
			response.forEach(activity => {
				activity.date = activity.date.split('T')[0];
				activities.push(activity);
			});
			setActivities(activities);
			setLoading(false);
		});
	}, []);

	function selectActivityHandler(id: string) {
		setSelectedActivity(activities.find(x => x.id === id));
	}

	function cancelActivityHandler() {
		setSelectedActivity(undefined);
	}

	function openFormHandler(id?: string) {
		id ? selectActivityHandler(id) : cancelActivityHandler();
		setEditMode(true);
	}

	function closeFormHandler() {
		setEditMode(false);
	}

	function createAndEditActivityHandler(activity: Activity) {
		setSubmitting(true);
		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([
					...activities.filter(x => x.id !== activity.id),
					activity
				]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		}
	}

	function deleteActivityHandler(id: string) {
		setSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter(x => x.id !== id)]);
			setSubmitting(false);
		});
	}

	if (loading) return <LoadingComponent content='Loading app' />;

	return (
		<Fragment>
			<NavBar onOpenForm={openFormHandler} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					onSelectActivity={selectActivityHandler}
					onCancelActivity={cancelActivityHandler}
					editMode={editMode}
					onOpenForm={openFormHandler}
					onCloseForm={closeFormHandler}
					onCreateOrEdit={createAndEditActivityHandler}
					onDeleteActivity={deleteActivityHandler}
					submitting={submitting}
				/>
			</Container>
		</Fragment>
	);
}

export default App;