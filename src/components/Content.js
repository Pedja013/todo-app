import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import "../styles/main.css";
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
    const [nazivBlured, setNazivBlured] = useState(false);
    const [rokBlured, setRokBlured] = useState(false);
    const [opisBlured, setOpisBlured] = useState(false);
    const [prioritetBlured, setPrioritetBlured] = useState(false);
    const handleClose = () => {
        setShow(false)
        setNaziv('')
        setNazivBlured(false)
        setRokPredaje('')
        setRokBlured(false)
        setOpis('')
        setOpisBlured(false)
        setPrioritet('')
        setPrioritetBlured(false)
    };
    const handleShow = () => setShow(true);

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

    const nazivBlurHandler = () => {
        setNazivBlured(true)
    };

    const rokChangeHandler = (event) => {
        setRokPredaje(event.target.value)
    };

    const rokBlurHandler = () => {
        setRokBlured(true)
    };

    const opisChangeHandler = (event) => {
        setOpis(event.target.value)
    };

    const opisBlurHandler = () => {
        setOpisBlured(true)
    };

    const prioritetChangeHandler = (event) => {
        setPrioritet(event.target.value)
    }

    const prioritetBlurHandler = () => {
        setPrioritetBlured(true)
    }

    // handling classes for form inputs
    const nazivIsValid = naziv.trim() !== '' && naziv.trim().length < 100;
    const nazivIsInvalid = !nazivIsValid && nazivBlured;
    const nazivInputClasses = nazivIsInvalid ? 'form-control border-0 d-block d-sm-flex align-items-start error' : 'form-control border-0 d-block d-sm-flex align-items-start';

    const rokIsValid = rokPredaje.trim() !== '';
    const rokIsInvalid = !rokIsValid && rokBlured
    const rokInputClasses = rokIsInvalid ? 'form-control border-0 d-block d-sm-flex align-items-start error' : 'form-control border-0 d-block d-sm-flex align-items-start';

    const opisIsValid = opis.trim() !== '' && opis.trim().length < 100;
    const opisIsInvalid = !opisIsValid && opisBlured;
    const opisInputClasses = opisIsInvalid ? 'form-control border-0 d-block d-sm-flex align-items-start error' : 'form-control border-0 d-block d-sm-flex align-items-start';

    const prioritetIsValid = prioritet.trim() !== '';
    const prioritetIsInvalid = !prioritetIsValid && prioritetBlured;
    const prioritetInputClasses = prioritetIsInvalid ? 'form-control border-0 d-block d-sm-flex align-items-start error' : 'form-control border-0 d-block d-sm-flex align-items-start';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nazivIsInvalid || rokIsInvalid || opisIsInvalid || prioritetIsInvalid) {
            return;
        }

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
        setNazivBlured(false)
        setRokPredaje('')
        setRokBlured(false)
        setOpis('')
        setOpisBlured(false)
        setPrioritet('')
        setPrioritetBlured(false)
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
        setIsCompleted(currentTodo[0].isCompleted)
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

    // custom method for setting min day of datepicker to today
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10){
        dd = '0' + dd
    }
    if (mm < 10){
        mm = '0' + mm
    }

    today = yyyy+'-'+mm+'-'+dd;

    return (
        <main className="todo-list pt-5">
            <Container>
                <Row className="justify-content-between mb-5">
                    <Col lg={6}>
                        <h1 className="todo-list--title">Lista zadataka</h1>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-lg-end">
                        <Button className="todo-list--add-new-btn btn btn-dark btn-lg" onClick={handleShow}>Dodaj</Button>
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
                            <input type="hidden" name="form-name" value={id} />
                            <div className={nazivInputClasses}>
                                <label className="me-3">Naziv:</label>
                                <input
                                    required
                                    type="text"
                                    maxLength={100}
                                    onChange={nazivChangeHandler}
                                    onBlur={nazivBlurHandler}
                                    value={naziv}
                                ></input>
                            </div>
                            {nazivIsInvalid && <p className="ms-3 mb-0 d-flex justify-content-end error-msg">Molim vas unesite validan naziv (ne duzi od 100 karaktera).</p>}
                            <div className={rokInputClasses}>
                                <label className="me-3">Rok predaje:</label>
                                <input
                                    type='date'
                                    min={today}
                                    max='2022-12-31'
                                    onChange={rokChangeHandler}
                                    onBlur={rokBlurHandler}
                                    value={rokPredaje}
                                />
                            </div>
                            {rokIsInvalid && <p className="ms-3 mb-0 d-flex justify-content-end error-msg">Molim vas unesite validan rok.</p>}
                            <div className={opisInputClasses}>
                                <label className="me-3">Opis:</label>
                                <textarea
                                    maxLength={100}
                                    onChange={opisChangeHandler}
                                    onBlur={opisBlurHandler}
                                    required
                                    value={opis}
                                ></textarea>
                            </div>
                            {opisIsInvalid && <p className="ms-3 mb-0 d-flex justify-content-end error-msg">Molim vas unesite validan opis (ne duzi od 100 karaktera).</p>}
                            <div className={prioritetInputClasses}>
                                <label className="me-3">Rok predaje:</label>
                                <select className="" id="rokPredaje" onChange={prioritetChangeHandler} onBlur={prioritetBlurHandler} value={prioritet}>
                                    <option></option>
                                    <option value="nizak">Nizak</option>
                                    <option value="srednji">Srednji</option>
                                    <option value="visok">Visok</option>
                                </select>
                            </div>
                            {prioritetIsInvalid && <p className="ms-3 mb-0 d-flex justify-content-end error-msg">Molim vas odaberite prioritet zadatka.</p>}
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