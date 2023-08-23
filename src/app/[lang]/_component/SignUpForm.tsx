'use client'

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { addUserToDb } from "@/indexeddb/dbUserActions";
import { useSelector, useDispatch } from "react-redux";
import { setUserSessionLogin } from "@/sessionStorage/sessionStorageAction";
import Alert from "../_component/Alert";
import { setSignUpProcessDone, setStatusSignUp } from "@/redux/authSlice";

const SignUpForm = ({lang}: {lang: any}) => {
    interface authUser {
        userId?: number,
        fullname: string,
        email: string,
        password: string
    }

    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state:any) => state.auth);
    
    const [ userFullName, getUserFullName ] = useState ("");
    const [ userEmail, getUserEmail ] = useState ("");
    const [ userPassword, getUserPassword ] = useState ("");
    const [ userConfirmPassword, getUserConfirmPassword ] = useState ("");
    const [ buttonSignUpContent, setButtonSignUpContent ] = useState (<>{lang.signUp.button}</>);
    const [ alert, setAlert ] = useState(<></>);
    const [ isNavigate, setIsNavigate ] = useState(false);
    const [ isButtonSignUpDisable, setIsButtonSignUpDisable ] = useState(false);
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    useEffect(()=> {      
        if(auth.signUpProcessDone)
            router.replace(`../${lang.name}/logged-in-redirect`);
    }, []);

    useEffect(() => {
        if(isNavigate) {
            setTimeout(() => { dispatch(setStatusSignUp("redirect")); }, 3000);
        }
    }, [isNavigate]);

    useEffect(() => {
        if (userLogged.userToken && !auth.statusSignUp)
            router.replace(`../${lang.name}/logged-in-redirect`);
        else if(auth.statusSignUp === "redirect"){
            router.replace(`../${lang.name}/dashboard`);
            dispatch(setSignUpProcessDone("done"));
            dispatch(setStatusSignUp("finish"));
        } else if(auth.statusSignUp === "success"){
            setAlert(<Alert type="success" message={lang.signUp.alert.signUpSuccessMessage}/>);
            setButtonSignUpContent(<i className="fa-solid fa-circle-check fs-1" style={{color: "green"}}></i>);
            
            setUserSessionLogin(auth.id, auth.fullname, auth.token);
            setIsNavigate(true);
        } else if (auth.statusSignUp === "error") {            
            setAlert(<Alert type="danger" message={lang.signUp.alert.signUpErrorMessage}/>);
            setButtonSignUpContent(<>{lang.signUp.button}</>);
            setIsButtonSignUpDisable(false);
        }
            
    },[auth.statusSignUp]);

    function validateUserSignUpForm(fullname_input: string, email_input:string, password_input:string, confirm_password_input:string):boolean {
        if (fullname_input === "")
            {setAlert(<Alert type="danger" message={lang.signUp.alert.fullnameEmpty}/>); return false; }
        else if (email_input === "")
            {setAlert(<Alert type="danger" message={lang.signUp.alert.emailEmpty}/>); return false; }
        else if (!(/\S+@\S+\.\S+/.test(email_input))) 
            { setAlert(<Alert type="danger" message={lang.signUp.alert.emailInvalid}/>); return false; }
        else if(password_input === "")
            { setAlert(<Alert type="danger" message={lang.signUp.alert.passwordEmpty}/>); return false; }
        else if(password_input !== confirm_password_input)
            { setAlert(<Alert type="danger" message={lang.signUp.alert.confirmPasswordNotMatching}/>); return false }
        
        return true;
    }

    const signUpFormSubmitHandler = (event: React.MouseEvent) => {
        'use-client'
        event.preventDefault();
        setIsButtonSignUpDisable(true);

        setButtonSignUpContent(<div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>);

        const isValid:boolean = validateUserSignUpForm(userFullName, userEmail, userPassword, userConfirmPassword);            

        if(isValid) {
            const User:authUser = {
                fullname: userFullName,
                email: userEmail,
                password: userPassword
            }
            
            setAlert(<Alert type="warning" message="Loading"/>);
            setIsButtonSignUpDisable(true);
            dispatch(addUserToDb(User) as any);
        } else {
            setButtonSignUpContent(<>{lang.signUp.button}</>);
            setIsButtonSignUpDisable(false);
        }
    }

    return ( 
        <form className="mt-3 text-center" id="sign-up-form">
            {alert}
            <h5 className="text-start ms-3">{lang.signUp.inputTitle.fullname}:</h5>
            <div className="form-floating mb-3">
                <input type="text" className="form-control ps-4" id="full-name-user-input-sign-up" placeholder="full name" onChange={e => getUserFullName(e.target.value)}/>
                <label htmlFor="full-name-user-input-sign-up" className="w-100"><i className="fa-solid fa-user mx-3"></i>{lang.signUp.inputLabel.fullname}</label>
            </div>

            <h5 className="text-start ms-3">{lang.signUp.inputTitle.email}:</h5>
            <div className="form-floating mb-3">
                <input type="email" className="form-control ps-4" id="email-user-input-sign-up" placeholder="example@email.com" onChange={e => getUserEmail(e.target.value)}/>
                <label htmlFor="email-user-input-sign-up" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>{lang.signUp.inputLabel.email}</label>
            </div>
            
            <h5 className="text-start ms-3">{lang.signUp.inputTitle.password}:</h5>
            <div className="form-floating mb-3">
                <input type="password" className="form-control ps-4" id="password-user-input-sign-up" placeholder="password" onChange={e => getUserPassword(e.target.value)}/>
                <label htmlFor="password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>{lang.signUp.inputLabel.password}</label>
            </div>

            <h5 className="text-start ms-3">{lang.signUp.inputTitle.confirmPassword}:</h5>
            <div className="form-floating mb-3">
                <input type="password" className="form-control ps-4" id="confirm-password-user-input-sign-up" placeholder="confirm password" onChange={e => getUserConfirmPassword(e.target.value)}/>
                <label htmlFor="confirm-password-user-input-sign-up" className="w-100"><i className="fa-solid fa-lock mx-3"></i>{lang.signUp.inputLabel.confirmPassword}</label>
            </div>

            <button form="sign-up-form" className="btn custom-btn-1 w-100 py-3 mt-3" disabled={isButtonSignUpDisable} onClick={(e:React.MouseEvent) => signUpFormSubmitHandler(e)}>{buttonSignUpContent}</button>
            <p className="mt-3">{lang.signUp.haveAccount.context} <Link href={`../${lang.name}/sign-in/`} style={{color: "#F700C4"}}>{lang.signUp.haveAccount.link}</Link></p>
        </form>
    );
}
 
export default SignUpForm;