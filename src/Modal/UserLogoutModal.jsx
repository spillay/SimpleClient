import React from 'react'
import ReactModal from 'react-modal'

export const UserLogoutModal = (props) => {
  // console.log(`I am in UserDeleteModal`)
  return (
    <div>
      <ReactModal
        isOpen={!!props.logoutUser}  // Boolean describing if the modal should be shown or not.
        contentLabel='Logout UserId' // String indicating how the content container should be announced to screenreaders
        role="dialog"   // String indicating the role of the modal, allowing the 'dialog' role to be applied if desired.        
        className="Modal"
        overlayClassName="Overlay"
      >

        <div className="card">
          <div className="card-header">

            <div className="row">
              <div className="col">
                <h6><i className="fa fa fa-forward" aria-hidden="true"></i>
                  Logout <span className="badge badge-success">{`UserId = ${props.logoutUser}`}</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Are you sure you want to Logout?</h5>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-outline-danger btn-md btn-block custom-button" onClick={props.afterOpenModal}>Logout </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-outline-secondary  btn-md btn-block custom-button" onClick={props.closeModal}>Cancel </button>
              </div>
            </div>
            <hr />
          </div>
        </div>


      </ReactModal>
    </div>
  )


}

ReactModal.setAppElement(document.getElementById('app'));
