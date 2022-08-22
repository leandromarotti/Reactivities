import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
	activity: Activity;
	onCancelActivity: () => void;
	onOpenForm: (id: string) => void;
}

export default function ActivityDetails({
	activity,
	onCancelActivity,
	onOpenForm
}: Props) {
	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button
					onClick={() => onOpenForm(activity.id)}
					basic
					color='blue'
					content='Edit'
				/>
				<Button
					onClick={onCancelActivity}
					basic
					color='grey'
					content='Cancel'
				/>
			</Card.Content>
		</Card>
	);
}
