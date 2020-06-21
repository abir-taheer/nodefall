import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const buttonStyle = {
    variant: "outlined",
    size: "large",
    margin: "auto"
}

function Home() {
    return (
        <div>
            <img src="Nodefall.gif" width="300px" margin="auto" alt="Nodefall"></img>
            <br/>
            <Link to="/create"><Button {...buttonStyle}>Create a game</Button></Link>
            <br/>
            <Button {...buttonStyle}>Join a game</Button>
        </div>
    )
}

export default Home;
