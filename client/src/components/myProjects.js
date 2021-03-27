import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';

class MyProjects extends React.Component {
    state = {

    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <Row>
                                <Col><h3>My Projects</h3></Col>
                            </Row>
                            <hr />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapState = (state) => { return { user: state.user } };
const mapDispatch = {};

export default connect(mapState, mapDispatch)(MyProjects);