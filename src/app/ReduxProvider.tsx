"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store';
import { setUserSessionLogOut } from '../sessionStorage/sessionStorageAction'
import "bootstrap/dist/js/bootstrap"

type props = {
    children: React.ReactNode;
}

if (sessionStorage.getItem("user-login") == null) {
  setUserSessionLogOut();
}

const ReduxProvider = (props: props) => {
  return (
    <Provider store={store}>
        {props.children}
    </Provider>
  )
}

export default ReduxProvider