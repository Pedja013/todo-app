import React from "react";
import {Button, Card} from "react-bootstrap";
import deleteIcon from "../assets/img/delete.svg"
import editIcon from "../assets/img/edit.svg";
import completeIcon from "../assets/img/tick-icon.svg";

const ToDo = (props) => {
    const canEdit = !props.todo.isCompleted;
    return (
        <Card className="todo py-3 px-4 mb-4" key={props.todo.id}>
            <div className="todo__header d-block d-lg-flex align-items-center justify-content-between">
                <div className="todo__header-info d-block d-sm-flex mb-4 mb-lg-0">
                    <div className="todo__header-title d-inline-block">
                        <h5 className="mb-0">
                            <strong>{props.todo.naziv}</strong>
                        </h5>
                        <h6 className="mt-3">
                            Rok: {props.todo.rokPredaje}
                        </h6>
                        <div className="mt-3">
                            Prioritet: {props.todo.prioritet}
                        </div>
                    </div>
                </div>
                {canEdit && <div className="todo__header-controls">
                    <Button className="me-3 p-0">
                        <img src={editIcon} className="me-3 mb-4 mb-sm-0" alt="edit" onClick={() => props.handleShowEditModal(props.todo.id)}/>
                    </Button>
                    <Button className="me-3 p-0">
                        <img src={deleteIcon} className="me-3 mb-4 mb-sm-0" alt="delete" onClick={() => props.handleDelete(props.todo.id)}/>
                    </Button>
                    <Button>
                        <img src={completeIcon} className="me-3 mb-4 mb-sm-0" alt="complete" onClick={() => props.handleComplete(props.todo.id)}/>
                    </Button>
                </div>}
            </div>
            <div className="todo__content mt-3">
                <div className="">
                    {props.todo.opis}
                </div>
            </div>
        </Card>
    );
};

export default ToDo;