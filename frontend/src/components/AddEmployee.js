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

export default function AddEmployee(props) {
  const [employees, setEmployees] = useState([]);
    
  useEffect(() => {
    
    fetchData();
  }, []);
  
  const url = 'https://fivecube-ems-backend.herokuapp.com/employee/employees/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setEmployees(json);
      } catch (error) {
        // console.log('error', error);
      }
    };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [joining_date, setJoiningDate] = useState('');
  const [status, setStatus] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(true);
  
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    props.closeModal2(false)
  };

  const submitForm = () => {
    // console.log(image);
    const uploadData = new FormData();
    uploadData.append('first_name', firstName);
    uploadData.append('last_name', lastName);
    uploadData.append('email', email);
    uploadData.append('password', password);
    uploadData.append('designation', designation);
    uploadData.append('cnic', cnic);
    uploadData.append('address', address);
    uploadData.append('contact', contact);
    uploadData.append('joining_date', joining_date);
    uploadData.append('status', status);
    uploadData.append('salary', salary);
    if (image != null) {
      uploadData.append('profile_picture_path', image, image.name);
    }

    fetch('https://fivecube-ems-backend.herokuapp.com/employee/employees/', {
      method: 'POST',

      body: uploadData,
    })
      .then(response => response.json())

      .then(data => {
       
        setModalIsOpenToFalse();
        props.empList(employees)
        props.closeModal2(false)
      });
 
  };

  return (
    <>
      <div className="container mb-3">
  
        <Modal isOpen={modalIsOpen}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col sm={6}>
                  <Label for="exampleEmail">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    onChange={e => setFirstName(e.target.value)}
                    id="exampleEmail"
                    placeholder="Enter first name"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    onChange={e => setLastName(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter last name"
                  />
                </Col>

                <Col sm={6}>
                  <Label for="examplePassword">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter email"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter password"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Designation</Label>
                  <Input
                    type="text"
                    name="designation"
                    onChange={e => setDesignation(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter designation"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">CNIC</Label>
                  <Input
                    type="text"
                    name="cnic"
                    onChange={e => setCnic(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter CNIC"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    onChange={e => setAddress(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter address"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Contact</Label>
                  <Input
                    type="text"
                    name="contact"
                    onChange={e => setContact(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter contact"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Joining Date</Label>
                  <Input
                    type="date"
                    name="date"
                    onChange={e => setJoiningDate(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter joining date"
                  />
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={e => setStatus(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter status"
                  >
                    <option>Select</option>
                    <option>Fulltime</option>
                    <option>Internship</option>
                    <option>Part time</option>
                    <option>Contract</option>
                    <option>Resigned</option>
                  </Input>
                </Col>
                <Col sm={6}>
                  <Label for="examplePassword">Salary</Label>
                  <Input
                    type="text"
                    name="salary"
                    onChange={e => setSalary(e.target.value)}
                    id="examplePassword"
                    placeholder="Enter salary"
                  />
                </Col>

                <Col sm={6}>
                  <Label for="exampleFile">Profile Picture</Label>
                  <Input
                    type="file"
                    name="image"
                    onChange={e => setImage(e.target.files[0])}
                    id="exampleFile"
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
