"use client"

import { createSlice } from "@reduxjs/toolkit";
import { addUserToDb, userLoginValidate, verifyUserToken } from "../indexeddb/dbUserActions";

interface authUser {
    id?: number
    fullname: string,
    token: string,
    verifyTokenStatus: string,
    statusSignUp: string,
    statusSignIn: string,
    signUpProcessDone: boolean,
    signInProcessDone: boolean,
}

const initialUserState:authUser = {
    fullname: "",
    token: "",
    verifyTokenStatus: "",
    statusSignUp: "",
    statusSignIn: "",
    signUpProcessDone: false,
    signInProcessDone: false,
}

var jwt = require('jsonwebtoken');

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        setStatusSignUp(state, action) {
            state.statusSignUp = action.payload;
        },
        setStatusSignIn(state, action) {
            state.statusSignIn = action.payload;
        },
        setSignUpProcessDone(state, action) {
            state.signUpProcessDone = action.payload;
        },
        setSignInProcessDone(state, action) {
            state.signInProcessDone = action.payload;
        },
        clearAuth(state){
            state.id = -1;
            state.fullname = "";
            state.verifyTokenStatus =  "",
            state.statusSignUp =  "";
            state.statusSignIn = "";
            state.signUpProcessDone = false;
            state.signInProcessDone = false;
        }
    },
    extraReducers: (builder) =>{
        //addUserToDb
        builder.addCase(addUserToDb.pending, (state, action) => {
            state.statusSignUp = 'loading';
        })
        .addCase(addUserToDb.fulfilled, (state, action) => {
            const token = action.payload.token;
            const decodedToken = jwt.decode(token);
            
            state.id = decodedToken?.userId || null;
            state.fullname = decodedToken?.fullname || "";
            state.token = token;
            state.statusSignUp = 'success';
        })
        .addCase(addUserToDb.rejected, (state, action) => {
            state.statusSignUp = 'error';
        })

        // userLoginValidate
        .addCase(userLoginValidate.pending, (state, action) => {
            state.statusSignIn = 'loading';
        })
        .addCase(userLoginValidate.fulfilled, (state, action) => {
            const token = action.payload.token;
            const decodedToken = jwt.decode(token);

            state.id = decodedToken?.userId || null;
            state.fullname = decodedToken?.fullname || "";
            state.token = token;
            state.statusSignIn = 'success';
        })
        .addCase(userLoginValidate.rejected, (state, action) => {
            state.statusSignIn = 'error';
        })
        //verify user token
        .addCase(verifyUserToken.pending, (state, action) => {
            state.verifyTokenStatus = "loading";
        })
        .addCase(verifyUserToken.fulfilled, (state, action) => {
            state.token = action.payload.userToken as string;
            state.verifyTokenStatus = "success";
        })
        .addCase(verifyUserToken.rejected, (state, action) => {
            state.verifyTokenStatus = "error";
        })
    }
});



export const { setStatusSignUp, setStatusSignIn, setSignUpProcessDone, setSignInProcessDone, clearAuth }  = authSlice.actions;
export const authReducer = authSlice.reducer;