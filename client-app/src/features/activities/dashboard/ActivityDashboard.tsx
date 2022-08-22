import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	onSelectActivity: (id: string) => void;
	onCancelActivity: () => void;
	editMode: boolean;
	onOpenForm: (id: string) => void;
	onCloseForm: () => void;
	onCreateOrEdit: (activity: Activity) => void;
	onDeleteActivity: (id: string) => void;
	submitting: boolean;
}

export default function ActivityDashboard({
	activities,
	selectedActivity,
	onSelectActivity,
	onCancelActivity,
	editMode,
	onOpenForm,
	onCloseForm,
	onCreateOrEdit,
	onDeleteActivity,
	submitting
}: Props) {
	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList
					activities={activities}
					onSelectActivity={onSelectActivity}
					onDeleteActivity={onDeleteActivity}
					submitting={submitting}
				/>
			</Grid.Column>
			<Grid.Column width='6'>
				{selectedActivity && !editMode && (
					<ActivityDetails
						activity={selectedActivity}
						onCancelActivity={onCancelActivity}
						onOpenForm={onOpenForm}
					/>
				)}
				{editMode && (
					<ActivityForm
						onCloseForm={onCloseForm}
						activity={selectedActivity}
						onCreateOrEdit={onCreateOrEdit}
						submitting={submitting}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
}
