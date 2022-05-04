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
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.props.modalTitle}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div> */}
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        {this.props.modalInputName}
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        defaultValue={this.props.defaultValue || ""}
                                        onChange={this.onChange}
                                        value={this.state.name}
                                    />
                                </div>
                            </form>
                            <div className="float-right">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary mr-2"
                                    data-dismiss="modal"
                                    id={`${this.props.modalID}-close-button`}
                                >
                                    Close
                                </button>
                                <button onClick={this.onClickFunction.bind(this)} type="button" className="btn btn-sm btn-primary">
                                    Submit
                                </button>

                            </div>
                        </div>
                        {/* <div className="modal-footer">
                        </div> */}
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


