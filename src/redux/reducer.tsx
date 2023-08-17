"use client"

import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { todoReducer } from "./todoSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer
});