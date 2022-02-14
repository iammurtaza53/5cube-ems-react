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

export default function EditAttendance(props) {
//   const [payroll, setPayroll] = useState([]);

//   useEffect(() => {
//     const url = 'https://fivecube-ems-backend.herokuapp.com/payroll/payroll/';

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         setPayroll(json.results);
//       } catch (error) {
//         // console.log('error', error);
//       }
//     };

//     fetchData();
//   }, []);

  const [status , setStatus] = useState(props.attendance.status);
  const [in_time, setInTime] = useState(props.attendance.in_time);
  const [out_time, setOutTime] = useState(props.attendance.out_time);
//   const [allowance, setAllowance] = useState(props.payroll.allowance);
//   const [last_increment, setLastIncrement] = useState(props.payroll.last_increment);
//   const [last_increment_date, setLastIncrementDate] = useState(props.payroll.last_increment_date);
//   const [last_salary_release_date, setLastSalaryReleaseDate] = useState(props.payroll.last_salary_release_date);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editForm = (id) => {
    
    const uploadData = new FormData();
    uploadData.append('status', status);
    uploadData.append('in_time', in_time);
    uploadData.append('out_time', out_time);
   
    
    fetch('https://fivecube-ems-backend.herokuapp.com/attendance/attendance/' + id + '/', {
      method: 'PUT',
      body: uploadData,
})
      .then(response => response.json()
      )
      .then(data => {
        // console.log('Success:', data);
        // console.log('data submitted');
        setModalIsOpenToFalse();
        // props.payrollList(payroll)
        props.closeModal(false)
      });

    };

  return (
    <>
      <div className="container mb-3">    
          <Modal isOpen={modalIsOpen}>
          <ModalHeader>Edit Attendance</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col sm={4}>
                  <Label for="exampleEmail">Status</Label>
                  {/* <Input
                    type="text"
                    name="status"
                    value= { props.attendance.status}
                    onChange={e => setStatus(e.target.value)}
                    id="exampleEmail"
                    placeholder="select"
                    
                  /> */}
                   <Input
                   type='select'
                    name="status"
                    defaultValue= { props.attendance.status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value={''}>Select</option>
                    <option value={'present'}>Present</option>
                    <option value={'absent'}>Absent</option>
                    <option value={'off'}>Off</option>
                  </Input>
                </Col>
                <Col sm={4}>
                  <Label >In Time</Label>
                  <Input
                    type="text"
                    name="in_time"
                    defaultValue= { props.attendance.in_time}
                    onChange={e => setInTime(e.target.value)}
                  
                  />
                </Col>

                <Col sm={4}>
                  <Label >Out Time</Label>
                  <Input
                    type="text"
                    name="out_time"
                    defaultValue= { props.attendance.out_time}
                    onChange={e => setOutTime(e.target.value)}
                   
                  />
                </Col>
 
              </FormGroup>

              <ModalFooter>
                <Button color="primary" onClick={()=> editForm(props.attendance.id)}>
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
