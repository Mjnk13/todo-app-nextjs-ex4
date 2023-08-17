import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "./db";

let IDB: IDBDatabase;

interface todoTask {
    id?: number
    userId: number,
    content: string,
    done: boolean 
}

export const addTodoTask = createAsyncThunk('todo-task/add', async (todoTask: todoTask) => {
    return new Promise<{result: boolean, todoTask: todoTask}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('todoTasks', 'readwrite');
            const store = txn.objectStore('todoTasks');
            let query = store.put(todoTask);
            
            query.onsuccess = (e) => {
                const target:any = e.target;   
                todoTask.id = target.result;
                resolve({result: true, todoTask: todoTask});
            }

            query.onerror = () => { reject({result: false, user: todoTask}); console.log(query.error); }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, user: todoTask});
        });
    });
});

export const getAllTodoTasksByUserId = createAsyncThunk('todo-task/get-all-todo-tasks-by-user-id', async (userId: number) => {
    return new Promise<{result: boolean, todoTasks: Array<todoTask>}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('todoTasks', 'readonly');
            const store = txn.objectStore('todoTasks');
            const indexUserId = store.index('userId');
        
            let query = indexUserId.getAll([userId]);
            
            query.onerror = () => reject({result: false, todoTasks: []});
            query.onsuccess = () => {        
                const todoTasksList = query.result;
                let queryKey = indexUserId.getAllKeys([userId]);

                queryKey.onerror = () => reject({result: false, todoTasks: []});
                
                queryKey.onsuccess = () => {
                    todoTasksList.forEach((todoTask:any, index:number)=> {
                        todoTask["id"] = queryKey.result[index];
                    });
                    resolve({result: true, todoTasks: todoTasksList});
                }
            };
            txn.oncomplete = () => IDB.close();
        });
    });
});

export const updateTodoTaskDone = createAsyncThunk('todo-task/update-todo-task-done-by-id', async (taskId: number) => {
    return new Promise<{ result: boolean, taskId: number }>((resolve, reject) => {        
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('todoTasks', 'readwrite');
            const store = txn.objectStore('todoTasks');
            store.openCursor(taskId).onerror = () => { reject({ result: false, taskId: taskId}); }
            store.openCursor(taskId).onsuccess = (event: any) => {
                const cursor = event.target.result;
                const updateData = cursor.value;
                updateData.done = !updateData.done;

                const requestUpdate = cursor.update(updateData);
                requestUpdate.onerror = () => { reject({ result: false, taskId: taskId}); }
                requestUpdate.onsuccess = () => { resolve({result: true, taskId: taskId }); }
            }
            
            txn.oncomplete = () => IDB.close();
        });
    });
});

export const deleteTodoTaskById = createAsyncThunk('todo-task/delete-todo-task-done-by-id', async (taskId: number) => {
    return new Promise<{ result: boolean, taskId: number }>((resolve, reject) => {        
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('todoTasks', 'readwrite');
            const store = txn.objectStore('todoTasks');
            store.openCursor(taskId).onerror = () => { reject({ result: false, taskId: taskId}); }
            store.openCursor(taskId).onsuccess = (event: any) => {
                const cursor = event.target.result;

                const requestUpdate = cursor.delete();
                requestUpdate.onerror = () => { reject({ result: false, taskId: taskId}); }
                requestUpdate.onsuccess = () => { resolve({result: true, taskId: taskId }); }
            }
            
            txn.oncomplete = () => IDB.close();
        });
    });
});