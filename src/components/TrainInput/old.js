import React, {useReducer} from 'react';
import firebase from '../../Firebase';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const TrainInput = (props)=> {

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            trainName: "",
            trainDestination: "",
            trainFrequency: "",
            trainStart: ""
        }
    );

    
    const handleFormChange = (e) => {
        const {name, value} = e.currentTarget;
        setFormInput({[name]: value});
    }

    const clearInputs = () => {
        const inputs = document.getElementsByTagName('input');
        inputs.forEach(function(input){
            input.value = "";
        });
    }


    return(
        <Form
            onSubmit={(e)=> {
                e.preventDefault();
                const trainsRef = firebase.firestore().collection('trains');
                trainsRef.add(formInput);
                // clearInputs();
            }}
        >
            <Row form>
                <Col md={3}>
                    <FormGroup>
                        <Label for='trainName'>Train</Label>
                        <Input value={formInput.trainName} type='text' name='trainName' id='trainName' placeholder='New Train Name' 
                        onChange={handleFormChange}/>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for='trainDestination'>Destination</Label>
                        <Input  value={formInput.trainDestination} type='text' name='trainDestination' id='trainDestination' placeholder='New Train Destination' 
                        onChange={handleFormChange}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for='trainFrequency'>Frequency (minutes)</Label>
                        <Input  value={formInput.trainFrequency} type='number' name='trainFrequency' id='trainFrequency' placeholder='New Train Frequency' 
                        onChange={handleFormChange}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for='trainStart'>First Train</Label>
                        <Input  value={formInput.trainStart} type='time' name='trainStart' id='trainStart' placeholder='New Train Start Time' 
                        onChange={handleFormChange}/>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <Button color='success' type='submit'>Submit</Button>
                </Col>
            </Row>
        </Form>
    )
    
}

export default TrainInput;