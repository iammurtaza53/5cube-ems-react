import React,{useState} from 'react';
import { UncontrolledAlert } from 'reactstrap';

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import '../App.css';

export default function Login() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

const handleSubmit = ()=>{
    const uploadData = new FormData();
    uploadData.append('username', username);
    uploadData.append('password', password);
      
      if (username === 'admin' && password === 'admin123'){
        fetch('https://fivecube-ems-backend.herokuapp.com/token/', {
          method: 'POST',
          body: uploadData,
        })
        .then(response => response.json())
    
          .then(data => {
            setInvalidCredentials(true);
            window.localStorage.setItem('access_token', data['access'])
            window.location.pathname = "/employees"
          });

      }

      else{
        console.log('user does not exist')
        window.location.pathname = "/login"
        alert('Invalid Credentials')
      }
       
}

  return (
    <div className="App">
      <h2>Admin Sign In</h2>
    
      <Form className="form">
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input
            type="username"
            name="text"
            id="exampleEmail"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Login</Button>
      </Form>
    </div>
  );
}
