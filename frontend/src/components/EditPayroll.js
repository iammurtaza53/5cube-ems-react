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

export default function EditPayroll(props) {
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    const url = 'https://fivecube-ems-backend.herokuapp.com/payroll/payroll/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPayroll(json.results);
      } catch (error) {
        // console.log('error', error);
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

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editForm = (id) => {
    
    const uploadData = new FormData();
    uploadData.append('first_name', firstName);
    uploadData.append('last_name', lastName);
    uploadData.append('basic_pay', basic_pay);
    uploadData.append('allowance', allowance);
    uploadData.append('last_increment', last_increment);
    uploadData.append('last_increment_date', last_increment_date);
    uploadData.append('last_salary_release_date', last_salary_release_date);
    
    fetch('https://fivecube-ems-backend.herokuapp.com/payroll/payroll/' + id + '/', {
      method: 'PUT',

      body: uploadData,
})
      .then(response => response.json()
      )

      .then(data => {
        // console.log('Success:', data);
        // console.log('data submitted');
        setModalIsOpenToFalse();
        props.payrollList(payroll)
        props.closeModal(false)
      });

    };

  return (
    <>
      <div className="container mb-3">    
          <Modal isOpen={modalIsOpen}>
          <ModalHeader>Edit Payroll</ModalHeader>
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
