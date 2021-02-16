import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect , isAuthenticated } = useAuth0();
    

    const button = {
        borderColor : "transparent",
        backgroundColor : "white",
        borderRadius : 20,
        margin : 5,
        paddingRight: 10,
        paddingLeft: 10
    }

    return (
        (!isAuthenticated) && (
            <div style = {{display:"flex", flexDirection: "column", "justify-content" :"center", "align-items" :"center", margin : 200, backgroundColor : "pink", padding : 100, borderRadius : 50}}>
                <img src = {'/logo.svg'} alt = "logo" width = "50" height = "50"/>
                <h1 style = {{margin : 20}}>Welcome to Daily Diary Hub</h1>
                <button style = {button} onClick = {() => loginWithRedirect()}>
                    Log In
                </button>
            </div>
        )
    )
}

export default LoginButton