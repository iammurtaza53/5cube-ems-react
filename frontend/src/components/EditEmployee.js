import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
// import {useHistory} from 'react-router-dom';
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

import { MdEdit } from 'react-icons/md';
import EmployeePage from '../pages/EmployeePage';
export default function EditEmployee(props) {
    // console.log(props, "propssssss",props.emp.first_name)
  // fetch employees data
  const [employees, setEmployees] = useState([]);
  const session_token = window.localStorage.getItem('access_token')
  // const history = useHistory();
    
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
        console.log('error', error);
      }
    };
//   let name = props.id.first_name
//   console.log('nameee',name)
  // filter out the employee according the id provided
//   let employee = employees.find(emp => emp.id == props.id);
  // let emp =JSON.parse(employee)
//   console.log(employee, 'employeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  // console.log(emp, "employeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  // set state of form empty
  const [firstName, setFirstName] = useState(props.emp.first_name);
  const [lastName, setLastName] = useState(props.emp.last_name);
  const [email, setEmail] = useState(props.emp.email);
  const [password, setPassword] = useState(props.emp.password);
  const [designation, setDesignation] = useState(props.emp.designation);
  const [cnic, setCnic] = useState(props.emp.cnic);
  const [address, setAddress] = useState(props.emp.address);
  const [contact, setContact] = useState(props.emp.contact);
  const [joining_date, setJoiningDate] = useState(props.emp.joining_date);
  const [status, setStatus] = useState(props.emp.status);
  const [salary, setSalary] = useState(props.emp.salary);
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // console.log("fff",firstName)
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editForm  = async (id) => {
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

    fetch('https://fivecube-ems-backend.herokuapp.com/employee/employees/' + id + '/', {
      method: 'PUT',

    
      body: uploadData,

      //     body: JSON.stringify({"first_name":firstName,"last_name":lastName,"email":email,'password':password,
      //   'designation':designation,'cnic':cnic,'address':address,'contact':contact,
      // 'joining_date':joining_date,'status':status,'salary':salary,'profile_picture_path':image}),
    })
      .then(response => response.json()
      )

      .then(data => {
        console.log('Success:', data);
        console.log('data submitted');
        setModalIsOpenToFalse();
        props.empList(employees)
        props.closeModal(false)
        // history.push("/employees");
        // history.go(0)
      });
    // .then (res =>console.log(res))
    // .catch(error =>console.log(error))
    console.log('form has been submitted');
    console.log(firstName);
    console.log(lastName);
  };

  return (
    <>
      <div className="container mb-3">
        {/* <Button onClick={setModalIsOpenToTrue} style= {{float:"right"}}>Add Employee</Button> */}
        {/* <Button onClick={setModalIsOpenToTrue}>
          <MdEdit></MdEdit>
        </Button> */}
        
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
                    defaultValue= { props.emp.first_name}
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
                    defaultValue= { props.emp.last_name}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </Col>

                <Col sm={6}>
                  <Label >Email</Label>
                  <Input
                    type="email"
                    name="email"
                    defaultValue= { props.emp.email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Password</Label>
                  <Input
                    type="password"
                    name="password"
                    defaultValue= { props.emp.password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Designation</Label>
                  <Input
                    type="text"
                    name="designation"
                    defaultValue= { props.emp.designation}
                    onChange={e => setDesignation(e.target.value)}
                    placeholder="Enter designation"
                  />
                </Col>
                <Col sm={6}>
                  <Label >CNIC</Label>
                  <Input
                    type="text"
                    name="cnic"
                    defaultValue= { props.emp.cnic}
                    onChange={e => setCnic(e.target.value)}
                    placeholder="Enter CNIC"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Address</Label>
                  <Input
                    type="text"
                    name="address"
                    defaultValue= { props.emp.address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Contact</Label>
                  <Input
                    type="text"
                    name="contact"
                    defaultValue= { props.emp.contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder="Enter contact"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Joining Date</Label>
                  <Input
                    type="date"
                    name="date"
                    defaultValue= { props.emp.joining_date}
                    onChange={e => setJoiningDate(e.target.value)}
                    placeholder="Enter joining date"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Status</Label>
                  <Input
                    type="select"
                    name="status"
                    defaultValue= { props.emp.status}
                    onChange={e => setStatus(e.target.value)}
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
                  <Label >Salary</Label>
                  <Input
                    type="text"
                    name="salary"
                    defaultValue= { props.emp.salary}
                    onChange={e => setSalary(e.target.value)}
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
                <Button color="primary" onClick={()=> editForm(props.emp.id)}>
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
