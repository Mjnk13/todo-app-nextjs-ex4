'use client'

import Alert from "../_component/Alert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { verifyUserToken } from "@/indexeddb/dbUserActions";
import { setUserSessionLogOut } from "@/sessionStorage/sessionStorageAction";

const LoggedInRedirectAlertSection = ({lang}: {lang: any}) => {
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
            setTimeout(() => {router.replace(`../${lang.name}/dashboard`)}, 3000);
        } else if (auth.verifyTokenStatus === "error") {
            setUserSessionLogOut();
            setAlertType("danger");
            setMessage("You are not log in or token expired ! Redirect to Sign In page in few second");
            setTimeout(() => {router.replace(`../${lang.name}/sign-in`)}, 3000);
        }
    },[auth.verifyTokenStatus]);

    return ( 
        <Alert type={alertType} message={message}></Alert>
    );
}
 
export default LoggedInRedirectAlertSection;