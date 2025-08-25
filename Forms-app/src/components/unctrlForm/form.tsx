import { useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setFormData } from '../../store/counterSlice';

export default function UnControlForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nameRef.current &&
      ageRef.current &&
      emailRef.current &&
      passwordRef.current &&
      passwordConfirmRef.current &&
      termsRef.current &&
      genderFemaleRef.current &&
      genderMaleRef.current &&
      country.current
    ) {
      const data = {
        name: nameRef.current.value,
        age: ageRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: passwordConfirmRef.current.value,
        terms: termsRef.current.checked,
        gender: genderMaleRef.current.checked
          ? 'male'
          : genderFemaleRef.current.checked
            ? 'female'
            : '',
        country: country.current.value,
      };
      dispatch(setFormData(data));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-gray-800">Uncontrolled Form</h1>
        <p className="text-sm text-gray-500">Fill in your details</p>
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
          ref={nameRef}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          ref={ageRef}
          placeholder="Enter your age"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          ref={emailRef}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          ref={passwordRef}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          placeholder="••••••••"
          ref={passwordConfirmRef}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      <div className="flex items-center space-x-3">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          ref={termsRef}
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
              ref={genderMaleRef}
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">Male</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              ref={genderFemaleRef}
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
          ref={country}
          placeholder="e.g. Russia"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
      >
        Submit
      </button>
    </form>
  );
}
