'use client'

import Alert from "../_component/Alert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setUserSessionLogOut } from "@/sessionStorage/sessionStorageAction";
import { clearAuth } from "@/redux/authSlice";
import { useAuthUserDispatch } from "@/redux/hook";

const SignOutAlertSection = ({lang}: {lang: any}) => {
    const dispatch = useAuthUserDispatch();
    const router = useRouter();
    const [ message, setMessage ] = useState("");
    const [ alertType, setAlertType ] = useState("");
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    useEffect(()=>{
        if(userLogged.userToken !== "") {        
            setUserSessionLogOut();
            setAlertType("info");
            setMessage("Sign out successfully ! Redirect to Start Page in few second");
            dispatch(clearAuth());
            setTimeout(() => { router.replace(`../${lang.name}/`) }, 3000);
        } else {
            router.replace(`../${lang.name}/`);
        }
    },[]);

    return ( 
        <Alert type={alertType} message={message}></Alert>
    );
}
 
export default SignOutAlertSection;