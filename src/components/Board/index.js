import React from 'react';
import firebase from '../../Firebase';
import { Table } from 'reactstrap';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const getQuery = firebase.firestore().collection('trains');

const options = {
    "idField" : "id"
}

const Board = (props) => {
    const [trains, loading, error] = useCollectionData(getQuery, options);

    if (loading) return "CHOO CHOO! (Train's Coming!)";
    if (error) return error;

    return (
        <div id='train-board'>

        <Table  bordered hover striped>
            <thead>
                <tr>
                    <th>Train</th>
                    <th>Destination</th>
                    <th>Departing In...</th>
                    <th>Next Departure</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                {
                    trains ?
                        trains.map((train) => {
                            const now = new Date().toLocaleTimeString();
                            const nowColon = now.indexOf(':');
                            const nowHour = now.substring(0, 2)
                            const nowMinutes = now.substring(nowColon + 1, nowColon + 3);

                            const startColon = train.trainStart.indexOf(':');
                            const startMinutes = train.trainStart.substring(startColon + 1);

                            const minDiff = nowMinutes - startMinutes;
                            const remainder = minDiff % train.trainFrequency;
                            const minutesAway = train.trainFrequency - remainder;
                            let nextMinutes = minutesAway + parseInt(nowMinutes);
                            let nextHour = nowHour.replace(':', '');
                            if(nextMinutes > 59){
                                nextHour = parseInt(nextHour) + 1;
                                nextMinutes = nextMinutes - 60;
                            }
                            if(nextMinutes === 0){
                                nextMinutes = "00";
                            }
                            train.wait = minutesAway;
                            train.next = `${nextHour}:${nextMinutes}`

                            return(
                                <tr key={train.id}>
                                    <td>
                                        {train.trainName}
                                    </td>
                                    <td>
                                        {train.trainDestination}
                                    </td>
                                    <td className={train.wait <= 5 ? "leaving-soon" : null}>
                                        {train.wait} Minute(s)
                                    </td>
                                    <td>
                                        {train.next}
                                    </td>
                                    <td>
                                        Every {train.trainFrequency} Minute(s)
                                    </td>
                                </tr>
                            ) 
                        })
                        :
                        null
                }
            </tbody>
        </Table>
        </div>
    );
}

export default Board;