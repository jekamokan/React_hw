import React, { useRef } from 'react';
import './style.css'
const Header = () => {
    const progressValue = useRef(0);
    const hiddenBg = useRef(0);
     return(
        <div className='progress'>
            <p>До экзекуции</p>
            <div className='progress__bar'>
                <span className="progress__bar-value" ref={progressValue}>0 <span>%</span></span>
                <div className="hidden__bg" ref={hiddenBg}></div>
            </div>
        </div>
    )
}

export default Header