import db from "./db";
import jwt from "jsonwebtoken";
import { createAsyncThunk } from "@reduxjs/toolkit";

let IDB: IDBDatabase;

interface authUser {
    email: string,
    password: string
}
interface authUserExtend extends authUser {
    fullname: string,
    userId?: number
}

const sk = process.env.SECRET_KEY as string;

export const userLoginValidate = createAsyncThunk('user/login-validate', async ( user:authUser ) => {
    return new Promise<{result: boolean, token: string}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readonly');
            const store = txn.objectStore('users');
            const indexMail = store.index('email');

            let query = indexMail.get([user.email]);

            query.onerror = () => reject({result: false, token: ""});
            query.onsuccess =  () => {  
                if (query.result && query.result.password === user.password) {
                    let queryKey = indexMail.getKey([user.email]);
                    queryKey.onerror = () => reject({result: false, token: ""});
                    queryKey.onsuccess = () => {
                        let queryResult = query.result;
                        
                        const token = jwt.sign(
                            {
                              userId: queryResult.id,
                              fullname: queryResult.fullname,
                            },
                            sk,
                            {
                                expiresIn: 60 * 60 * 24 //second * minute * hour
                            }
                        );
                        queryResult.userId = queryKey.result;
                        resolve({result: true, token: token});
                    }
                }
                else reject({result: false, token: "" });
            };

            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, token: ""});
        });
    });
});

export const addUserToDb = createAsyncThunk('user/add', async(user:authUserExtend)=> {
    return new Promise<{result: boolean, token: string}>((resolve, reject) => {
        db().then((result) => {
            IDB = result as IDBDatabase ;
            const txn = IDB.transaction('users', 'readwrite');
            const store = txn.objectStore('users');
            let query = store.put(user);
            
            query.onsuccess = (e) => { 
                const target:any = e.target;
                user.userId = target.result;
                const token = jwt.sign(
                    {
                      userId: user.userId,
                      fullname: user.fullname,
                    },
                    sk,
                    {
                        expiresIn: 60 * 60 * 24 //second * minute * hour
                    }
                );
                resolve({result: true, token: token});
            }

            query.onerror = () => { reject({result: false,  token: ""}) }
            txn.oncomplete = () => IDB.close();
        }).catch((error) => {
            reject({result: false, token: ""});
        });
    });
});

export const verifyUserToken = createAsyncThunk('user/token-verify', async(userToken:string)=> {
    return new Promise<{result: boolean, userToken?:string}>((resolve, reject) => {
        try {
            const decoded = jwt.verify(userToken, sk);
            resolve({result: true, userToken: userToken});
          } catch (error) {
             reject({result: false});
          }
    });
});