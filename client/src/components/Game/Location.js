import React from 'react';
import Card from '@material-ui/core/Card';
import {
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	banner: {
		maxWidth: '345px',
		border: '1px solid black'
	},
	subtext: {
		fontFamily: 'Roboto'
	},
	title: {
		fontFamily: 'Piedra, cursive'
	},
	actionarea: {
		margin: '0.1vw'
	}
}));

const Location = props => {
	const classes = useStyles();
	return (
		<Card className={classes.banner}>
			{/* Define image of the card as being the location itself */}
			<CardMedia
				style={{ height: '300px' }}
				src="image"
				// image will be a prop
				image="highschool.png"
			></CardMedia>
			<CardContent>
				<Typography className={classes.title} variant="h3">
					High School
				</Typography>
				<Typography className={classes.subtext} variant="h5">
					{/* will replace with props once all locations are loaded */}
					Every spy has been here before... But they shouldn't know
					that!
				</Typography>
			</CardContent>
			<Divider />
			<CardActions>
				<Button className={classes.actionarea} color="primary">
					Choose
				</Button>
			</CardActions>
		</Card>
	);
};

export default Location;
