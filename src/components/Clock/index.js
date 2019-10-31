import React, {useState} from 'react';
import { Jumbotron } from 'reactstrap';


const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const calculateTime = () => {
        setTime(new Date().toLocaleTimeString());
    }

    window.setInterval(calculateTime, 1000);

    return(
        <Jumbotron fluid>
            <h1>Train Schedule</h1>
            <h2>{time}</h2>
        </Jumbotron>
    )
}

export default Clock;