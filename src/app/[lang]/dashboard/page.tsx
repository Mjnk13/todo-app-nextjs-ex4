import Link from "next/link";
import { getDictionary } from "../dictionaries";
import DashBoardTaskListSection from "../_component/DashBoardTaskListSection";
import DashBoardGreeting from "../_component/DashBoardGreeting";

const DashBoard = async ({params}: {params: any}) => {
    const lang = await getDictionary(params.lang);

    return ( 
        <div className="dashboard p-0">
            <div className="user-welcome-background"></div>
            <div className="user-welcome text-center mb-5">
                <img className="" src="/images/user-avatar.png" alt="User Avatar"/>
                <DashBoardGreeting lang={lang}/>
                <Link href={`../${lang.name}/sign-out`}><button className="btn btn-danger">{lang.dashboard.signOutButton}</button></Link>
            </div>
            <div className="dashboard-clock text-center my-5 pt-5">
                <h3 className="mb-3 text-end">{lang.dashboard.greetingTime}</h3>
                <img src="/images/clock.png" alt="clock" />
            </div>
            <h3 style={{color: "#610101"}}>{lang.dashboard.taskListTitle}</h3>
            <DashBoardTaskListSection lang={lang}/>
        </div>
    );
}
 
export default DashBoard;