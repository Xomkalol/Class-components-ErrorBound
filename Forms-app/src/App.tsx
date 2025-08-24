import './App.css';
import { createPortal } from 'react-dom';
import Modal from './components/modal/modal';
import { useState } from 'react';
import { useAppSelector } from './store/hooks';

function App() {
  const [isModalOpen, setModal] = useState(true);
  const [showForm, setShowForm] = useState('');
  const form = useAppSelector((state) => state.form);

  const handeToggleModal = (form: string) => {
    setShowForm(form);
    if (isModalOpen) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200 transition-all duration-300 transform hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Choose your form
        </h1>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => handeToggleModal('control')}
            className="px-6 py-3 bg-blue-50 text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-200 transition-all duration-200 transform hover:scale-105"
          >
            Controlled form
          </button>
          <button
            onClick={() => handeToggleModal('uncontrolled')}
            className="px-6 py-3 bg-red-50 text-red-700 font-semibold rounded-lg shadow-md hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-200 transition-all duration-200 transform hover:scale-105"
          >
            Uncontrolled form
          </button>
        </div>

        <div className="mt-8 text-left bg-slate-50 p-5 rounded-xl border border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-3">Form data:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Name:</span>
              <span className="text-slate-900">{form.name || '—'}</span>
            </li>
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Age:</span>
              <span className="text-slate-900">{form.age || '—'}</span>
            </li>
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Email:</span>
              <span className="text-slate-900">{form.email || '—'}</span>
            </li>
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Gender:</span>
              <span className="text-slate-900">{form.gender || '—'}</span>
            </li>
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Terms:</span>
              <span
                className={`font-medium ${form.terms ? 'text-green-600' : 'text-red-500'}`}
              >
                {form.terms ? 'Accepted' : 'Not accepted'}
              </span>
            </li>
            <li className="flex justify-between py-1 px-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-slate-700">Country:</span>
              <span className="text-slate-900">{form.country || '—'}</span>
            </li>
          </ul>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <Modal handle={handeToggleModal} form={showForm} />,
          document.body
        )}
    </div>
  );
}

export default App;
