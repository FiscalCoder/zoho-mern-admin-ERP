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

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    taskCrudApiCall(editValues) {
        axios
            .post("/tasks/task-edit", editValues)
            .then(res => {
                console.log("RESSSSEDIT", res)

                this.props.getTaskData()
            })
            .catch(err => console.log(err))

    }

    changeTaskStatus(statusValue) {
        const editTaskStatus = {
            taskID: this.props.task._id,
            taskStatus: statusValue,
            keyName: "taskStatus"
        }
        this.taskCrudApiCall(editTaskStatus)
    }


    editTaskName(changedNameValue) {

        const newSubTask = {
            taskID: this.props.task._id,
            changedTaskName: changedNameValue,
            keyName: "changedTaskName"
        }

        this.taskCrudApiCall(newSubTask)
    }

    addEditTaskComment(commentValue) {

        const newSubTask = {
            taskID: this.props.task._id,
            taskComment: commentValue,
            keyName: "taskComment"
        }

        this.taskCrudApiCall(newSubTask)
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

    deleteComment() {

        const newSubTask = {
            taskID: this.props.task._id,
        }

        axios
            .post("/tasks/task-comment-delete", newSubTask)
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
                    submitFunction={this.editTaskName.bind(this)}
                />

                <SingleInputModal
                    modalTitle="Add Comment"
                    modalInputName="Add Comment:"
                    modalID={"addCommentModal" + taskID}
                    submitFunction={this.addEditTaskComment.bind(this)}
                />

                <SingleInputModal
                    modalTitle="Edit Comment"
                    modalInputName="Edit Comment:"
                    modalID={"editTaskCommentModal" + taskID}
                    defaultValue={this.props.task.taskComment}
                    submitFunction={this.addEditTaskComment.bind(this)}
                />


                <DeleteConfirmationModal
                    modalTitle="Delete Task"
                    modalInputName="Delete Task:"
                    modalID={"DeleteConfirmationModal" + taskID}
                    submitFunction={this.deleteTask.bind(this)}
                />

                <DeleteConfirmationModal
                    modalTitle="Delete Comment"
                    modalInputName="Delete Comment:"
                    modalID={"DeleteCommentConfirmationModal" + taskID}
                    submitFunction={this.deleteComment.bind(this)}
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
                                : <span class="dropdown float-right mt-2">
                                    <button class="btn btn-sm btn-info dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {capitalizeFirstLetter(this.props.task.status)}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {!(this.props.task.status === "UNACTIONED") && <button class="dropdown-item" type="button" onClick={() => this.changeTaskStatus("UNACTIONED")}>Unactioned</button>}
                                        {!(this.props.task.status === "INPROGRESS") && <button class="dropdown-item" type="button" onClick={() => this.changeTaskStatus("INPROGRESS")}>Inprogress</button>}
                                        {!(this.props.task.status === "CLOSED") && <button class="dropdown-item" onClick={() => this.changeTaskStatus("CLOSED")} type="button">Closed</button>}


                                    </div>
                                </span>
                            }
                        </p>
                        <p className="text-muted">{getReadableDate(this.props.task.date)} • {capitalizeFirstLetter(this.props.task.status)}
                            {this.props.isAdmin && <button className="btn btn-sm btn-dark float-right" data-toggle="modal" data-target={`#subTaskModal${taskID}`}><FontAwesomeIcon icon={faPlus} /> Subtask</button>}
                        </p>
                        {/* <ul className="list-group rounded-0"> */}

                        {this.props.task && this.props.task.subtasks.length > 0 &&
                            <div class="card mt-4" style={{ "width": "100%" }}>
                                <ul class="list-group list-group-flush">
                                    {this.props.task.subtasks.map(subtask => (
                                        <Subtask subtask={subtask} getTaskData={this.props.getTaskData} />
                                    ))}
                                </ul>
                            </div>

                        }

                        {/* </ul> */}
                        {this.props.task.taskComment
                            ? <div className="divider d-flex align-items-center mt-4 mb-2">
                                <p className="m-0 w-100" style={{ color: "#a2aab7" }}>
                                    {this.props.task.taskComment}
                                    {!this.props.isAdmin && <span className="float-right">
                                        <div class="btn-group" role="group">
                                            <button className="btn btn-sm btn-secondary" data-toggle="modal" data-target={"#editTaskCommentModal" + taskID}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                            <button className="btn btn-sm btn-danger" data-toggle="modal" data-target={"#DeleteCommentConfirmationModal" + taskID}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>

                                    </span>
                                    }

                                </p>
                            </div>
                            : <span>
                                {!this.props.isAdmin &&
                                    <div className="float-right mt-3">
                                        <button className="btn btn-sm btn-dark" data-toggle="modal" data-target={"#addCommentModal" + taskID}><FontAwesomeIcon icon={faPlus} /> Comment</button>
                                    </div>}
                            </span>

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


