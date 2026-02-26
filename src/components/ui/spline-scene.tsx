import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
    scene: string;
    className?: string;
    fallback?: React.ReactNode;
}

export const SplineScene = ({ scene, className = "", fallback }: SplineSceneProps) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Suspense fallback={
                fallback || (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                    </div>
                )
            }>
                <Spline scene={scene} />
            </Suspense>
        </div>
    );
};
