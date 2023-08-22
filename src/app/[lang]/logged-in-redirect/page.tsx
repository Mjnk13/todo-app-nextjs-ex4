import LoggedInRedirectAlertSection from "../_component/LoggedInRedirectAlertSection";
import { getDictionary } from "../dictionaries";

const LoggedInRedirect = async ({params}: {params: any}) => {
  const lang = await getDictionary(params.lang);

    return ( 
        <LoggedInRedirectAlertSection lang={lang}/>
    );
}
 
export default LoggedInRedirect;