import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SingleInputModal from "./SingleInputModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import MultiLevelDropdown from "./MultiLevelDropdown";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { capitalizeFirstLetter } from "../../utils/helperFunctions";

import axios from "axios";

class SubTask extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    subTaskCrudApiCall(editValues) {
        axios
            .post("/tasks/subtask-edit", editValues)
            .then(res => {
                console.log("RESSSSEDIT", res)

                this.props.getTaskData()
            })
            .catch(err => console.log(err))

    }


    editTask(changedNameValue) {

        const editSubTask = {
            subTaskID: this.props.subtask._id,
            changedTaskName: changedNameValue,
            keyName: "changedTaskName"

        }

        this.subTaskCrudApiCall(editSubTask)
    }

    addEditComment(commentValue) {
        const newSubComment = {
            subTaskID: this.props.subtask._id,
            subTaskComment: commentValue,
            keyName: "subTaskComment"
        }

        this.subTaskCrudApiCall(newSubComment)
    }

    changeSubTaskStatus(statusValue) {
        const editSubTaskStatus = {
            subTaskID: this.props.subtask._id,
            subTaskStatus: statusValue,
            keyName: "subTaskStatus"
        }
        this.subTaskCrudApiCall(editSubTaskStatus)
    }

    deleteTask() {

        const newSubTask = {
            subTaskID: this.props.subtask._id,
        }

        axios
            .post("/tasks/subtask-delete", newSubTask)
            .then(res => {
                this.props.getTaskData()
            })
            .catch(err => console.log(err))
    }

    deleteComment() {
        const newSubTask = {
            subTaskID: this.props.subtask._id,
        }

        axios
            .post("/tasks/subtask-comment-delete", newSubTask)
            .then(res => {
                this.props.getTaskData()
            })
            .catch(err => console.log(err))
    }




    render() {
        const subTaskId = this.props.subtask._id

        return (
            <li class="list-group-item">


                <SingleInputModal
                    modalTitle="Edit Sub Task"
                    modalInputName="Edit Sub Task:"
                    modalID={"editSubTaskModal" + subTaskId}
                    defaultValue={this.props.subtask.name}
                    submitFunction={this.editTask.bind(this)}
                />

                <SingleInputModal
                    modalTitle="Add Sub Comment"
                    modalInputName="Add Sub Task Comment:"
                    modalID={"addSubTaskCommentModal" + subTaskId}
                    submitFunction={this.addEditComment.bind(this)}
                />

                <SingleInputModal
                    modalTitle="Edit Sub Task Comment"
                    modalInputName="Edit Sub Task Commetn:"
                    modalID={"editSubTaskCommentModal" + subTaskId}
                    defaultValue={this.props.subtask.subTaskComment}
                    submitFunction={this.addEditComment.bind(this)}
                />



                <DeleteConfirmationModal
                    modalTitle="Delete Sub Task"
                    modalInputName="Delete Task:"
                    modalID={"DeleteSubConfirmationModal" + subTaskId}
                    submitFunction={this.deleteTask.bind(this)}
                />

                <DeleteConfirmationModal
                    modalTitle="Delete Sub Task Comment"
                    modalInputName="Delete Comment:"
                    modalID={"DeleteSubCommentConfirmationModal" + subTaskId}
                    submitFunction={this.deleteTask.bind(this)}
                />

                <div className="row w-100">
                    <div className="col-8">
                        {this.props.subtask.name}
                        <div className="text-muted"> • {capitalizeFirstLetter(this.props.subtask.status)}</div>
                        <div className="px-2" style={{ color: "#a2aab7" }}>{this.props.subtask.subTaskComment}</div>
                    </div>
                    <div className="col-4 p-0">
                        <div class="float-right" role="toolbar" aria-label="Toolbar with button groups">
                            {this.props.isAdmin ?
                                <span>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            data-toggle="modal"
                                            data-target={`#editSubTaskModal${subTaskId}`}
                                        > <FontAwesomeIcon icon={faPencilAlt} /> </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            data-toggle="modal"
                                            data-target={`#DeleteSubConfirmationModal${subTaskId}`}
                                        > <FontAwesomeIcon icon={faTrash} /> </button>
                                    </div>

                                </span>
                                : <div class="btn-group">

                                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                    </button>
                                    <div class="dropdown-menu">
                                        {this.props.subtask.subTaskComment
                                            ? <>
                                                <button
                                                    class="dropdown-item btn-sm "
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target={"#editSubTaskCommentModal" + subTaskId}
                                                >Edit Comment</button>
                                                <button
                                                    class="dropdown-item btn-sm "
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target={"#DeleteSubCommentConfirmationModal" + subTaskId}
                                                >Delete Comment</button>
                                            </>
                                            : <button
                                                class="dropdown-item btn-sm"
                                                type="button"
                                                data-toggle="modal"
                                                data-target={"#addSubTaskCommentModal" + subTaskId}
                                            >Add Comment</button>
                                        }

                                        <div class="dropdown-divider"></div>
                                        <button
                                            class={`dropdown-item btn-sm ${this.props.subtask.status === "UNACTIONED" ? "disabled" : ""}`}
                                            type="button"
                                            onClick={() => this.changeSubTaskStatus("UNACTIONED")}
                                        >Unactioned</button>
                                        <button
                                            class={`dropdown-item btn-sm ${this.props.subtask.status === "INPROGRESS" ? "disabled" : ""}`}
                                            type="button"
                                            onClick={() => this.changeSubTaskStatus("INPROGRESS")}
                                        >Inprogress</button>
                                        <button
                                            class={`dropdown-item btn-sm ${this.props.subtask.status === "CLOSED" ? "disabled" : ""}`}
                                            type="button"
                                            onClick={() => this.changeSubTaskStatus("CLOSED")}
                                        >Closed</button>

                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </li >

        )
    }

}

SubTask.propTypes = {
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
)(SubTask);


