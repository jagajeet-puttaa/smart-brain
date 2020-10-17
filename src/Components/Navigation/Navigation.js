import React from 'react';

const Navigation = ({onRouteChange , isSignedIn}) => {
    
    if (isSignedIn){
        return (
            <div style = {{display:'flex', justifyContent: 'flex-end'}}>
                <nav>
                    <p onClick = {()=>onRouteChange('signout')} className= 'f3 link underline black dim pa3 pointer'>Sign Out</p>
                </nav>
            </div>
        )
    }else {
        return (
            <div style = {{display:'flex', justifyContent: 'flex-end'}}>
                <nav><p onClick = {()=>onRouteChange('signin')} className= 'f3 link underline black dim pa3 pointer'>Sign In</p></nav>
                <nav><p onClick = {()=>onRouteChange('register')} className= 'f3 link underline black dim pa3 pointer'>Register</p></nav>
            </div>)
    }
}

export default Navigation;