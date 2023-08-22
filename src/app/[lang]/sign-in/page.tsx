import SignInForm from "../_component/SignInForm";
import { getDictionary } from "../dictionaries";

const SignIn = async ({params}: {params: any}) => {
  const lang = await getDictionary(params.lang);

    return (
        <div className="sign-in">
            <div className="container text-center">
                <h3 className="fw-bold">{lang.signIn.title}</h3>
                <img className="w-100 mt-5" src="/images/sign-in-user.png" alt="/images/sign-in-user.png" style={{maxWidth: "20rem"}} />
            </div>
            <SignInForm lang={lang}></SignInForm>
        </div>
    );
}
 
export default SignIn;