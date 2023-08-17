'use client'

import Alert from "../_component/Alert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { verifyUserToken } from "@/indexeddb/dbUserActions";


const LoggedInRedirect = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);
    const auth = useSelector((state:any) => state.auth);
    const [ message, setMessage ] = useState("");
    const [ alertType, setAlertType ] = useState("");

    useEffect(() => {
        dispatch(verifyUserToken(userLogged.userToken) as any);
    }, []);

    useEffect(()=>{
        if(auth.verifyTokenStatus === "success") {
            setAlertType("info");
            setMessage("You already log in ! Redirect to Dash Board in few second");
            setTimeout(() => {router.replace("../dashboard")}, 3000);
        } else if (auth.verifyTokenStatus === "error") {
            setAlertType("danger");
            setMessage("You are not log in or token expired ! Redirect to Sign In page in few second");
            setTimeout(() => {router.replace("../sign-in")}, 3000);
        }
    },[auth.verifyTokenStatus]);

    return ( 
        <Alert type={alertType} message={message}></Alert>
    );
}
 
export default LoggedInRedirect;