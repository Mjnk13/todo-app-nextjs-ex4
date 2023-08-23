import LanguageSwitcher from "./_component/LanguageSwitcher";
import { getDictionary } from "./dictionaries";

const Navbar = async ({params}: {params: any}) => {
  const lang = await getDictionary(params.lang);

    return ( 
        <nav className="navbar bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand">Todo</a>
                <LanguageSwitcher lang={lang}/>
            </div>
        </nav>
    );
}
 
export default Navbar;