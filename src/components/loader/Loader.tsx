import React from 'react';
import Lottie from 'react-lottie';
import animationData from './load.json';
import './Loader.css';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

export const Loader: React.FC = () => (
    <div className={'loader'}>
        <Lottie options={defaultOptions} height={150} width={150} />
    </div>
);
