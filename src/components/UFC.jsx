import React, { Component } from 'react';
import withData from '../backend/withData';
import { GetAllUFC } from '../backend/queries';
import logo from '../images/Loader.gif';

class UFC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  } // end of constructor

  componentWillMount() {
    this.getUFCAsPromise();
  }

  getUFCAsPromise = () => {
    this.readData(GetAllUFC, { user: 'bhaskarv20@gmail.com' }).then(result => {
      //   console.log('GetAllUFC :', result);
      this.setState({ gdata: result.data.getAllUFC }, () => {
        this.forceUpdate();
      });
    });
  };

  render() {
    if (this.state.gdata === undefined) {
      return <div className="pt-7"> Loading...</div>;
    } else {
      return (
        <div>
          <main role="main" className="container pt-7">
            <div className="row">
              <div className="col-md-12">
                <div className="card" style={{ fontSize: '1.6rem' }}>
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-12">
                        <img src={logo} width="2.1%" alt="" />
                        <code>
                          {' '}
                          User{' '}
                          <span style={{ color: 'green' }}>
                            <i>{'bhaskarv20@gmail.com'}</i>{' '}
                          </span>{' '}
                          Form Controls......
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <code>{JSON.stringify(this.state.gdata)}</code>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}
// make this component wrap with data
export default withData(UFC);
