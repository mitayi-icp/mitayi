import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = ({ onClose }) => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-black bg-opacity-50 backdrop-blur-lg fixed top-0 left-0 z-50'>
      <div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden justify-center items-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h1 className='text-6xl my-2'>🎊</h1>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to add Mi tokens?</h3>
              <button onClick={onClose} className="text-white bg-yellow-500 hover:bg-yellow-800 text-yellow-800 hover:text-white font-medium rounded-full text-sm inline-flex items-center px-5 py-2.5 text-center">
                Add 10 Mi Tokens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confetti;
