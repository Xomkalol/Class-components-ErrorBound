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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Choose your form
        </h1>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <button
            onClick={() => handeToggleModal('control')}
            className="px-6 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            Controlled form
          </button>
          <button
            onClick={() => handeToggleModal('uncontroled')}
            className="px-6 py-3 bg-red-50 text-red-600 font-medium rounded-lg shadow hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            Uncontrolled form
          </button>
        </div>
        <div>
          <p>There would be content from the form:</p>
          <ul>
            <ol>Name:{form.name}</ol>
            <ol>Age:{form.age}</ol>
            <ol>Email: {form.email}</ol>
            <ol>gender: {form.gender}</ol>
            <ol>Accepted terms? : {form.terms}</ol>
            <ol>Country:{form.country}</ol>
          </ul>
        </div>
      </div>
      {isModalOpen
        ? createPortal(
            <Modal handle={handeToggleModal} form={showForm}></Modal>,
            document.body
          )
        : null}
    </div>
  );
}

export default App;
