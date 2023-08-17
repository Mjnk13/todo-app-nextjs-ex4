"use client"

import { createSlice } from "@reduxjs/toolkit";
import { addTodoTask, deleteTodoTaskById, getAllTodoTasksByUserId, updateTodoTaskDone } from "../indexeddb/dbTodoActions";

interface todoTask {
    userId: number,
    content: string,
    done: boolean,
    id?: number
}

interface state {
    data: Array<todoTask>
    status: string,
    for: string,
}

const initialTodosState:state = {
    data: [],
    status: "",
    for: ""
};

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialTodosState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        // Add todo task
        .addCase(addTodoTask.pending, (state, action) => {
            state.status = "pending";
            state.for = "add task";
        })
        .addCase(addTodoTask.fulfilled, (state, action) => {
            state.data.push(action.payload.todoTask);
            state.status = "success";
        })
        .addCase(addTodoTask.rejected, (state, action) => {
            state.status = "error";
        })

        // Get all todo tasks by user id
        .addCase(getAllTodoTasksByUserId.pending, (state, action) => {
            state.status = "pending";
            state.for = "get all task by user ID";
        })
        .addCase(getAllTodoTasksByUserId.fulfilled, (state, action) => {
            state.status = "success";
            state.data = action.payload.todoTasks;
        })
        .addCase(getAllTodoTasksByUserId.rejected, (state, action) => {
            state.status = "error";
        })

        // Update todo task done
        .addCase(updateTodoTaskDone.pending, (state, action) => {
            state.status = "pending";
            state.for = "update task is done by task id";
        })
        .addCase(updateTodoTaskDone.fulfilled, (state, action) => {
            state.status = "success";

            //pass by reference
            const updateTodoDone = state.data.find(task => task.id === action.payload.taskId);
            if (updateTodoDone) {
                updateTodoDone.done = !updateTodoDone.done;
            }
        })
        .addCase(updateTodoTaskDone.rejected, (state, action) => {
            state.status = "error";
        })

        // Delete todo task by id
        .addCase(deleteTodoTaskById.pending, (state, action) => {
            state.status = "pending";
            state.for = "delete task is done by task id";
        })
        .addCase(deleteTodoTaskById.fulfilled, (state, action) => {
            state.status = "success";

            //pass by reference
            const updateTodoDelete = state.data.find(task => task.id === action.payload.taskId);
            if (updateTodoDelete) {
                state.data = state.data.filter(task => task.id != action.payload.taskId);
            }
        })
        .addCase(deleteTodoTaskById.rejected, (state, action) => {
            state.status = "error";
        });
    }
});



export const {  }  = todoSlice.actions;
export const todoReducer = todoSlice.reducer;