'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"
import { userLoginValidate } from "../../indexeddb/dbUserActions"
import Alert from "../_component/Alert"
import { setSignInProcessDone, setStatusSignIn } from "../../redux/authSlice"
import { setUserSessionLogin } from "../../sessionStorage/sessionStorageAction"


const SignIn = () => {
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
    const [ buttonSignInContent, setButtonSignInContent ] = useState (<>SignIn</>);
    const [ alert, setAlert ] = useState(<></>);
    const [ isNavigate, setIsNavigate ] = useState(false);

    useEffect(()=> {
        if(auth.signInProcessDone)
            router.replace("../logged-in-redirect");
    }, []);

    useEffect(() => {
        if(isNavigate) {
            setTimeout(() => { dispatch(setStatusSignIn("redirect")); }, 3000);
        }
    }, [isNavigate]);

    useEffect(() => {
        if (userLogged.token == "" && !auth.statusSignIn){
            router.replace("../logged-in-redirect");
        } else if(auth.statusSignIn === "redirect"){
            router.replace("../dashboard");
            dispatch(setSignInProcessDone("done"));
            dispatch(setStatusSignIn("finish"));
        } else if(auth.statusSignIn === "success"){
            setAlert(<Alert type="success" message="Sign in success, navigate to dashboard in few second"/>);
            setButtonSignInContent(<i className="fa-solid fa-circle-check fs-1" style={{color: "green"}}></i>);
            setUserSessionLogin(auth.id, auth.fullname, auth.token);
            setIsNavigate(true);
        } else if (auth.statusSignIn === "error") {            
            setAlert(<Alert type="danger" message="Sign in fail, email or password is not correct"/>);
            setButtonSignInContent(<>SignIn</>);
            setIsButtonSignInDisable(false);
        }
    }, [auth.statusSignIn]);

    function validateUserSignInForm(email_input:string, password_input:string):boolean {
        if (email_input === "")
            { setAlert(<Alert type="danger" message="Email is empty !"/>); return false; }
        else if(password_input === "")
            { setAlert(<Alert type="danger" message="Password is empty !"/>); return false; }
        
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
            setButtonSignInContent(<>SignIn</>);
            setIsButtonSignInDisable(false);
        }
    }

    return ( 
        <div className="sign-in">
            <div className="container text-center">
                <h3 className="fw-bold">Welcome Back!</h3>
                <img className="w-100 mt-5" src="/images/sign-in-user.png" alt="/images/sign-in-user.png" style={{maxWidth: "20rem"}} />
                <form className="mt-5" id="sign-in-form">
                    {alert}
                    <h5 className="text-start ms-3">Email:</h5>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control ps-4" id="email-user-input-sign-in" placeholder="example@email.com" onChange={e => getUserEmail(e.target.value)}/>
                        <label htmlFor="email-user-input-sign-in" className="w-100"><i className="fa-solid fa-envelope mx-3"></i>Enter Your Email</label>
                    </div>

                    <h5 className="text-start ms-3">Password:</h5>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control ps-4" id="password-user-input-sign-in" placeholder="password" onChange={e => getUserPassword(e.target.value)}/>
                        <label htmlFor="password-user-input-sign-in" className="w-100"><i className="fa-solid fa-lock mx-3"></i>Enter Your Password</label>
                    </div>
                    <Link href="/forget-password/*" className="text-decoration-none fw-bold mt-3" style={{color: "#F700C4"}}>Forget Password?</Link>
                    <button type="submit" form="sign-in-form" className="btn custom-btn-1 w-100 py-3 mt-3" disabled={isButtonSignInDisable} onClick={signInFormSubmitHandler}>{buttonSignInContent}</button>
                    <p className="mt-3">Don't have an Account ? <Link href="/sign-up/" style={{color: "#F700C4"}}>SignUp</Link></p>
                </form>
            </div>
        </div>
    );
}
 
export default SignIn;