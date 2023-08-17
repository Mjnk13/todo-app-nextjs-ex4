const Alert = ({message, type}: {message:string, type: string}) => {
    return ( 
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
}
 
export default Alert;