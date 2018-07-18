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
        <li className="nav-item list-inline-item">
          <Link to="/formControls" className="btn btn-info" replace>
            Configuration...
          </Link>
        </li>

        <li className="nav-item list-inline-item">
          <Link to="/selectFormControls" className="btn btn-info" replace>
            SFC
          </Link>
        </li>

        <li className="nav-item list-inline-item">
          <Link to="/search" className="btn btn-primary" replace>
            Search User
          </Link>
        </li>
        <li className="nav-item list-inline-item">
          <Link to="/dashboard" className="nav-link" replace>
            {' '}
            Dashboard
          </Link>
        </li>
        <li className="nav-item list-inline-item">
          <Link to="/signup" className="nav-link" replace>
            {' '}
            Signup
          </Link>
        </li>
        <li className="nav-item list-inline-item">
          <Link to="/login" className="nav-link" replace>
            {' '}
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
          <ul className="navbar-nav list-inline ml-auto">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

// export default withRouter(graphql(Logout)(
//   graphql(CurrentUser)(Header)))
