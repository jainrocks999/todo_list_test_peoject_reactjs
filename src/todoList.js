
import React, { useEffect, useState } from 'react'
import axios from "axios";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBin5Line } from "react-icons/ri"

const Todos = () => {
  const [todoList, setTodoList] = useState([]);
  const [addTodo, setAddTodo] = useState("");


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
        cancelBtn();
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
        cancelBtn();
        getTodoList();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // show and add task input field
  const showInput = () => {
    document.getElementById("inputField").style.display = "block";
    document.getElementById("addbtn").style.display = "none";
    setAddTodo("");
  }

  //hide add input field
  const cancelBtn = () => {
    document.getElementById("inputField").style.display = "none";
    document.getElementById("addbtn").style.display = "block";
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

                        <li className="deleteBtn">
                          <RiDeleteBin5Line onClick={() => {
                            deleteTodo(item.id);
                          }}
                            id={item.id} />
                        </li>

                      </div>
                    )
                  })
                  }
                </ul>
              </div>
              <div className="col-12 pt-3" id='addbtn'>
                {console.log("add", addTodo)}
                <button className="btn btn-warning px-5 font-weight-bold plusbtn" onClick={showInput}>Add Task</button>
              </div>

              <div className="col-12 pt-3" id='inputField' style={{ display: "none" }}>
                <input type="text"
                  value={addTodo}
                  className="form-control" placeholder="write todos task here"
                  onChange={(e) => {
                    setAddTodo(e.target.value);
                  }}>

                </input>
                <div className="col-12 pt-2 d-flex justify-content-end">
                  <button className="btn btn-warning px-5 font-weight-bold" onClick={cancelBtn} style={{ marginRight: "10px" }}>Cancel</button>
                  <button className="btn btn-warning px-5 font-weight-bold" onClick={insertTodo}>Add</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todos;
