import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { Link } from "react-router-dom";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons/faUserAlt";
import Task from "../partials/Task";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import SingleInputModal from "../partials/SingleInputModal";

class Tasks extends Component {


    constructor() {
        super()
        this.state = {
            records: []
        };
        this.getTaskData = this.getTaskData.bind(this);

    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        this.getTaskData()
    };

    componentWillReceiveProps(nextProps) {
        this.getTaskData()
    }



    getTaskData() {
        const reqBody = {
            empID: this.props.match.params.id
        }

        axios
            .post("/tasks/task-get", reqBody)
            .then(res => {
                this.setState({ records: res.data })
            })
            .catch(err => console.log("task err", err))
    }

    addNewTask(taskName) {

        const newTask = {
            empID: this.props.match.params.id,
            taskName
        }

        axios
            .post("/tasks/task-add", newTask)
            .then(res => {
                this.getTaskData()
            })
            .catch(err => console.log(err))
    }





    render() {
        console.log("STATE", this.props)
        // const location = useLocation()
        // const { taskID } = location.state
        // console.log("TASK IDD", taskID)

        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <div id="page-content-wrapper">
                        <SingleInputModal
                            modalTitle="Add Task"
                            modalInputName="Task:"
                            modalID="taskModal"
                            submitFunction={this.addNewTask.bind(this)}

                        />

                        {this.props.isAdmin &&
                            <div className="container mt-4">
                                <button className="btn btn-sm btn-secondary float-right mr-4" data-toggle="modal" data-target="#taskModal">Add Task</button>
                            </div>
                        }

                        <section className="">
                            <div className="container py-4 h-100">
                                <div className="row d-flex h-100">
                                    {this.state.records.map(task => {
                                        return (
                                            <div className="col col-lg-8 col-xl-6 mt-4">
                                                <Task task={task} getTaskData={this.getTaskData} />
                                            </div>

                                        )
                                    })}

                                </div>
                            </div>
                        </section>

                    </div>
                </div>

            </div>
        );
    }
}

Tasks.propTypes = {
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
)(Tasks);


