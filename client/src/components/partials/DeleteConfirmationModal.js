import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class SingleInputModal extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    state = {}

    constructor() {
        super();
        this.state = {
            inputText: ""
        };
    }


    onChange = e => this.setState({ inputText: e.target.value })

    onClickFunction = () => {
        this.props.submitFunction(this.state.inputText)
        this.setState({ inputText: "" })
        const closeButtonID = `${this.props.modalID}-close-button`
        document.getElementById(closeButtonID).click()
    }



    render() {
        return (
            <div
                className="modal fade"
                id={this.props.modalID}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Are you sure you want to delete this record?
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                id={`${this.props.modalID}-close-button`}

                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Once it has been deleted, it cannot be recovered.</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button onClick={this.onClickFunction.bind(this)} type="button" className="btn btn-sm btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

SingleInputModal.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalInputName: PropTypes.string.isRequired,
    modalID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAdmin: state.auth.user.isAdmin
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(SingleInputModal);


