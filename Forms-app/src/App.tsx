import './App.css';
import { createPortal } from 'react-dom';
import Modal from './components/modal/modal';
import { useState } from 'react';
import { useAppSelector } from './store/hooks';

function App() {
  const [isModalOpen, setModal] = useState(false);
  const [showForm, setShowForm] = useState('');
  const form = useAppSelector((state) => state.form);

  const handleToggleModal = (form: string) => {
    setShowForm(form);
    if (isModalOpen) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Choose your form</h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleToggleModal('control')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Controlled Form
          </button>
          <button
            onClick={() => handleToggleModal('uncontrolled')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          >
            Uncontrolled Form
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Form Data:
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 text-left max-w-xs mx-auto">
            <li className="flex justify-between">
              <span>Name:</span> <span>{form.name || '—'}</span>
            </li>
            <li className="flex justify-between">
              <span>Age:</span> <span>{form.age || '—'}</span>
            </li>
            <li className="flex justify-between">
              <span>Email:</span> <span>{form.email || '—'}</span>
            </li>
            <li className="flex justify-between">
              <span>Gender:</span> <span>{form.gender || '—'}</span>
            </li>
            <li className="flex justify-between">
              <span>Terms:</span>{' '}
              <span className={form.terms ? 'text-green-600' : 'text-red-500'}>
                {form.terms ? 'Accepted' : 'Not accepted'}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Country:</span> <span>{form.country || '—'}</span>
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal handle={handleToggleModal} form={showForm} />,
          document.body
        )}
    </div>
  );
}

export default App;
