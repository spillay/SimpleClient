import React from 'react';
import { Link } from 'react-router-dom';
// import CurrentUser from '../queries/CurrentUser'
// import Logout from '../mutations/Logout'
import logo from '../images/Loader.gif';
import { withRouter } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    // this.props.mutate({
    //   refetchQueries: [{query: CurrentUser}] // Automatic Component Rerenders
    // })
  }

  renderButtons() {
    // const {loading, user} = this.props.data
    // if (loading) {
    //   return <div />
    // }
    // if (user) {
    // 	return (
    // 		<div>
    // 		<li className='nav-item list-inline-item'>
    // 		<Link to='/search' className='btn btn-primary' replace>
    // 		  Search Property
    // 		</Link>
    // 		</li>
    // 		<li className='nav-item list-inline-item'>
    //             <button onClick={this.onLogoutClick} className='btn btn-danger'>
    //               Logout (
    //               {user.email} )
    //             </button>
    // 			</li>

    // 			</div>
    // 	)
    // } else {
    return (
      <div>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Form Manager
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/addform">
              {' '}
              Add Form Name...
            </Link>
            <Link className="dropdown-item" to="/fct">
              {' '}
              Add FormControl Type...
            </Link>
            <Link className="dropdown-item" to="/formControls">
              {' '}
              Master FormControls Configuration...
            </Link>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </li>

        <li className="nav-item">
          <Link to="/ufc" className="nav-link" replace>
            GetAllUFC...
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/userformControls" className="nav-link" replace>
            User FormControls...
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/selectFormControls" className="nav-link" replace>
            SFC
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/search" className="btn btn-primary" replace>
            Search User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link" replace>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" replace>
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" replace>
            Login
          </Link>
        </li>
      </div>
    );
    // }
  }
  render() {
    // console.log('from Header:', this.props) //  response
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="landingNav"
      >
        <Link to="/" className="navbar-brand" replace>
          <img
            src={logo}
            width="30"
            height="30"
            alt=""
            className="d-inline-block align-top"
          />{' '}
          Intelligent Monitor
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa fa-bars" aria-hidden="true" /> Administrator
              </a>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item disabled" href="#">
                  Form Manager
                </a>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/addform">
                  <i className="fa fa fa-plus" /> Add Form Name...
                </Link>
                <Link className="dropdown-item" to="/fct">
                  {' '}
                  <i className="fa fa fa-plus" /> Add FormControl Type...
                </Link>
                <Link className="dropdown-item" to="/formControls">
                  {' '}
                  <i className="fa fa fa-plus" /> Master FormControls
                  Configuration...
                </Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item disabled" href="#">
                  Workflow Configuration
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa fa-snowflake-o" aria-hidden="true" /> User
                FormControl Configuration
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/userformControls">
                  {' '}
                  <i
                    className="fa fa fa-plus-square-o"
                    aria-hidden="true"
                  />{' '}
                  User FormControls...
                </Link>

                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/ufc">
                  <i className="fa fa fa-user" /> GetAllUFC...
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/selectFormControls" className="nav-link" replace>
                SFC
              </Link>
            </li>

            <li className="nav-item ">
              <Link to="/search" className="nav-link" replace>
                <i className="fa fa fa-search" aria-hidden="true" /> Search User
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" replace>
                <i className="fa fa fa-dashboard" aria-hidden="true" />{' '}
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" replace>
                <i className="fa fa fa-sign-in" aria-hidden="true" /> Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" replace>
                <i className="fa fa fa-lock" aria-hidden="true" /> Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

// export default withRouter(graphql(Logout)(
//   graphql(CurrentUser)(Header)))
// <ul className="navbar-nav list-inline ml-auto">
