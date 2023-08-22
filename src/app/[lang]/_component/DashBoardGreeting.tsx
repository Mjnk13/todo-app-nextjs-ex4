'use client'

const DashBoardGreeting = ({lang}: {lang: any}) => {
    const userLogged = JSON.parse(sessionStorage.getItem("user-login") as string);

    return ( 
        <p className="fs-3">{lang.dashboard.greetingUser}, {userLogged.userFullName}</p>
    );
}
 
export default DashBoardGreeting;