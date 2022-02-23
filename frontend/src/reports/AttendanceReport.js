
import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col,Input,Button,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import 'jquery/dist/jquery.min.js';
import '../styles/App.scss';
import { MdDelete} from 'react-icons/md';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

// import 'jquery-ui/ui/widgets/datepicker';
// import 'datatables.net-datetime/js/dataTables.dateTime'
import 'datatables.net-datetime/dist/dataTables.dateTime.min.css'
import { MdDateRange} from 'react-icons/md';
import DateTime from 'datatables.net-datetime';
// import Buttons from 'datatables.net-buttons';

export default function AttendanceReport() {

  $(function () {
    setTimeout(function () {
      $('#example').DataTable();
    }, 1000);
  });

 
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const url = 'https://fivecube-ems-backend.herokuapp.com/attendance/attendance/';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setAttendance(json);
    } catch (error) {
    }
  };

  const handleDelete = id => {
    fetch('https://fivecube-ems-backend.herokuapp.com/attendance/attendance/' + id + '/', {
      method: 'DELETE',
    }).then(() => {
      setAttendance(attendance.filter(attendance => attendance.id !== id));
    });
  };
  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Attendance Report</h3>
          </Col>
        </Row>
        {/* <Row>
          <Col sm={3} className="my-3">
          <InputGroup>
    <InputGroupAddon addonType="prepend">
        <InputGroupText>
            <MdDateRange />
        </InputGroupText>
    </InputGroupAddon>
              <Input type="text" name="min" id="min" placeholder="To Date" />
    </InputGroup>
            
          </Col>
          <Col sm={3} className="my-3">
          <InputGroup>
    <InputGroupAddon addonType="prepend">
        <InputGroupText>
            <MdDateRange />
        </InputGroupText>
    </InputGroupAddon>
              <Input type="text" name="max" id="max" placeholder="From Date" />
    </InputGroup>
          </Col>
          <Col sm={2} className="my-3">
          <Button>Filter</Button>
          </Col>
        </Row> */}
         
            <Table hover id="example" className='table table-borderless display nowrap'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((attendance, index) => {
                  var date = new Date(attendance.created_at)
                  console.log(typeof(date.getFullYear()+'-'+(date.getMonth()+1) +'-'+date.getDate()))
                  var newdate =date.getFullYear()+'/'+(date.getMonth()+1) +'/'+date.getDate();
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td style={{ textTransform: 'capitalize' }}>
                        {attendance.first_name + ' ' + attendance.last_name}
                      </td>
                      <td>{attendance.status}</td>
                      <td>{attendance.in_time}</td>
                      <td>{(attendance.out_time?'': attendance.out_time)}</td>
                      <td>{newdate}</td>
                      {/* {console.log((new Date(attendance.created_at)))} */}
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(attendance.id)}
                        >
                          <MdDelete></MdDelete>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            
            </Table>
         
      </div>
    </>
  );
}