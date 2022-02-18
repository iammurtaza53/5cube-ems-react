import React, { useState,useEffect } from 'react';
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

export default function AddBreak(props) {
  const [breaks, setBreaks] = useState([]);
  const [dropdown, setDropdown] = useState([])
    
  useEffect(() => {
    
    fetchData();
  }, []);
  
  const url = 'http://127.0.0.1:8000/break/break/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setBreaks(json);
      } catch (error) {
        // console.log('error', error);
      }
    };
    const [employee_name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(true);
  
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    props.closeModal2(false)
  };

  const submitForm = () => {
    // console.log(image);
    const uploadData = new FormData();
    uploadData.append('employee', employee_name);
    uploadData.append('reason', reason);
    uploadData.append('start', start);
    uploadData.append('end', end);

    fetch('http://127.0.0.1:8000/break/break/', {
      method: 'POST',

      body: uploadData,
    })
      .then(response => response.json())

      .then(data => {
       
        setModalIsOpenToFalse();
        props.breakList(breaks)
        props.closeModal2(false)
      });
 
  };
  useEffect(() => {
    const url = "https://fivecube-ems-backend.herokuapp.com/leaves/employeeDropdown/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        setDropdown(json)
      } catch (error) {
        // console.log("error", error);
      }
    };

    fetchData();
}, []);

  return (
    <>
      <div className="container mb-3">
  
        <Modal isOpen={modalIsOpen}>
          <ModalHeader>Add Break</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
              <Col sm={6}>
          <Label for="exampleEmail">Name</Label>
    
          <Input type="select" name="employee_name" onChange={(e) => setName(e.target.value)} id="exampleEmail" placeholder="with a placeholder">
          <option >Select</option>
          {dropdown.map((employee)=>{
            return( <option value={employee.id}>{employee.first_name}</option>
            )})}
            </Input>
        </Col>

                <Col sm={6}>
                  <Label for="examplePassword">Reason</Label>
                  <Input
                    type="text"
                    name="reason"
                    onChange={e => setReason(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter Reason"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Start Time</Label>
                  <Input
                    type="time"
                    name="start"
                    onChange={e => setStart(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter Start Time"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">End Time</Label>
                  <Input
                    type="time"
                    name="end"
                    onChange={e => setEnd(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter End Time"
                  />
                </Col>
              
              </FormGroup>

              <ModalFooter>
                <Button color="primary" onClick={submitForm}>
                  Submit
                </Button>{' '}
                <Button color="secondary" onClick={setModalIsOpenToFalse}>
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
