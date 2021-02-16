import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    
    const button = {
        borderColor : "transparent",
        backgroundColor : "white",
        borderRadius : 20,
        margin : 5,
        paddingRight: 10,
        paddingLeft: 10
    }

    return (
        isAuthenticated && (
            <button style = {button} onClick = {() => logout()}>
                Log Out
            </button>
        )
    )
}

export default LogoutButton