import React from 'react'
import logo from '../images/404-error-page-not-found.jpg'


class NotFoundPage extends React.Component{

	render() {
		return (
			<div>
			<main role="main" className="container pt-7">
				<div className="row">
					<div className="col-md-8 offset-md-3">
					<img className="custom-image"  src={logo} alt="South Africa"/>   
					</div>
				</div>
			</main>
		  </div>
	)
}

}

export default NotFoundPage
