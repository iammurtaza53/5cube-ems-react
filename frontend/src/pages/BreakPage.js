import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col, Button } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import {MdEdit } from 'react-icons/md';
import EditBreak from '../components/EditBreaks';
import AddBreak from '../components/AddBreaks';
import 'jquery/dist/jquery.min.js';
import '../styles/App.scss';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

export default function BreakPage() {
  //initialize datatable
  $(function () {
    setTimeout(function () {
      $('#example').DataTable();
    }, 1000);
  });
  const [breaks, setBreaks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [breakObj, setBreakObj] = useState([]);
  const [openModal2, setOpenModal2] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = 'http://127.0.0.1:8000/break/break/';
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      setBreaks(json);
      console.log('breaks', breaks);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleUpdate = breakObj => {
    setOpenModal(true);
    setBreakObj(breakObj);
  };

  // // user approve request leave
  // const handleApprove = id => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status: 'Approve' }),
  //   };

  //   fetch(
  //     'https://fivecube-ems-backend.herokuapp.com/leaves/leave/' + id + '/',
  //     requestOptions,
  //   ).then(() => {
  //     fetchData();
  //   });
  // };

  // user reject request leave
  // const handleReject = id => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status: 'Rejected' }),
  //   };

  //   fetch(
  //     'https://fivecube-ems-backend.herokuapp.com/leaves/leave/' + id + '/',
  //     requestOptions,
  //   ).then(() => {
  //     fetchData();
  //   });
  // };

  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Breaks</h3>
          </Col>
          <Col>
            <Button
              onClick={() => setOpenModal2(true)}
              style={{ float: 'right' }}
            >
              Add Break
            </Button>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Breaks</CardHeader>
          <CardBody>
            <Table hover id="example">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Reason</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Edit</th>

                  {/* <th>Designation</th>
                  <th>Leave Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Description</th>
                  <th>Approve</th>
                  <th>Reject</th> */}
                </tr>
              </thead>
              <tbody>
                {breaks.map((breaks, index) => {
                  
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td style={{ textTransform: 'capitalize' }}>
                        {breaks.first_name + ' ' + breaks.last_name}
                      </td>
                      <td>{breaks.reason}</td>
                      <td>{breaks.start}</td>
                      <td>{breaks.end}</td>
                      {/* <td>{leave.from_date}</td>
                      <td>{leave.to_date}</td>
                      <td>{leave.description}</td> */}

                      {/* <td> */}
                        
                        {/* <button
                          className="btn btn-outline-success"
                          onClick={() => handleApprove(leave.id)}
                        >
                          <MdCheckCircle></MdCheckCircle>
                        </button> */}
                        {/* &nbsp;&nbsp;&nbsp; */}
                      {/* </td> */}
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleUpdate(breaks)}
                        >
                          <MdEdit></MdEdit>
                        </button>
                      
                      </td>
                      
                    </tr>
                  );
                  
                })} 
              </tbody>
              {openModal2 && (
                <AddBreak closeModal2={setOpenModal2} breakList={fetchData} />
              )}
              {openModal && (
                <EditBreak
                  closeModal={setOpenModal}
                  breaks={breakObj}
                  breakList={fetchData}
                />
              )}
              {/* {openModal && (
                <AddLeave closeModal={setOpenModal} leaveList={fetchData} />
              )} */}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
