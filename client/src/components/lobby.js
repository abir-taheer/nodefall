import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
	root: {
		margin: 0
	},
	paragraph: {
		fontSize: '0.5em'
	},
	primary: {
		color: green
	}
	// dropDown: {
	//     fontSize: '0.5em',
	// }
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500]
		}
	}
});

const Lobby = props => {
	const classes = useStyles();
	return (
		<>
			<div>
				<h6 className={classes.root}>Lobby</h6>
				{/* room code will appear once api is active */}
				<p className={classes.paragraph}> Room Code: </p>
			</div>
			{/* Timer and Location Drop Down */}
			<div className={classes.paragraph}>
				<Grid container>
					<Grid item xs={6}>
						Timer:
					</Grid>

					<Grid item xs={6}>
						Location:
					</Grid>
				</Grid>
			</div>

			{/* List of Players */}
			<ThemeProvider theme={theme}>
				<List>
					<ListItem>
						<ListItemText primary="Michael Nath" />
					</ListItem>

					{/* if a player readies up, their text becomes green. Logic will be implemented later */}
					<ListItem>
						<ListItemText
							primaryTypographyProps={{ color: 'primary' }}
							primary="Abir Taheer"
						/>
					</ListItem>
				</List>
			</ThemeProvider>
			<div>
				<Button>I am Ready!</Button>
				{/* start round option is only available to host */}
				<Button> Start Round </Button>
			</div>
		</>
	);
};

export default Lobby;
