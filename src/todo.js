
import React, { useEffect, useState } from 'react'
import axios from "axios";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBin5Line } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [addTodo, setAddTodo] = useState("");

    const [isShow, setIsShow] = useState(true);

    const userToken = "f032ea5566325a093dd10ae17bb654124bb85329";

    useEffect(() => {
        getTodoList();
    }, []);

    // get all todo data api calling
    const getTodoList = () => {
        axios
            .get("https://api.todoist.com/rest/v2/projects", {
                headers: {
                    Authorization: "Bearer " + userToken,
                },
            })
            .then((res) => {
                // console.log(res.data);
                setTodoList(res.data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    // add new todo in todolist api calling
    const insertTodo = () => {
        axios
            .post("https://api.todoist.com/rest/v2/projects",
                {
                    name: addTodo,
                },
                {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
            .then((res) => {
                console.log(res.data);
                handleCancel();
                getTodoList();
            })
            .catch((err) => {
                console.log("error", err);
            });
    };


    // delete todo in todolist api calling
    const deleteTodo = (id) => {
        console.log(id);
        axios
            .delete(`https://api.todoist.com/rest/v2/projects/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
            .then((res) => {
                console.log(res.data);
                handleCancel();
                getTodoList();
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    // show add task input feild click on add task button
    const handleClick = () => {
        setIsShow(!isShow);
        setAddTodo("")
    };

    // hide add task input feild click on cancel button
    const handleCancel = () => {
        setIsShow(!false);
        setAddTodo("")
    }

    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-sm-8 mx-auto bg-light text-black shadow-lg p-3">
                        <h1 className="text-center">Todos List</h1>
                        <div className="row">
                            <div className="container-fluid">
                                <ul className="list-unstyled row">
                                    {todoList.map((item, i) => {
                                        return (
                                            <div className='d-flex justify-content-between align-items-center border-bottom' key={i}>
                                                <li className="p-2 my-2 col-sm-8">{i + 1}&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</li>
                                                <div className='d-flex align-items-center'>
                                                    <li className="deleteBtn" onClick={<Modal />}>
                                                        <FaEdit />
                                                    </li>
                                                    <li className="deleteBtn">
                                                        <RiDeleteBin5Line onClick={() => {
                                                            deleteTodo(item.id);
                                                        }}
                                                            id={item.id} />
                                                    </li>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </ul>
                            </div>

                            {isShow ? (
                                <>
                                    <div className="col-12 pt-3">
                                        <button className="btn btn-warning px-5 font-weight-bold plusbtn" onClick={handleClick}>Add Task</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-12 pt-3">
                                        <input type="text"
                                            value={addTodo}
                                            className="form-control" placeholder="write todos task here"
                                            onChange={(e) => {
                                                setAddTodo(e.target.value);
                                            }}>
                                        </input>
                                        <div className="col-12 pt-2 d-flex justify-content-end">
                                            <button className="btn btn-warning px-5 font-weight-bold" onClick={handleCancel} style={{ marginRight: "10px" }}>Cancel</button>
                                            <button className="btn btn-warning px-5 font-weight-bold" onClick={insertTodo}>Add</button>
                                        </div>
                                    </div>

                                </>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TodoList;

const Modal = ({id}) => {
    return (
        <>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <p>
                        Hello, I'm a modal.
                    </p>
                </div>
            </div>
        </>
    )
}
