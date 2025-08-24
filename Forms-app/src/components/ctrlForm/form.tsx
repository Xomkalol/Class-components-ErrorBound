import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormData } from '../../store/counterSlice';

export default function ControlForm() {
  const [formData, setFormDataState] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    terms: '',
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
    <form onSubmit={handleSubmit}>
      <h1>controlled Form</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirm-password">confirm password</label>
        <input id="confirm-password" type="password" />
      </div>
      <div>
        <label htmlFor="terms">Terms and conditions</label>
        <input
          id="terms"
          name="terms"
          type="checkbox"
          value={formData.terms}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">gender</label>
        <input
          id="gender"
          name="gender"
          type="radio"
          value={formData.gender}
          onChange={handleChange}
        />
        <input id="gender" type="radio" />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
