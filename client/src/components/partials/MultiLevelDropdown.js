import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class MultiLevelDropdown extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="dropdown dropleft">
                        <button
                            className="btn btn-sm btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenu1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Actions
                        </button>
                        <ul
                            className="dropdown-menu multi-level"
                            role="menu"
                            aria-labelledby="dropdownMenu"
                        >

                            <li className="dropdown-submenu">
                                <a className="dropdown-item" tabIndex={-1} href="#">
                                    Comment Actions
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <a tabIndex={-1} href="#">
                                            Edit
                                        </a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#">Delete</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown-divider" />
                            <li className="dropdown-submenu">
                                <a className="dropdown-item" tabIndex={-1} href="#">
                                    State Actions
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <a tabIndex={-1} href="#">
                                            Unactioned
                                        </a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a tabIndex={-1} href="#">
                                            Inprogress
                                        </a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a tabIndex={-1} href="#">
                                            Closed
                                        </a>
                                    </li>

                                </ul>
                            </li>




                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

MultiLevelDropdown.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAdmin: state.auth.user.isAdmin
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(MultiLevelDropdown);



