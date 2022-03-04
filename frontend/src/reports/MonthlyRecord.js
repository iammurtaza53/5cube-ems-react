import React, { useEffect, useState } from 'react';
import {
  Table,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import moment from 'moment';

import '../styles/App.scss';

export default function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const url =
    'https://fivecube-ems-backend.herokuapp.com/attendance/attendance/';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setAttendance(json);
      setAttendanceRecord(json)
    } catch (error) {}
  };

  // max.max = new Date().toISOString().split("T")[0];
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



  const handleMinDate = event => {
    setToDate(event.target.value);
    console.log('to date', event.target.value);
  };

  const handleMaxDate = event => {
    setFromDate(event.target.value);
    console.log('from date', event.target.value);
  };

 const filteredData =()=>{
 
  let filtered = attendanceRecord.filter(
    record =>
      (record.created_at >= fromDate) || (record.created_at >= toDate) ,
  )
  setAttendance(filtered);
  console.log('button call')
  console.log(filtered, "filtered")
 }

 const totalHours=(inTime,outTime)=>
 {
  var ms = moment(outTime,"HH:mm").diff(moment(inTime,"HH:mm"));
  var d = moment.duration(ms);
  var s =  d.hours() + ':' + d.minutes()
   return (
    s
   )
 }


////// time function //////
function addTimes (startTime, endTime) {
  var times = [ 0, 0]
  var max = times.length

  var a = (startTime || '').split(':')
  var b = (endTime || '').split(':')

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i]
  }

  var hours = times[0]
  var minutes = times[1]
 

  if (minutes >= 60) {
    var h = (minutes / 60) << 0
    hours += h
    minutes -= 60 * h
  }

  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
}
////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Monthly Record</h3>
          </Col>
        </Row>
        <Row>
          <Col sm={3} className="my-3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  Start
                  {/* <MdDateRange /> */}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={handleMinDate}
                type="date"
                name="min"
                id="min"
                placeholder="To Date"
                max={new Date().toISOString().split("T")[0]}
              />
            </InputGroup>
          </Col>
          <Col sm={3} className="my-3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  End
                  {/* <MdDateRange /> */}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={handleMaxDate}
                type="date"
                name="max"
                id="max"
                placeholder="From Date"
                max={new Date().toISOString().split("T")[0]}
                
              />
            </InputGroup>
          </Col>
          <Col sm={4} className="my-3">
            <Button onClick={filteredData}>Filter</Button>
          </Col>
          <Col sm={2} className="my-3">
           <h6>Total Hours: 207</h6>
          </Col>
        </Row>


        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Total Hours</th>
            </tr>
          </thead>
          <tbody>
  
         
            {employees.map((employee, index) => {

              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textTransform: 'capitalize' }}>
                    {employee.first_name + ' ' + employee.last_name}
                  </td>
                  
                  {(function(){
                    let obj = attendance.filter(x => x.employee === employee.id)
                    let time = '';
                    console.log(obj,"data")
                    obj.map((object)=>{
                      let time1 = totalHours(object.in_time,object.out_time) 
                      time = addTimes(time,time1)
                      return(
                            time
                      )
                    })
                    
                    if(obj.length != 0){
                      return(
                        <td>{time}</td>
                      )
                    }
                    else{
                      return(
                        <td> -- </td>
                      )
                    }
                  })()}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
