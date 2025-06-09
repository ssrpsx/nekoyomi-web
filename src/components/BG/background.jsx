import React, { useEffect, useState } from 'react';

export default function BackgroundDots() {
  const dotCount = 60;

  const dots = Array.from({ length: dotCount }, (_, i) => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const rotate = Math.floor(Math.random() * 360);
    const size = Math.floor(Math.random() * 20) + 20;
    const opacity = (Math.floor(Math.random() * 70) + 10) / 100;
    const animate = (i % 5) + 1;    

    return (
        <>
            <div
              key={i}
              className="absolute rounded-[30%] bg-gray-500/20 dark:bg-gray-400/20"
              style={{
                top: `${top}vh`,
                left: `${left}vw`,
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotate(${rotate}deg)`,
                animation: `animate${animate} ${animate + 3}s linear infinite`,
              }}
            ></div>
            <div className="bg-white dark:bg-slate-700 p-4"></div>
        </>
    );
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {dots}
    </div>
  );
}