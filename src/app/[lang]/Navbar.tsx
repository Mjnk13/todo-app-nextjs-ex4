import LanguageSwitcher from "./_component/LanguageSwitcher";

const Navbar = ({lang}: {lang: any}) => {
    return ( 
        <nav className="navbar bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand">Todo</a>
                <LanguageSwitcher/>
            </div>
        </nav>
    );
}
 
export default Navbar;