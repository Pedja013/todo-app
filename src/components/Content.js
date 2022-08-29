import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import "../styles/main.scss";
import ToDoList from "./ToDoList";

const Content = () => {
    // states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [naziv, setNaziv] = useState('');
    const [rokPredaje, setRokPredaje] = useState('');
    const [opis, setOpis] = useState('');
    const [prioritet, setPrioritet] = useState('');
    const [todos, setTodos] = useState([]);

    // actions
    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem('todo-list'));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(todos));
    }, [todos]);

    const nazivChangeHandler = (event) => {
        setNaziv(event.target.value)
    };

    const rokChangeHandler = (event) => {
        setRokPredaje(event.target.value)
    };

    const opisChangeHandler = (event) => {
        setOpis(event.target.value)
    };

    const prioritetChangeHandler = (event) => {
        setPrioritet(event.target.value)
    }

    const handleSubmit = () => {
        let todo = { id: Math.random().toString(), naziv, rokPredaje, opis, prioritet };
        setTodos([todo, ...todos]);
        setShow(false)
        setNaziv('')
        setRokPredaje('')
        setOpis('')
        setPrioritet('')
    };

    const handleDelete = (id) => {
        const removeArray = todos.filter((todo) => todo.id !== id);
        setTodos(removeArray);
    };

    return (
        <main className="todo-list pt-5">
            <Container>
                <Row className="justify-content-between mb-5">
                    <Col lg={6}>
                        <h1 className="todo-list--title">Lista zadataka</h1>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-end">
                        <Button className="todo-list--add-new-btn btn btn-dark" onClick={handleShow}>Dodaj</Button>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} size="lg"
                       aria-labelledby="contained-modal-title-vcenter" className="add-todo-modal"
                       centered>
                    <Modal.Header closeButton>
                        <Modal.Title as={"h5"}>Dodavanje / Izmena zadataka</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="form-name" value="id" />
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Naziv:</label>
                                <input
                                    required
                                    type="text"
                                    maxLength={100}
                                    onChange={nazivChangeHandler}
                                ></input>
                            </div>
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Rok predaje:</label>
                                <input
                                    type='date'
                                    min='0'
                                    max='2022-12-31'
                                    onChange={rokChangeHandler}
                                />
                            </div>
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Opis:</label>
                                <textarea
                                    maxLength={100}
                                    onChange={opisChangeHandler}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Rok predaje:</label>
                                <select className="" id="rokPredaje" onChange={prioritetChangeHandler}>
                                    <option value="nizak">Nizak</option>
                                    <option value="srednji">Srednji</option>
                                    <option value="visok">Visok</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="dark" onClick={handleSubmit}>
                            Dodaj
                        </Button>
                        <Button variant="dark" onClick={handleClose}>
                            Zatvori
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToDoList todos={todos} handleDelete={handleDelete} />
            </Container>
        </main>
    );
};

export default Content;