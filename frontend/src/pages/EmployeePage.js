import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Col, Button } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import { MdDelete, MdEdit } from 'react-icons/md';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import 'jquery/dist/jquery.min.js';
import '../styles/App.scss';
import userImage from 'assets/user.png';

//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

export default function EmployeePage() {
  //initialize datatable
  $(function () {
    setTimeout(function () {
      $('#example').DataTable();
    }, 1000);
  });
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://fivecube-ems-backend.herokuapp.com/employee/employees/';
    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json, 'json');
      setEmployees(json);
      // console.log(json.results, 'asadasd')
    } catch (error) {
      // console.log('error', error);
      // console.log(employees, "emppppppppppppppppppppp")
    }
  };

  const handleDelete = id => {
    fetch('https://fivecube-ems-backend.herokuapp.com/employee/employees/' + id + '/', {
      method: 'DELETE',
    }).then(() => {
      setEmployees(employees.filter(employee => employee.id !== id));
    });
  };

  const handleUpdate = employeeObj => {
    setOpenModal(true);
    setEmployeeID(employeeObj);
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col>
            <h3 className="mb-3">Employees List</h3>
          </Col>
          <Col>
            <Button
              onClick={() => setOpenModal2(true)}
              style={{ float: 'right' }}
            >
              Add Employee{' '}
            </Button>
          </Col>
        </Row>
        <Card className="mb-3">
          <CardHeader>Employees List</CardHeader>
          <CardBody>
            <Table hover id="example" className='table table-borderless display nowrap'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => {
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
                      <td>{employee.email}</td>

                      <td>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => handleUpdate(employee)}
                        >
                          <MdEdit></MdEdit>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <MdDelete></MdDelete>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {openModal2 && (
                <AddEmployee closeModal2={setOpenModal2} empList={fetchData} />
              )}

              {openModal && (
                <EditEmployee
                  closeModal={setOpenModal}
                  emp={employeeID}
                  empList={fetchData}
                />
              )}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
