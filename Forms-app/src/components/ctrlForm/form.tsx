import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormData } from '../../store/counterSlice';

export default function ControlForm() {
  const [formData, setFormDataState] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    terms: false,
    gender: '',
    country: '',
  });
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFormData(formData));
    console.log('Submit');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg max-h-5/10  bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 mx-auto"
    >
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-slate-800">Controlled Form</h1>
        <p className="text-sm text-slate-600">Fill in your details</p>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-slate-700"
        >
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your age"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="••••••••"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-slate-700"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="••••••••"
        />
      </div>
      <div className="flex items-center space-x-3">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="terms"
          className="text-sm text-slate-700 cursor-pointer"
        >
          I accept the Terms and Conditions
        </label>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Gender</p>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">Male</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">Female</span>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-slate-700"
        >
          Country
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="e.g. Russia"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 active:from-blue-700 active:to-blue-800 transition-all duration-200 transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
}
