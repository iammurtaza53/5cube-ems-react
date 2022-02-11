import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
  Col, Form, FormGroup, Label, Input} from 'reactstrap';
  import { FaEdit } from "react-icons/fa";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      first_name:'',
        last_name:'',
        email:'',
        
    };
    // console.log(this.props.theEmployee)
    this.changeHandler=this.changeHandler.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  fetchData(){
    var id=this.props.id;
    // console.log("iddd",id)
    fetch('https://fivecube-ems-backend.herokuapp.com/employee/'+id)
    .then(response=>response.json())
    .then((data)=>{
        this.setState({
            full_name:data.full_name,
            last_name:data.email,
            email:data.email,  
        });
    });
}

componentDidMount(){
    this.fetchData();
}


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  changeHandler(event){
    this.setState({
      [event.target.name]:event.target.value
    });

    console.log(this.state)
}

submitForm(){
  fetch('https://fivecube-ems-backend.herokuapp.com/employees/',
  {
    method:'POST',
    body:JSON.stringify(this.state),
    headers:{
      'Content-type':'application/json; charset=UTF-8',
    },
  });
    // console.log('form has been submitted')
}

  render() {
    return (
      <div>
    <Button className='btn btn-warning' onClick={this.toggle}><FaEdit /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Form>
        <FormGroup row>
        <Col sm={4}>
          <Label for="exampleEmail">First Name</Label>
          <Input type="email" value={this.state.first_name} name="first_name" onChange={this.changeHandler} id="exampleEmail" placeholder="with a placeholder" />
        </Col>
        <Col sm={4}>
          <Label for="examplePassword">Last Name</Label>
          <Input type="text"  value={this.state.last_name} name="last_name" id="examplePassword" onChange={this.changeHandler} placeholder="password placeholder" />
          </Col>
          <Col sm={4}>
          <Label for="examplePassword">Email</Label>
          <Input type="email"  value={this.state.email} name="email" id="examplePassword" onChange={this.changeHandler} placeholder="password placeholder" />
          </Col>
        </FormGroup>
        <ModalFooter>
        <Button style= {{float:"right"}} onClick={this.submitForm}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
      </Form>
            
          </ModalBody>
         
        </Modal>
      </div>
    );
  }
}

export default ModalExample;