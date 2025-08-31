import { useEffect } from 'react';
import ControlForm from '../ctrlForm/form';
import UnControlForm from '../unctrlForm/form';

export default function Modal({ handle, form }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handle]);

  return (
    <div
      onClick={handle}
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 p-4 flex overflow-y-auto">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto my-auto flex flex-col"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {form === 'control' ? 'Controlled Form' : 'Uncontrolled Form'}
            </h2>
          </div>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {form === 'control' ? (
              <ControlForm closeButton={handle} />
            ) : (
              <UnControlForm closeButton={handle} />
            )}
          </div>
          <div className="flex justify-center pb-6 px-6">
            <button
              onClick={handle}
              className="w-full max-w-xs px-4 py-2 
                 bg-gray-100 hover:bg-gray-200 
                 text-gray-800 font-medium 
                 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-gray-300 
                 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
