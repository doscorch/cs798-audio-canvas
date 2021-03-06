import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { getUser, loginUser } from '../services/usersService';
import { connect } from 'react-redux';
import { app_login } from '../redux/actions/userActions'

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        error: "",
    }

    login = async (e) => {
        e.preventDefault();
        // get user from db
        let user = await getUser(this.state.email);
        if (!user) {
            this.setState({ error: "invalid login" });
        }
        else if (!(user.isActive || typeof user.isActive === "undefined")) {
            // inactive users cant login!
            this.setState({ error: "This account is no longer active. Contact staff." });
        }
        else {
            // log the user in and go home
            let res = await loginUser(this.state.email, this.state.password);
            if (res.error) {
                this.setState({ error: res.error });
            }
            else {
                this.props.app_login(res.user);
                this.props.history.push('/');
            }
        }
    }

    changeForm = (e) => {
        let propName = e.target.name;
        let propValue = e.target.value;
        let state = { ...this.state };
        state[propName] = propValue;
        this.setState(state);
    }

    render() {
        const classes = {
            paper: {
                marginTop: "10px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            form: {
                width: '100%',
                marginTop: "10px",
            },
            submit: {
                margin: "10px",
            },
        };
        let alert = this.state.error ? <Alert severity="error">{this.state.error}</Alert> : "";

        return (
            <Container component="main" maxWidth="xs">
                <div style={classes.paper}>
                    <Avatar />
                    <Typography component="h1" variant="h5">Login</Typography>
                    <form style={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.changeForm}
                            value={this.state.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.changeForm}
                            value={this.state.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={classes.submit}
                            onClick={this.login}>
                            Log In
                        </Button>
                        <Grid container justify="center">
                            <Link href="/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </form>
                    {alert}
                </div>
            </Container>
        );
    }
}

const mapState = (state) => { return { user: state.user } };
const mapDispatch = { app_login };

export default connect(mapState, mapDispatch)(Login);