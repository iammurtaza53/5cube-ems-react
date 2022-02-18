import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ModalBody,
  Modal,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export default function EditBreak(props) {
  const [breaks, setBreaks] = useState([]);

  useEffect(() => {
    const url = 'http://fivecube-ems-backend.herokuapp.com/break/break/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setBreaks(json.results);
      } catch (error) {
        // console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const [firstName, setFirstName] = useState(props.breaks.first_name);
  const [lastName, setLastName] = useState(props.breaks.last_name);
  const [reason, setReason] = useState(props.breaks.reason);
  const [start, setStart] = useState(props.breaks.start);
  const [end, setEnd] = useState(props.breaks.end);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editForm = (id) => {
    
    const uploadData = new FormData();
    uploadData.append('first_name', firstName);
    uploadData.append('last_name', lastName);
    uploadData.append('reason', reason);
    uploadData.append('start', start);
    uploadData.append('end', end);
    
    
    fetch('http://fivecube-ems-backend.herokuapp.com/break/break/' + id + '/', {
      method: 'PUT',

      body: uploadData,
})
      .then(response => response.json()
      )

      .then(data => {
        // console.log('Success:', data);
        // console.log('data submitted');
        setModalIsOpenToFalse();
        props.breakList(breaks)
        props.closeModal(false)
      });

    };

  return (
    <>
      <div className="container mb-3">    
          <Modal isOpen={modalIsOpen}>
          <ModalHeader>Edit Break</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col sm={6}>
                  <Label for="exampleEmail">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value= { props.breaks.first_name}
                    onChange={e => setFirstName(e.target.value)}
                    id="exampleEmail"
                    placeholder="Enter first name"
                    
                  />
                </Col>
                <Col sm={6}>
                  <Label >Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value= { props.breaks.last_name}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </Col>

                <Col sm={6}>
                  <Label >Reason</Label>
                  <Input
                    type="text"
                    name="reason"
                    defaultValue= { props.breaks.reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Enter Reason"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Start time</Label>
                  <Input
                    type="time"
                    name="start"
                    defaultValue= { props.breaks.start}
                    onChange={e => setStart(e.target.value)}
                    placeholder="Enter Start Time"
                  />
                </Col>
                <Col sm={6}>
                  <Label >End Time</Label>
                  <Input
                    type="time"
                    name="last_increment"
                    defaultValue= { props.breaks.end}
                    onChange={e => setEnd(e.target.value)}
                    placeholder="Enter End Time"
                  />
                </Col>
                
              </FormGroup>

              <ModalFooter>
                <Button color="primary" onClick={()=> editForm(props.breaks.id)}>
                  Update
                </Button>{' '}
                <Button color="secondary" onClick={()=>props.closeModal(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
            </ModalBody>
            </Modal>
      </div>
    </>
  );
}
