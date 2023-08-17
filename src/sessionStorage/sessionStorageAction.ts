export function setUserSessionLogin (userId:number, userFullName:string, userToken:string){
    sessionStorage.setItem("user-login", JSON.stringify({
        userId: userId,
        userFullName: userFullName,
        userToken: userToken
    }));
}

export function setUserSessionLogOut () {
    sessionStorage.setItem("user-login", JSON.stringify({
        userId: -1,
        userFullName: "",
        userToken: "",
    }));
}