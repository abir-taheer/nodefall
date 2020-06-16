import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const buttonStyle = {
    variant: "outlined",
    size: "large",
    margin: "auto"
}

function Home() {
    return (
        <div>
            <img src="Nodefall.gif" width="300px" margin="auto"></img>
            <br/>
            <Button {...buttonStyle}>Create a game</Button>
            <br/>
            <Button {...buttonStyle}>Join a game</Button>
        </div>
    )
}

export default Home;
