import React, { Component } from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { loginForm } from '../forms/form.json'
import logo from '../images/SouthAfricanflag.png'
import withData from '../backend/withData'
import { authUser } from '../backend/mutations';

 class Login extends Component {
    constructor(props) {
        super(props);
        // console.log("in LoginView constructor");
        this.state = {
			submitted: false,
            errors: [],
            valueData: {}
        }
    } // end of constructor

    reload = () => {
        this.forceUpdate();
    }

    checkStage = () => {
        // console.log("checkStage")
        if (this.dynForm === undefined) {
            return true;
        }
        // console.log("before switch :", this.dynForm.state.stage)
        switch (this.dynForm.state.stage) {
            case "Initial":
            case "Incomplete":
                return true;
            case "Complete":
                return false;
            default:
                return true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.dynForm.checkValidations() === true) {
            var data = this.dynForm.getData();
            this.setState({ submitted: true })
            // console.log("now you can submit...", data);
			this.authUserAsPromise(authUser, data);  // login mutation 
        }
	 }
	 authUserAsPromise = (authUser, data) => {
		this.mutateData(authUser,{email:data.username,password:data.password})  // return a promise
		.then(result=>{
			console.log("authUser :",result.data.login)
   			this.props.history.push('/dashboard') // programatically routing
			 }).catch((res) => {
				const errors = res.graphQLErrors.map(error => error.message)
				this.setState({errors})
			  })
		 
	 }

    render() {
        return (
            <div>
                <main role="main" className="container pt-7">
					<div className="row">
                        <div className="col-md-6 offset-md-4">
                            <div className="card" style={{ width: '30rem' }}>
                                <img className="card-img-top custom-image mx-auto img-thumbnail" src={logo} alt="logo" />
                                <div className="card-body">
                                    <span><i className="fa fa fa-forward" aria-hidden="true"></i>  Login </span>
                                    <form onSubmit={this.handleSubmit}>
										<ErrorBoundary>
											
										<div className='error-messages'>
										{this.state.errors.map(error => <div key={error}>
																		  {error}
																		</div>)}
											</div>
											
                                            <DynamicForm           // configure the form  controls
                                                model={loginForm}
                                                valueData={this.state.valueData}
                                                groups={1} // groups will be 1 to 4 only 1=col-md-12,  2= col-md-6 , 3=col-md-4  4= col-md-3
                                                columns='col-md-12'
                                                ref={(node) => this.dynForm = node}
                                                reload={this.reload} >
                                            </DynamicForm>
                                        </ErrorBoundary>
                                        <hr />
                                        <div className='row'>
                                            <div className='col-md-12 '>
                                                <button className="btn btn-primary btn-block" disabled={this.checkStage()} >
                                                    {(this.state.submitted) ?
                                                        <div><i className="fa fa-spinner fa-spin"></i> {'Processing...'}</div> :
                                                        <i className="fa fa fa-sign-in" aria-hidden="true"></i>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {this.props.children}


                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

        )
    }

}
// make this component wrap with data
export default withData(Login);
