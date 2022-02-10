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

import { MdEdit } from 'react-icons/md';
export default function EditPayroll(props) {
    // console.log(props, "propssssss")
  // fetch employees data
  const [payroll, setPayroll] = useState([]);
  

  
  useEffect(() => {
    const url = 'http://127.0.0.1:8000/payroll/payroll/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPayroll(json.results);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const [firstName, setFirstName] = useState(props.payroll.first_name);
  const [lastName, setLastName] = useState(props.payroll.last_name);
  const [basic_pay, setBasicPay] = useState(props.payroll.basic_pay);
  const [allowance, setAllowance] = useState(props.payroll.allowance);
  const [last_increment, setLastIncrement] = useState(props.payroll.last_increment);
  const [last_increment_date, setLastIncrementDate] = useState(props.payroll.last_increment_date);
  const [last_salary_release_date, setLastSalaryReleaseDate] = useState(props.payroll.last_salary_release_date);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editForm = (id) => {
    console.log(id, "iiiiiididdd")
    console.log('i got calleddd')
    console.log(allowance)
    const uploadData = new FormData();
    console.log(allowance, "dataaaaaa")
    uploadData.append('first_name', firstName);
    uploadData.append('last_name', lastName);
    uploadData.append('basic_pay', basic_pay);
    uploadData.append('allowance', allowance);
    uploadData.append('last_increment', last_increment);
    uploadData.append('last_increment_date', last_increment_date);
    uploadData.append('last_salary_release_date', last_salary_release_date);
    
    

    fetch('http://localhost:8000/payroll/payroll/' + id + '/', {
      method: 'PUT',

      // headers:{
      //   'content-type': 'multipart/form-data ;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      //   // 'Accept': "application/json",
      //   // "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" ,
      // },
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
        props.payrollList(payroll)
        props.closeModal(false)
      });
    // .then (res =>console.log(res))
    // .catch(error =>console.log(error))
    // console.log('form has been submitted');
    // console.log(firstName);
    // console.log(lastName);
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
                    value= { props.payroll.first_name}
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
                    value= { props.payroll.last_name}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </Col>

                <Col sm={6}>
                  <Label >Basic Pay</Label>
                  <Input
                    type="text"
                    name="basic_pay"
                    defaultValue= { props.payroll.basic_pay}
                    onChange={e => setBasicPay(e.target.value)}
                    placeholder="Enter Basic Pay"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Allowance</Label>
                  <Input
                    type="text"
                    name="allowance"
                    defaultValue= { props.payroll.allowance}
                    onChange={e => setAllowance(e.target.value)}
                    placeholder="Enter Allowance"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Last Increment</Label>
                  <Input
                    type="text"
                    name="last_increment"
                    defaultValue= { props.payroll.last_increment}
                    onChange={e => setLastIncrement(e.target.value)}
                    placeholder="Enter Last Increment"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Last Increment Date</Label>
                  <Input
                    type="date"
                    name="last_increment_date"
                    defaultValue= { props.payroll.last_increment_date}
                    onChange={e => setLastIncrementDate(e.target.value)}
                    placeholder="Enter Last Increment Date"
                  />
                </Col>
                <Col sm={6}>
                  <Label >Last Salary Release Date</Label>
                  <Input
                    type="date"
                    name="last_salary_release_date"
                    defaultValue= { props.payroll.last_salary_release_date}
                    onChange={e => setLastSalaryReleaseDate(e.target.value)}
                    placeholder="Enter Last Salary Release Date"
                  />
                </Col>
                
              </FormGroup>

              <ModalFooter>
                <Button color="primary" onClick={()=> editForm(props.payroll.id)}>
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
