import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TreeForm from './components/TreeForm';

const AddTrees = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">ADD TREE</h3>
      </Col>
    </Row>
    <Row>
      <TreeForm />
    </Row>
  </Container>
);

export default AddTrees;
