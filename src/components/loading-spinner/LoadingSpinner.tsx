import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import classes from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    isVisible: boolean | undefined;
}

const LoadingSpinner : React.FC<LoadingSpinnerProps> = ({isVisible})  => {
    return (
      <>
        <div className={classes["loading-spinner-container"]}>
                <ThreeDots
                    height={100}
                    width={100}
                    color="#fcd464"                
                    visible={isVisible}
                    ariaLabel="loading dots" />
            </div>
      </>
    )
}

export default LoadingSpinner;
