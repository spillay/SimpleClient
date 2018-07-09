import React from 'react'
import ReactModal from 'react-modal'

export const UserDeleteModal = (props) => {
  // console.log(`I am in UserDeleteModal`)
  return (
    <div>
      <ReactModal
        isOpen={!!props.selectedUser}  // Boolean describing if the modal should be shown or not.
        contentLabel='Selected UserId' // String indicating how the content container should be announced to screenreaders
        role="dialog"   // String indicating the role of the modal, allowing the 'dialog' role to be applied if desired. 
        // style={props.customStyles}
        // onAfterOpen={props.afterOpenModal}
        // onRequestClose={props.closeModal}
        ariaHideApp={false}
		className="Modal pt-5"
        // overlayClassName="Overlay"
      >

        <div className="card">
          <div className="card-header">

            <div className="row">
              <div className="col">
                <h6><i className="fa fa fa-forward" aria-hidden="true"></i>
                  Delete <span className="badge badge-success">{`UserId = ${props.selectedUser}`}</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Are you sure you want to delete User?</h5>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-outline-danger btn-md btn-block custom-button" onClick={props.afterOpenModal}>Delete </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-outline-secondary btn-md btn-block custom-button" onClick={props.closeModal}>Cancel </button>
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
