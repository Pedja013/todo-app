import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import "../styles/main.scss";
import ToDoList from "./ToDoList";

const Content = () => {
    // states
    const [show, setShow] = useState(false);
    const [naziv, setNaziv] = useState('');
    const [rokPredaje, setRokPredaje] = useState('');
    const [opis, setOpis] = useState('');
    const [prioritet, setPrioritet] = useState('');
    const [todos, setTodos] = useState([]);
    const [id, setId] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setNaziv('')
        setRokPredaje('')
        setOpis('')
        setPrioritet('')
    };

    // actions
    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem('todo-list'));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    useEffect(() => {
        if (todos?.length) {
            localStorage.setItem('todo-list', JSON.stringify(todos));
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            let oldTodos = [...todos]
            oldTodos.map(item => {
                if (id == item.id) {
                    item.naziv = naziv;
                    item.rokPredaje = rokPredaje;
                    item.opis = opis;
                    item.prioritet = prioritet;
                    item.isCompleted = isCompleted;
                }
                return item;
            });
            setTodos(oldTodos);
        } else {
            let todo = { id: Math.random().toString(), naziv, rokPredaje, opis, prioritet, isCompleted };
            setTodos([todo, ...todos]);
        }
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

    const handleShowEditModal = (todoId) => {
        const currentTodo = todos.filter(item => item.id === todoId);
        console.log('handleShowEditModal');
        setId(currentTodo[0].id)
        setNaziv(currentTodo[0].naziv)
        setRokPredaje(currentTodo[0].rokPredaje)
        setOpis(currentTodo[0].opis)
        setPrioritet(currentTodo[0].prioritet)
        setShow(true)
    }

    const handleComplete = (todoId) => {
        let currentTodos = [...todos]
        currentTodos.map(item => {
            if (todoId == item.id) {
                item.isCompleted = true;
            }
            return item;
        });
        setTodos(currentTodos);
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
                                    value={naziv}
                                ></input>
                            </div>
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Rok predaje:</label>
                                <input
                                    type='date'
                                    min='0'
                                    max='2022-12-31'
                                    onChange={rokChangeHandler}
                                    value={rokPredaje}
                                />
                            </div>
                            <div className="form-control border-0 d-flex align-items-start">
                                <label className="me-3">Opis:</label>
                                <textarea
                                    maxLength={100}
                                    onChange={opisChangeHandler}
                                    required
                                    value={opis}
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
                <ToDoList todos={todos} handleDelete={handleDelete} handleShowEditModal={handleShowEditModal} handleComplete={handleComplete} />
            </Container>
        </main>
    );
};

export default Content;