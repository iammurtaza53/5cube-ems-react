import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import 'jquery/dist/jquery.min.js';
import '../styles/App.scss';

//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

export default function payrollPage() {
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
  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Attendance Report</h3>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Report</CardHeader>
          <CardBody>
            <Table hover id="example">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((attendance, index) => {
               
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td style={{ textTransform: 'capitalize' }}>
                        {attendance.first_name + ' ' + attendance.last_name}
                      </td>
                      <td>{attendance.status}</td>
                      <td>{attendance.in_time}</td>
                      <td>{attendance.out_time}</td>
                      <td>{attendance.created_at}</td>

                    </tr>
                  );
                })}
              </tbody>
            
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

