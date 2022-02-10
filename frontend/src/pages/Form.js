import React from 'react';
import { Col, row,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Example extends React.Component {
constructor(){
    super();
    this.state={
        first_name:'',
        last_name:'',
        email:'',
    }
}

changeHandler(){
    console.log('input has changed')
}

submitForm(){
    console.log('form has been submitted')
}
  render() {
    return (
      <Form>
        <FormGroup row>
        <Col sm={4}>
          <Label for="exampleEmail">First Name</Label>
          <Input type="email" name="first_name" onChange={this.changeHandler} id="exampleEmail" placeholder="with a placeholder" />
        </Col>
        <Col sm={4}>
          <Label for="examplePassword">Last Name</Label>
          <Input type="text" name="last_name" id="examplePassword" onChange={this.changeHandler} placeholder="password placeholder" />
          </Col>
          <Col sm={4}>
          <Label for="examplePassword">Email</Label>
          <Input type="email" name="email" id="examplePassword" onChange={this.changeHandler} placeholder="password placeholder" />
          {/* <Label for="exampleSelect">Select</Label> */}
          {/* <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input> */}
          </Col>
        </FormGroup>
        {/* <FormGroup row>
        <Col sm={4}>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </Col>
        <Col sm={4}>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </Col>
          <Col sm={4}>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          </Col>
        </FormGroup> */}
        {/* <FormGroup row>
        <Col sm={4}>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </Col>
        <Col sm={4}>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </Col>
          <Col sm={4}>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          </Col>
        </FormGroup> */}
        
        <Button onChange={this.submitForm}>Submit</Button>
      </Form>
    );
  }
}