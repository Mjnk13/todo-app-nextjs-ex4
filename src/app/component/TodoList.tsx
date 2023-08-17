'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoTaskById, updateTodoTaskDone } from "../../indexeddb/dbTodoActions";
import React from "react";

type todoTask = {
    id: number
    content: string,
    done: boolean
}

type props = {
    todoTaskList: Array<todoTask>;
}

const TodoList = (props: props) => {
    const dispatch = useDispatch();
    const todoState = useSelector((state:any) => state.todo);
    
    const [checkedState, setCheckedState] = useState([] as boolean[]);

    useEffect(() => {
        if(todoState.status === "success") {
            const updatedCheckedState = props.todoTaskList.map((item) => item.done as boolean );
            setCheckedState(updatedCheckedState);
        }
    }, [todoState.status]);
    

    function todoTaskDoneOnChangeHandle(position: number, taskId: number) {
        'use client'
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item );
        setCheckedState(updatedCheckedState);

        dispatch(updateTodoTaskDone(taskId) as any);
    }

    function todoTaskDeleteOnClickHandle(event: React.MouseEvent, taskId: number) {
        'use client'
        event.preventDefault();

        dispatch(deleteTodoTaskById(taskId) as any);
    }

    return (
        <div className="todo-list">
            {props.todoTaskList.map((todo:todoTask, index:number) => (
                <div className="todo-task row align-items-center my-3" key={todo.id}>
                    <div className="col-sm-1 col-2 p-0 text-center">
                        <input className="form-check-input mt-0" type="checkbox" checked={checkedState[index] as boolean || false } onChange={() => { todoTaskDoneOnChangeHandle(index, todo.id) }}></input>
                    </div>
                    <div className="col-sm-10 col-8">
                        <p className="ps-2 mb-0">{todo.content}</p>
                    </div>
                    <div className="col-sm-1 col-2 p-0 text-center">
                        <button type="button" className="btn p-0 text-danger border-0" style={{height: "28px"}} onClick={(e) => { todoTaskDeleteOnClickHandle(e, todo.id) }}><i className="fa-solid fa-circle-minus fs-3"></i></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;