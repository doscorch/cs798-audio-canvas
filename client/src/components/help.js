import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

class HelpPage extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <Row>
                                <Col><h3>Documentation</h3></Col>
                            </Row>
                            <hr />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HelpPage;