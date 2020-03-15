import React from 'react';
import { Button, Col, Container, InputGroup, Row } from 'reactstrap';

const Home = props => {
  const admin = () => {
    props.history.push('/login');
  };

  const coordinator = () => {
    props.history.push('/coordinator/login');
  };
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <InputGroup className="input-prepend">
              <Button color="primary" size="lg" onClick={admin}>
                Admin
              </Button>{' '}
              <Button color="secondary" size="lg" onClick={coordinator}>
                Coordinator
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
