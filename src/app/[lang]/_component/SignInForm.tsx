'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"
import { userLoginValidate } from "@/indexeddb/dbUserActions"
import Alert from "./Alert"
import { setSignInProcessDone, setStatusSignIn } from "@/redux/authSlice"
import { setUserSessionLogin } from "@/sessionStorage/sessionStorageAction"

const SignInForm = ({lang}: {lang: any}) => {
    interface authUser {
        email: string,
        password: string
    }

    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state:any) => state.auth);
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    const [ userEmail, getUserEmail ] = useState ("");
    const [ userPassword, getUserPassword ] = useState ("");
    const [ isButtonSignInDisable, setIsButtonSignInDisable ] = useState(false);
    const [ buttonSignInContent, setButtonSignInContent ] = useState (<>{lang.signIn.button}</>);
    const [ alert, setAlert ] = useState(<></>);
    const [ isNavigate, setIsNavigate ] = useState(false);

    useEffect(()=> {
        if(auth.signInProcessDone)
            router.replace(`../${lang.name}/logged-in-redirect`);
    }, []);

    useEffect(() => {
        if(isNavigate) {
            setTimeout(() => { dispatch(setStatusSignIn("redirect")); }, 3000);
        }
    }, [isNavigate]);

    useEffect(() => {
        if (userLogged.userToken && !auth.statusSignIn)
            router.replace(`../${lang.name}/logged-in-redirect`);
        else if(auth.statusSignIn === "redirect"){
            router.replace(`../${lang.name}/dashboard`);
            dispatch(setSignInProcessDone("done"));
            dispatch(setStatusSignIn("finish"));
        } else if(auth.statusSignIn === "success"){
            setAlert(<Alert type="success" message={lang.signIn.alert.signInSuccessMessage}/>);
            setButtonSignInContent(<i className="fa-solid fa-circle-check fs-1" style={{color: "green"}}></i>);
            setUserSessionLogin(auth.id, auth.fullname, auth.token);
            setIsNavigate(true);
        } else if (auth.statusSignIn === "error") {            
            setAlert(<Alert type="danger" message={lang.signIn.alert.signInErrorMessage}/>);
            setButtonSignInContent(<>{lang.signIn.button}</>);
            setIsButtonSignInDisable(false);
        }
    }, [auth.statusSignIn]);

    function validateUserSignInForm(email_input:string, password_input:string):boolean {
        if (email_input === "")
            { setAlert(<Alert type="danger" message={lang.signIn.alert.emailEmpty}/>); return false; }
        else if(password_input === "")
            { setAlert(<Alert type="danger" message={lang.signIn.alert.passwordEmpty}/>); return false; }
        
        return true;
    }

    function signInFormSubmitHandler(event: React.MouseEvent) {
        'use client'
        event.preventDefault();
        setIsButtonSignInDisable(true);

        setButtonSignInContent(<div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>);

        const user:authUser = {
            email: userEmail,
            password: userPassword
        }

        const isValid:boolean = validateUserSignInForm(userEmail, userPassword);

        if(isValid) {
            setAlert(<Alert type="warning" message="Loading"/>);
            setIsButtonSignInDisable(true);
            dispatch(userLoginValidate(user) as any);
        } else {
            setButtonSignInContent(<>{lang.signIn.button}</>);
            setIsButtonSignInDisable(false);
        }
    }

    return ( 
        <form className="mt-5 text-center" id="sign-in-form">
            {alert}
            <h5 className="text-start ms-3">{lang.signIn.inputTitle.email}:</h5>
            <div className="form-floating mb-3">
                <input type="email" className="form-control ps-4" id="email-user-input-sign-in" placeholder="example@email.com" onChange={e => getUserEmail(e.target.value)}/>
                <label htmlFor="email-user-input-sign-in" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>{lang.signIn.inputLabel.email}</label>
            </div>

            <h5 className="text-start ms-3">{lang.signIn.inputTitle.password}:</h5>
            <div className="form-floating mb-3">
                <input type="password" className="form-control ps-4" id="password-user-input-sign-in" placeholder="password" onChange={e => getUserPassword(e.target.value)}/>
                <label htmlFor="password-user-input-sign-in" className="w-100"><i className="fa-solid fa-lock mx-3"></i>{lang.signIn.inputLabel.password}</label>
            </div>
            <Link href={`../${lang.name}/forget-password/`} className="text-decoration-none fw-bold mt-3" style={{color: "#F700C4"}}>{lang.signIn.forgotPasswordLink}</Link>
            <button type="submit" form="sign-in-form" className="btn custom-btn-1 w-100 py-3 mt-3" disabled={isButtonSignInDisable} onClick={signInFormSubmitHandler}>{buttonSignInContent}</button>
            <p className="mt-3">{lang.signIn.notHaveAccount.context} <Link href={`../${lang.name}/sign-up/`} style={{color: "#F700C4"}}>{lang.signIn.notHaveAccount.link}</Link></p>
        </form>
    );
}
 
export default SignInForm;