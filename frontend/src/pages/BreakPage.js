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
      const url = 'http://fivecube-ems-backend.herokuapp.com/break/break/';
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      setBreaks(json);
      // console.log('breaks', breaks);
    } catch (error) {
      // console.log('error', error);
    }
  };

  const handleUpdate = breakObj => {
    setOpenModal(true);
    setBreakObj(breakObj);
  };


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
             
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
