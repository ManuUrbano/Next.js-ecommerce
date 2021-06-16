import React from "react";
import ChangeNameForm from "../ChangeNameForm";
import ChangeEmailForm from "../ChangeEmailForm";
import ChangePasswordForm from "../ChangePasswordForm";


export default function Config(props){
    const { user, logout, setReloadUser } = props;

    return(
        <div className="account__configuration">
            <div className="data"> 
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />  
                <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePasswordForm user={user} logout={logout} />
            </div>    
                      
        </div>
    );
}