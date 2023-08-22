import SignUpForm from "../_component/SignUpForm";
import { getDictionary } from "../dictionaries";

const SignUp = async ({params}: {params: any}) => {
  const lang = await getDictionary(params.lang);

    return ( 
        <div className="sign-up">
            <div className="container text-center">
                <h3 className="fw-bold">{lang.signUp.title}</h3>
                <p className="mt-3">{lang.signUp.subTitle}</p>
                <i className="fa-solid fa-pen-nib fs-1 mt-3"></i>
                <SignUpForm lang={lang}></SignUpForm>
            </div>
        </div>
    );
}
 
export default SignUp;