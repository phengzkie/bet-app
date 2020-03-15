import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import AuthContext from '../../../context/auth/authContext';

function CoordinatorRow(props) {
  const coordinator = props.coordinator;
  const coordinatorLink = `/coordinators/${coordinator._id}`;

  return (
    <tr key={coordinator._id}>
      <th scope="row">
        <Link to={coordinatorLink}>{coordinator.name}</Link>
      </th>
      <td>{coordinator.station}</td>
      <td>{coordinator.email}</td>
      <td>{coordinator.mobile}</td>
      <td>
        {coordinator.percentage}
        {'%'}
      </td>
    </tr>
  );
}

const Coordinators = () => {
  const authContext = useContext(AuthContext);

  const { coordinators, getCoordinators } = authContext;

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getCoordinators();

    // eslint-disable-next-line
  }, []);

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const pageSize = 10;

  const pageSizeCount = Math.ceil(coordinators.length / pageSize);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={8}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Coordinators
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Station</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {coordinators !== null ? (
                    coordinators
                      .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                      )
                      .map((coordinator, index) => (
                        <CoordinatorRow key={index} coordinator={coordinator} />
                      ))
                  ) : (
                    <p>Please Add Coordinators</p>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Pagination>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={e => handlePageClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>
            {[...Array(pageSizeCount)].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= pageSizeCount - 1}>
              <PaginationLink
                onClick={e => handlePageClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default Coordinators;
