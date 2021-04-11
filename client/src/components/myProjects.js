import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { createProject, deleteProject, getProjectsByUserId, patchProject } from '../services/projectsService';

class MyProjects extends React.Component {
    state = {
        projects: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        return getProjectsByUserId(this.props.user._id)
            .then(projects => {
                this.setState({ projects: projects })
            })
    }
    render() {
        const tableRef = React.createRef();
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <Row>
                                <Col>
                                    <MaterialTable
                                        tableRef={tableRef}
                                        options={{
                                            sorting: true,
                                            search: true,
                                            paging: false,
                                            editable: true,
                                        }}
                                        title="My Projects"
                                        columns={[
                                            { title: 'Name', field: 'name', validate: u => u.name == "" ? { isValid: false, helperText: "required" } : { isValid: true } },
                                            { title: 'Date Last Modified', field: 'dateModified', type: 'date', editable: false }
                                        ]}
                                        data={this.state.projects}
                                        actions={[
                                            {
                                                icon: () => (<i className="fas fa-rocket"></i>),
                                                tooltip: 'Launch',
                                                onClick: (event, rowData) => {
                                                    this.props.history.push(`/app/${rowData._id}`);
                                                }
                                            },
                                            {
                                                icon: 'content_copy',
                                                tooltip: 'Duplicate',
                                                onClick: (event, rowData) => {
                                                    createProject(this.props.user._id, rowData).then(_ => this.getData());
                                                }
                                            },
                                            {
                                                icon: 'ios_share',
                                                tooltip: 'Share',
                                                onClick: (event, rowData) => {

                                                }
                                            }
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1
                                        }}
                                        editable={{
                                            onRowUpdate: (newData, oldData) => {
                                                return patchProject(newData).then(_ => this.getData());
                                            },
                                            onRowAdd: newData => {
                                                return createProject(this.props.user._id, newData).then(_ => this.getData());
                                            },
                                            onRowDelete: oldData => {
                                                return deleteProject(oldData._id).then(_ => this.getData());
                                            }
                                        }}
                                    />
                                </Col>

                            </Row>
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