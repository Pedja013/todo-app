import React from "react";
import {Button, Card} from "react-bootstrap";
import deleteIcon from "../assets/img/delete.svg"
import editIcon from "../assets/img/edit.svg";
import completeIcon from "../assets/img/tick-icon.svg";

const ToDo = (props) => {
    const canEdit = !props.todo.isCompleted;
    const cardClasses = !canEdit ? 'todo py-3 px-4 mb-4 bg-success text-white' : 'todo py-3 px-4 mb-4';

    return (
        <Card className={cardClasses} key={props.todo.id}>
            <div className="todo__header d-flex align-items-center justify-content-between">
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
                        <img src={editIcon} className="me-3 mb-4 mb-sm-0" alt="edit" title="Edit" onClick={() => props.handleShowEditModal(props.todo.id)}/>
                    </Button>
                    <Button className="p-0">
                        <img src={deleteIcon} className="me-3 mb-4 mb-sm-0" alt="delete" title="Delete" onClick={() => props.handleDelete(props.todo.id)}/>
                    </Button>
                    <Button>
                        <img src={completeIcon} className="me-3 mb-4 mb-sm-0" alt="complete" title="Complete" onClick={() => props.handleComplete(props.todo.id)}/>
                    </Button>
                </div>}
                {!canEdit && <div className="todo__completed-text mb-3">Zadatak zavrsen!</div>}
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