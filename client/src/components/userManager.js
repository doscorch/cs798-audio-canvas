import * as React from 'react';
import MaterialTable from 'material-table';
import { Select, MenuItem } from '@material-ui/core'
import { getUsers, patchUser } from '../services/usersService';
import { connect } from 'react-redux';

class UserManager extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (this.props.user && this.props.user.userRole === "admin") {
            return getUsers()
                .then(users => {
                    this.setState({ users: users })
                })
        }
        else {
            this.setState({ users: [] })
        }
    }

    render() {
        const tableRef = React.createRef();
        return (
            <MaterialTable
                tableRef={tableRef}
                options={{
                    sorting: true,
                    search: true,
                    paging: false,
                }}
                title="Users"
                columns={[
                    // { title: 'Id', field: '_id' },
                    { title: 'Email', field: 'email', editable: false },
                    { title: 'First Name', field: 'firstName', validate: u => u.firstName == "" ? { isValid: false, helperText: "required" } : { isValid: true } },
                    { title: 'Last Name', field: 'lastName', validate: u => u.lastName == "" ? { isValid: false, helperText: "required" } : { isValid: true } },
                    {
                        title: 'User Role',
                        field: 'userRole',
                        editComponent: props => (
                            <Select
                                id="userrole"
                                value={props.value || false}
                                onChange={e => props.onChange(e.target.value)}
                            >
                                <MenuItem value={"admin"}>admin</MenuItem>
                                <MenuItem value={"basic"}>basic</MenuItem>
                            </Select>),
                    },
                    {
                        title: 'Is Active',
                        field: 'isActive',
                        render: row => (<span>{String(typeof row.isActive === "undefined" ? true : row.isActive)}</span>),
                        editComponent: props => (
                            <Select
                                id="isActive"
                                value={typeof props.value === "undefined" ? true : props.value}
                                onChange={e => props.onChange(e.target.value)}
                            >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                            </Select>),
                    },
                ]}
                data={this.state.users}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        return patchUser(newData).then(_ => this.getData())
                    },
                }}
            />
        )
    }

}

const mapState = (state) => { return { user: state.user } };
const mapDispatch = {};

export default connect(mapState, mapDispatch)(UserManager);