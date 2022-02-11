import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col,Button} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import { MdCheckCircle, MdClear } from 'react-icons/md';
import AddLeave from '../components/AddLeave';
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

export default function LeavePage() {
       //initialize datatable
       $(function () {
        setTimeout(function(){
        $('#example').DataTable();
         } ,1000);
    });
  const [leave, setLeave] = useState([]);
  const [openModal,setOpenModal] = useState(false);

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

  // user approve request leave
  const handleApprove = id => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Approve' }),
    };

    fetch(
      'https://fivecube-ems-backend.herokuapp.com/leaves/leave/' + id + '/',
      requestOptions,
    ).then(() => {
      fetchData();
    });
  };

  // user reject request leave
  const handleReject = id => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Rejected' }),
    };

    fetch(
      'https://fivecube-ems-backend.herokuapp.com/leaves/leave/' + id + '/',
      requestOptions,
    ).then(() => {
      fetchData();
    });
  };

 



  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Leaves</h3>
          </Col>
          <Col>
          <Button onClick={() => setOpenModal(true)} style= {{float:"right"}}>Add Leave</Button>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Leaves</CardHeader>
          <CardBody>
            <Table hover id="example">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Designation</th>
                  <th>Leave Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Description</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {leave.map((leave, index) => {
                  console.log(leave.first_name);
                  console.log(leave.employee);
                  console.log('asdas', leave);
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td style={{ textTransform: 'capitalize' }}>
                        {leave.first_name + ' ' + leave.last_name}
                      </td>
                      <td>{leave.status}</td>
                      <td>{leave.designation}</td>
                      <td>{leave.leave_type}</td>
                      <td>{leave.from_date}</td>
                      <td>{leave.to_date}</td>
                      <td>{leave.description}</td>

                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleApprove(leave.id)}
                        >
                          <MdCheckCircle></MdCheckCircle>
                        </button>
                        {/* &nbsp;&nbsp;&nbsp; */}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleReject(leave.id)}
                        >
                          <MdClear></MdClear>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {openModal &&  <AddLeave closeModal={setOpenModal} leaveList={fetchData}/>}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
