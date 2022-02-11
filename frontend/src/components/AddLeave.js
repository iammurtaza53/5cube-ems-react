import React,{useState,useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, Col,ModalBody,Modal,ModalFooter,ModalHeader } from 'reactstrap';

export default function AddLeave(props) {

  const [leave, setLeave] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = 'https://fivecube-ems-backend.herokuapp.com/leaves/leave/';
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setLeave(json);
      console.log('leave', leave);
    } catch (error) {
      console.log('error', error);
    }
  };
    const [employee_name, setName] = useState('');
    const [leave_type, setLeaveType] = useState('');
    const [to_date, setToDate] = useState('');
    const [from_date, setFromDate] = useState('');
    const [description, setDescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);
    // dropdown state
    const [dropdown, setDropdown] = useState([])

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  }

  const submitForm = () =>{
    fetch("https://fivecube-ems-backend.herokuapp.com/leaves/leave/",
    {
      method:'POST',
      headers:{
        'Content-type':'application/json; charset=UTF-8',
      },
      body: JSON.stringify({"employee":employee_name,
    "leave_type":leave_type,"to_date":to_date,"from_date":from_date,"description":description}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setModalIsOpenToFalse()
      props.leaveList(leave)
      props.closeModal(false)
    })
      console.log('form has been submitted')
      //     console.log(firstName);
      //   console.log(lastName);
            
  }
  
  useEffect(() => {
    const url = "https://fivecube-ems-backend.herokuapp.com/leaves/employeeDropdown/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setDropdown(json)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);

    return (
        <>
        <div className="container mb-3">
        {/* <Button onClick={setModalIsOpenToTrue} style= {{float:"right"}}>Add Leave</Button> */}

        <Modal isOpen={modalIsOpen}>
      <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
          <Form >
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
          <Label for="examplePassword">Leave Type</Label>
          <Input type="select"  name="leave_type" onChange={(e) => setLeaveType(e.target.value)} id="examplePassword"  placeholder="password placeholder">
          <option >Select</option>
          <option>Annual</option>
            <option>Marriage</option>
            <option>Sick</option>
            <option>Casual</option>
            
            </Input>
          </Col>
          <Col sm={6}>
          <Label for="examplePassword">From Date</Label>
          <Input type="date"  name="from_date" onChange={(e) => setFromDate(e.target.value)} id="examplePassword"  placeholder="password placeholder"/>
          </Col>
          <Col sm={6}>
          <Label for="examplePassword">To Date</Label>
          <Input type="date"  name="to_date" onChange={(e) => setToDate(e.target.value)} id="examplePassword"  placeholder="password placeholder" />
          </Col>
         
          <Col sm={12}>
          <Label for="examplePassword">Description</Label>
          <Input type="textarea"  name="description" onChange={(e) => setDescription(e.target.value)} id="examplePassword"  placeholder="password placeholder"/>
          </Col>
          {/* <Col sm={4}>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="profile_picture" onChange={(e) => setImage(e.target.value)} id="exampleFile" />
          </Col> */}
        </FormGroup>
        <ModalFooter>
            <Button color="primary" onClick={submitForm}>Submit</Button>{' '}
            <Button color="secondary" onClick={setModalIsOpenToFalse}>Cancel</Button>
          </ModalFooter>
      </Form>
            
          </ModalBody>
                
            </Modal>
      </div>
        </>
    )
}
