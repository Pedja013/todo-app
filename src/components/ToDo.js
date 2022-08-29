import React from "react";
import {Button, Card} from "react-bootstrap";
import deleteIcon from "../assets/img/delete.svg"
import editIcon from "../assets/img/edit.svg";

const ToDo = (props) => {
    const canEdit = true;
    return (
        <Card className="post py-3 px-4 mb-4" key={props.todo.id}>
            <div className="post__header d-block d-lg-flex align-items-center justify-content-between">
                <div className="post__header-info d-block d-sm-flex mb-4 mb-lg-0">
                    <div className="post__header-title d-inline-block">
                        <h5 className="mb-0">
                            <strong>{props.todo.naziv}</strong>
                        </h5>
                        <h6 className="mt-3">
                            {props.todo.rokPredaje}
                        </h6>
                        <div className="mt-3">
                            Prioritet: {props.todo.prioritet}
                        </div>
                    </div>
                </div>
                {canEdit && <div className="post__header-controls">
                    <Button className="me-3 p-0">
                        <img src={editIcon} className="me-3 mb-4 mb-sm-0" alt="edit"/>
                    </Button>
                    <Button className="p-0">
                        <img src={deleteIcon} className="me-3 mb-4 mb-sm-0" alt="delete" />
                    </Button>
                </div>}
            </div>
            <div className="post__content mt-3">
                <div className="">
                    {props.todo.opis}
                </div>
            </div>
        </Card>
    );
};

export default ToDo;