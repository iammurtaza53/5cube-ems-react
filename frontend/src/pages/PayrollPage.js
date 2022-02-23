import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col} from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import { MdEdit } from 'react-icons/md';
import EditPayroll from '../components/EditPayroll';
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

  const [payroll, setPayroll] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [payrollObj, setPayrollObj] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const url = 'https://fivecube-ems-backend.herokuapp.com/payroll/payroll/';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setPayroll(json);
    } catch (error) {
    }
  };

  const handleUpdate = payrollObj => {
    setOpenModal(true);
    setPayrollObj(payrollObj);
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Employee Payroll</h3>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Payroll</CardHeader>
          <CardBody>
            <Table hover id="example" className='table table-borderless display wrap'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Basic Pay</th>
                  <th>Allowance</th>
                  <th>Current Salary</th>
                  <th>Last Increment</th>
                  <th>Last Increment Date</th>
                  <th>Last Salary Release Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((payroll, index) => {
               
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td style={{ textTransform: 'capitalize' }}>
                        {payroll.first_name + ' ' + payroll.last_name}
                      </td>
                      <td>{payroll.basic_pay}</td>
                      <td>{payroll.allowance}</td>
                      <td>{payroll.salary}</td>
                      <td>{payroll.last_increment}</td>
                      <td>{payroll.last_increment_date}</td>
                      <td>{payroll.last_salary_release_date}</td>
                      <td>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => handleUpdate(payroll)}
                        >
                          <MdEdit></MdEdit>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {openModal && (
                <EditPayroll
                  closeModal={setOpenModal}
                  payroll={payrollObj}
                  payrollList={fetchData}
                />
              )}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

