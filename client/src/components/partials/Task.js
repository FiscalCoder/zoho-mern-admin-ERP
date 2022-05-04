import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Subtask from "./Subtask";
import SingleInputModal from "./SingleInputModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { getReadableDate, capitalizeFirstLetter } from "../../utils/helperFunctions";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
class Task extends Component {

    addSubTaskToState = (subTask) => {
        this.setState({
            currentSubTask: subTask
        })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    editTask(changedNameValue) {

        const newSubTask = {
            taskID: this.props.task._id,
            changedTaskName: changedNameValue
        }

        axios
            .post("/tasks/task-edit", newSubTask)
            .then(res => {
                this.props.getTaskData()
            })
            .catch(err => console.log(err))
    }

    deleteTask() {

        const newSubTask = {
            taskID: this.props.task._id,
        }

        axios
            .post("/tasks/task-delete", newSubTask)
            .then(res => {
                this.props.getTaskData()
            })
            .catch(err => console.log(err))
    }



    addNewSubTask(subTaskName) {

        const newSubTask = {
            taskID: this.props.task._id,
            subTaskName
        }

        axios
            .post("/tasks/subtask-add", newSubTask)
            .then(res => {
                this.props.getTaskData()
            })
            .catch(err => console.log(err))
    }







    render() {
        //const { user } = this.props.auth;
        const taskID = this.props.task._id
        return (
            <div>

                <SingleInputModal
                    modalTitle="Add Sub Task"
                    modalInputName="Add Subtask:"
                    modalID={"subTaskModal" + taskID}
                    submitFunction={this.addNewSubTask.bind(this)}
                />

                <SingleInputModal
                    modalTitle="Edit Task"
                    modalInputName="Edit Task:"
                    modalID={"editTaskModal" + taskID}
                    defaultValue={this.props.task.name}
                    submitFunction={this.editTask.bind(this)}
                />

                <DeleteConfirmationModal
                    modalTitle="Delete Task"
                    modalInputName="Delete Task:"
                    modalID={"DeleteConfirmationModal" + taskID}
                    submitFunction={this.deleteTask.bind(this)}
                />






                <div className="card rounded-3">
                    <div className="card-body p-4">
                        <p className="mb-2">
                            <span className="h2 me-2">{this.props.task.name}</span>{" "}
                            {this.props.isAdmin
                                ? <span className="float-right mt-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button className="btn btn-sm btn-secondary" data-toggle="modal" data-target={`#editTaskModal${taskID}`}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        <button className="btn btn-sm btn-danger" data-toggle="modal" data-target={`#DeleteConfirmationModal${taskID}`}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>

                                </span>
                                : <span class="dropdown float-right">
                                    <button class="btn btn-sm btn-info dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Unactioned
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button class="dropdown-item" type="button">Inprogress</button>
                                        <button class="dropdown-item" type="button">Closed</button>
                                        <button class="dropdown-item" type="button">Delete</button>
                                    </div>
                                </span>
                            }
                        </p>
                        <p className="text-muted pb-2">{getReadableDate(this.props.task.date)} • {capitalizeFirstLetter(this.props.task.status)}
                            <button className="btn btn-sm btn-dark float-right" data-toggle="modal" data-target={`#subTaskModal${taskID}`}><FontAwesomeIcon icon={faPlus} /> Subtask</button>
                        </p>
                        {/* <ul className="list-group rounded-0"> */}

                        {this.props.task && this.props.task.subtasks.length > 0 &&
                            <div class="card" style={{ "width": "100%" }}>
                                <ul class="list-group list-group-flush">
                                    {this.props.task.subtasks.map(subtask => (
                                        <Subtask subtask={subtask} getTaskData={this.props.getTaskData} />
                                    ))}
                                </ul>
                            </div>

                        }

                        {/* </ul> */}
                        {this.props.task.taskComment && <div className="divider d-flex align-items-center my-4">
                            <p className="text-center mx-3 mb-0" style={{ color: "#a2aab7" }}>
                                {this.props.task.taskComment}
                            </p>
                        </div>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

Task.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getTaskData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAdmin: state.auth.user.isAdmin
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Task);


