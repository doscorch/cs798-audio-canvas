import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import './App.css';
import { logout } from './services/usersService';
import { withRouter } from 'react-router-dom';
import { app_logout } from './redux/actions/userActions';
import { connect } from 'react-redux';
import UserManager from './components/userManager'
import MyAccount from './components/myAccount';
import MyProjects from './components/myProjects';
import MainApp from './components/mainApp';
import HelpPage from './components/help'

class App extends React.Component {

  clickLogout = async (e) => {
    e.preventDefault();
    await logout();
    this.props.app_logout();
    this.props.history.push('/');
  }

  render() {
    const hasUser = Boolean(this.props.user._id);
    const isBasicUser = this.props.user.userRole === "basic";
    const isAdminUser = this.props.user.userRole === "admin";
    return (
      <div>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg" style={{ marginBottom: "10px", paddingTop: '0', paddingBottom: '0' }}>
          <Navbar.Brand as={Link} to="/"><img style={{ width: "60px", height: "50px" }} src="../content/images/logo.png" alt="Audio Canvas Logo"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/app"><i class="fas fa-rocket"></i> App</Nav.Link>
              {hasUser && isBasicUser ? <Nav.Link as={Link} to="/projects"><i class="fas fa-wave-square"></i> My Projects</Nav.Link> : ""}
              {hasUser && isAdminUser ? <Nav.Link as={Link} to="/user-manager" ><i class="fas fa-users"></i> Users</Nav.Link> : ""}
              <Nav.Link as={Link} to="/help"><i className="fas fa-question-circle"></i> Docs</Nav.Link>
            </Nav>
            <Nav>
              {hasUser ? <Nav.Link as={Link} to="/account"><i className="fas fa-user"></i> {this.props.user.email}</Nav.Link> : ""}
              {hasUser ? <Nav.Link as={Link} to="/" onClick={this.clickLogout}><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link> : ""}
              {!hasUser ? <Nav.Link as={Link} to="/login"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link> : ""}
              {!hasUser ? <Nav.Link as={Link} to="/register"><i className="fas fa-user"></i> Register</Nav.Link> : ""}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/app" component={MainApp} />
        <Route exact path="/projects" component={MyProjects} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={MyAccount} />
        <Route path="/user-manager" component={UserManager} />
        <Route path="/help" component={HelpPage} />
      </div>
    );
  }
}

function Home() {
  return (
    <div className="container" style={{ backgroundColor: "lightgrey" }}>
      <div class="row">
        <div style={{ margin: "auto", marginBottom: "20px" }}>
          {/* <img src="../content/images/logo.png" alt="audio canvas home image"></img> */}
        </div>
      </div>
      <div className="row">
        <div className="card card-body bg-light" style={{ height: "300px" }}>
          <span>
            Welcome to the Audio Canvas.
          </span>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => { return { user: state.user } };
const mapDispatch = { app_logout };
export default connect(mapState, mapDispatch)(withRouter(App));
