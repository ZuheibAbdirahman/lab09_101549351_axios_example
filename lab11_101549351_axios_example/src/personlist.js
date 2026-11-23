import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PersonList extends Component {
  // Define state default values as per lab instructions
  state = {
    persons: []
  };

  // Component Lifecycle Callback to fetch data using axios
  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  render() {
    return (
      <Container className="mt-4">
        <h2 className="text-center mb-4">User List</h2>
        <Row>
          {this.state.persons.map((person, index) => (
            <Col md={12} key={index} className="mb-3">
              <Card>
                <Card.Header as="h5">
                  Mr. {person.name.first} {person.name.last} - {person.login.uuid}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3} className="text-center">
                      <img
                        src={person.picture.large}
                        alt="User"
                        className="img-fluid rounded-circle mb-3"
                        style={{ maxWidth: '150px' }}
                      />
                      <br />
                      <Button variant="primary">DETAIL</Button>
                    </Col>
                    <Col md={9}>
                      <ListGroup variant="flush">
                        <ListGroup.Item><strong>User Name:</strong> {person.login.username}</ListGroup.Item>
                        <ListGroup.Item><strong>Gender:</strong> {person.gender.toUpperCase()}</ListGroup.Item>
                        <ListGroup.Item><strong>Time Zone Description:</strong> {person.location.timezone.description}</ListGroup.Item>
                        <ListGroup.Item><strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}</ListGroup.Item>
                        <ListGroup.Item><strong>Email:</strong> {person.email}</ListGroup.Item>
                        <ListGroup.Item><strong>Birth Date and Age:</strong> {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age})</ListGroup.Item>
                        <ListGroup.Item><strong>Register Date:</strong> {new Date(person.registered.date).toLocaleDateString()}</ListGroup.Item>
                        <ListGroup.Item><strong>Phone:</strong> {person.phone}</ListGroup.Item>
                        <ListGroup.Item><strong>Cell:</strong> {person.cell}</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default PersonList;