import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Col,
} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import { MdEdit, MdSend} from 'react-icons/md';
import 'jquery/dist/jquery.min.js';
import '../styles/App.scss';
import userImage from 'assets/user.png';
import EditAttendance from '../components/EditAttendance';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

export default function EmployeePage() {
       //initialize datatable
       $(function () {
        setTimeout(function(){
        $('#example').DataTable(
        //   {
        //   "bDestroy": true,
        //   'bFilter': false,

        // }
        )
         } ,1000);
    });
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [currentattendance, setCurrentAttendance] = useState([]);
  const[attendanceObj, setAttendanceObj] =useState([]);
  const [openModal, setOpenModal] = useState(false);
  //employee data for table
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const url = 'https://fivecube-ems-backend.herokuapp.com/leaves/employeeDropdown/';
        const response = await fetch(url);
        const json = await response.json();
        setEmployees(json);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  // marked attendance data
  useEffect(() => {

    fetchData();
   
  }, []);

  const fetchData = async () => {
    try {
      const url = 'https://fivecube-ems-backend.herokuapp.com/attendance/newattendance/';
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      setCurrentAttendance(json);
    } catch (error) {
      // console.log('error', error);
    }
  };

  fetchData();

  // attendance mark
  const handleAttendaceMark = id => {
    var time = new Date();
    let time_x = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    let empl_attn = currentattendance.find(x => x.employee === id)
    // console.log(empl_attn.status, "hereeeeeee")
    if (!empl_attn){
      const uploadData = new FormData();
      uploadData.append('employee', id);
      uploadData.append('status', attendance);
      if (attendance === 'absent' || attendance === 'off'){
        // console.log(attendance, "attn")
        uploadData.append('in_time', null);
        uploadData.append('out_time', null);
      }
      else {
        uploadData.append('in_time', time_x);
        uploadData.append('out_time', null);
      }
      
      const requestOptions = {
        method: 'POST',
        body: uploadData,
      };
      fetch('https://fivecube-ems-backend.herokuapp.com/attendance/attendance/', requestOptions)
    // fetch('http://localhost:8000/attendance/attendance/', requestOptions)
      .then(fetchData())
        .catch(error => console.log(error));
    }
    else{
      if(empl_attn.status === 'present'){
        let id = empl_attn.id
        const uploadData = new FormData();
        uploadData.append('out_time', time_x);
        const requestOptions = {
          method: 'PUT',
          body: uploadData,
        };
        fetch('https://fivecube-ems-backend.herokuapp.com/attendance/attendance/'+id+'/', requestOptions)
          .then(fetchData())
          .catch(error => console.log(error));
      }
    // console.log('record existssss')
    }
  };
  

  const handleUpdate =(obj) => {
    setOpenModal(true);
    // console.log("clicked")
    setAttendanceObj(obj);
    console.log(obj,"object here global")
    console.log(attendanceObj,"object here global")
  };


  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Employees Attendance</h3>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Attendance</CardHeader>
          <CardBody>
            <Table hover id='example' className='table table-borderless display nowrap'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Update</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => {
                  // console.log('data', employee);
                  let url = ' https://fivecube-ems-backend.herokuapp.com/' + employee.profile_picture_path
                    .split('/')
                    .splice(-2)
                    .join('/');

                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {/* <img width="80" height="65" src={url} /> */}
                        <img width="80" height="65" src={userImage} />
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {employee.first_name + ' ' + employee.last_name}
                      </td>
                              {(function() {
                                let obj = currentattendance.find(x => x.employee === employee.id)
                                window.obj = obj;
                                if (obj) {
                                  
                                  // console.log('presnet')
                                  return (
                                  <>
                                  <td>{obj.status}</td>
                                  <td>
                                  {obj.in_time != 'null'
                                    ? obj.in_time
                                    : '-'}
                                </td>
                                <td>
                                {obj.out_time != 'null'
                                  ? obj.out_time
                                  : '-'}
                              </td>
                              <td>
                              {obj.out_time === 'null'
                                    ?   <button
                                    className="btn btn-outline-info"
                                    onClick={() => handleAttendaceMark(employee.id)}
                                  >
                                    <MdSend></MdSend>
                                  </button>
                                    :   <button disabled={true}
                                    className="btn btn-outline-info"
                                    onClick={() => handleAttendaceMark(employee.id)}
                                  >
                                    <MdSend></MdSend>
                                  </button>}
                            
                      </td>
                      <td>
                       <button 
                          className="btn btn-outline-success"
                          onClick={() => handleUpdate(obj)}
                        >
                          <MdEdit></MdEdit>
                        </button>
                      </td>
                              </>)
                                  
                                } else {
                                  return (
                                    <>
                                    <td>
                                    <select
                                      name="attendance"
                                      onChange={e => setAttendance(e.target.value)}
                                    >
                                      <option value={''}>Select</option>
                                      <option value={'present'}>Present</option>
                                      <option value={'absent'}>Absent</option>
                                      <option value={'off'}>Off</option>
                                    </select>
                                  </td>
                                    <td> - </td>
                                    <td> - </td>
                                    <td>
                        <button 
                          className="btn btn-outline-info" 
                          onClick={() => handleAttendaceMark(employee.id)}
                        >
                          <MdSend></MdSend>
                        </button>
                      </td>
                      <td>
                       <button 
                          className="btn btn-outline-success" disabled='true'
                          onClick={() => handleUpdate()}
                        >
                          <MdEdit></MdEdit>
                        </button>
                      </td>
                                  </>)
                                }
                              })()}                    
                    </tr>
                  );
                })}
              </tbody>
              {openModal && (<EditAttendance
                  closeModal={setOpenModal}
                  attendance={attendanceObj}
                  // payrollList={fetchData}
                />)}
              
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
