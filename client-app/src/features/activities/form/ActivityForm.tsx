import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
	activity: Activity | undefined;
	onCloseForm: () => void;
	onCreateOrEdit: (activity: Activity) => void;
	submitting: boolean;
}

export default function ActivityForm({
	activity: selectedActivity,
	onCloseForm,
	onCreateOrEdit,
	submitting
}: Props) {
	const intialState = selectedActivity ?? {
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	};

	const [activity, setActivity] = useState(intialState);

	function submitHandler() {
		onCreateOrEdit(activity);
	}

	function inputChangeHandler(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={submitHandler} autoComplete='off'>
				<Form.Input
					placeholder='Title'
					value={activity.title}
					name='title'
					onChange={inputChangeHandler}
				/>
				<Form.TextArea
					placeholder='Description'
					value={activity.description}
					name='description'
					onChange={inputChangeHandler}
				/>
				<Form.Input
					placeholder='Category'
					value={activity.category}
					name='category'
					onChange={inputChangeHandler}
				/>
				<Form.Input
					type='date'
					placeholder='Date'
					value={activity.date}
					name='date'
					onChange={inputChangeHandler}
				/>
				<Form.Input
					placeholder='City'
					value={activity.city}
					name='city'
					onChange={inputChangeHandler}
				/>
				<Form.Input
					placeholder='Venue'
					value={activity.venue}
					name='venue'
					onChange={inputChangeHandler}
				/>
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={onCloseForm}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
}
