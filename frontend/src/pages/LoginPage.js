import React,{useState } from 'react';


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
    const [currentUser, setCurrentUser] = useState([]);
const handleSubmit = ()=>{
    const uploadData = new FormData();
    uploadData.append('username', username);
    uploadData.append('password', password);
    const session_token = window.localStorage.getItem('access_token')

    if(session_token){
        // console.log('your are already logged in')
        window.location.pathname = "/employees"
    }
    
    else{
      var users =  fetch('https://fivecube-ems-backend.herokuapp.com/employee/users/')
      .then(() => {
        // console.log('usseerr' , users)
      });
      // console.log('usseerr' , currentUser)
      if (currentUser){
        fetch('https://fivecube-ems-backend.herokuapp.com/token/', {
          method: 'POST',
          body: uploadData,
        })
        .then(response => response.json())
    
          .then(data => {
            // console.log('Success:', data['access']);
            // console.log('LoginSuccess');
            window.localStorage.setItem('access_token', data['access'])
            window.location.pathname = "/employees"
          });

      }

      else{
        // console.log('user does not exist')
        window.location.pathname = "/login"
      }
       
    }
}

  return (
    <div className="App">
      <h2>Sign In</h2>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
