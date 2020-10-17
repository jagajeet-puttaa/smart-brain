import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png';

const Logo = () => {
    return (
        <div className= 'ma4 mt0'>
            <Tilt className="Tilt br2 shadow-5" options={{ max : 50 ,transition:true,easing:"cubic-bezier(.03,.98,.52,.99)",reset:true}} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img src={brain} alt = 'Logo'/> </div>
            </Tilt>
        </div>
    )
}

export default Logo;