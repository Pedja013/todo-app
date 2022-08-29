import React from "react";
import ToDo from "./ToDo";

const ToDoList = (props) => {
    const { todos } = props;
    if (!todos || todos.length === 0) return <p>Trenutno nema dodatih zadataka.</p>;
    return (
        <React.Fragment>
            {todos.map((todo) =>
                <ToDo todo={todo} handleDelete={props.handleDelete} key={todo.id} />
            )}
        </React.Fragment>
    );
};

export default ToDoList;