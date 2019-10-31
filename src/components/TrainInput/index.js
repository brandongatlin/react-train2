import React, {useState} from 'react';
import firebase from '../../Firebase';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const TrainInput = (props)=> {

   const [trainName, setTrainName] = useState("");
   const [trainDestination, setTrainDestination] = useState("");
   const [trainFrequency, setTrainFrequency] = useState("");
   const [trainStart, setTrainStart] = useState("");
   const [formValid, setFormValid] = useState(false);
    let validCount = 0;


   const checkForm = () => {
       setFormValid(false);
       const tags = document.getElementsByTagName('input');

        for (let i = 0; i < tags.length; i++){
            let classes = tags[i].classList;
            for (let j = 0; j < classes.length; j++){
                if(classes[j] === 'is-valid'){
                    validCount++;
                }
            }
        }

        if(validCount === tags.length - 1){
            setFormValid(true);
            validCount = 0;
        }
   }

    return(
        <Form id='train-input'
            onSubmit={(e)=> {
                e.preventDefault();
                const trainsRef = firebase.firestore().collection('trains');
                const newTrain = {
                    trainName,
                    trainDestination,
                    trainFrequency,
                    trainStart
                }

                trainsRef.add(newTrain);
                setTrainName('');
                setTrainDestination('');
                setTrainFrequency('');
                setTrainStart('');
                setFormValid(false);
            }}
        >
            <Row form>
                <Col md={3}>
                    <FormGroup>
                        <Label for='trainName'>Train</Label>
                        <Input valid={trainName.length > 4 ? true : false} value={trainName} type='text' name='trainName' id='trainName' placeholder='New Train Name' 
                            onChange={ (e) => { setTrainName(e.currentTarget.value); checkForm() } }/>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for='trainDestination'>Destination</Label>
                        <Input valid={ trainDestination.length > 3 ? true : false } value={trainDestination} type='text' name='trainDestination' id='trainDestination' placeholder='New Train Destination' 
                            onChange={ (e) => { setTrainDestination(e.currentTarget.value); checkForm()}}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for='trainFrequency'>Frequency (minutes)</Label>
                        <Input valid={ trainFrequency > 0 && trainFrequency <= 60 ? true : false } value={trainFrequency} type='number' name='trainFrequency' id='trainFrequency' placeholder='New Train Frequency' 
                            onChange={ (e) => { setTrainFrequency(e.currentTarget.value); checkForm()}}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for='trainStart'>First Train</Label>
                        <Input valid={ trainStart !== "" ? true : false } value={trainStart} type='time' name='trainStart' id='trainStart' placeholder='New Train Start Time' 
                            onChange={ (e) => { setTrainStart(e.currentTarget.value); checkForm()}}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <Label for='submit'>Submit New Train</Label><br/>
                    <Button disabled={ !formValid } id='submit' color={formValid ? 'success' : 'danger'} type='submit'>Click</Button>
                </Col>
            </Row>
        </Form>
    )
    
}

export default TrainInput;