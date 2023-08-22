import SignOutAlertSection from "../_component/SignOutAlertSection";
import { getDictionary } from "../dictionaries";

const SignOut = async ({params}: {params: any}) => {
  const lang = await getDictionary(params.lang);

    return ( 
        <SignOutAlertSection lang={lang} />
    );
}
 
export default SignOut;