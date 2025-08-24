import ControlForm from '../ctrlForm/form';
import UnControlForm from '../unctrlForm/form';

export default function Modal({ handle, form }) {
  return (
    <div className="fixed inset-0 bg-gray-200 opacity-100 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-auto overflow-hidden">
        <div className="p-6">
          {form === 'control' ? <ControlForm /> : <UnControlForm />}
        </div>
        <div className="flex justify-center pb-6">
          <button
            onClick={handle}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
