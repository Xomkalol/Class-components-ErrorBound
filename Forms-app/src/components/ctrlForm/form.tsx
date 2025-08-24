export default function ControlForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <label htmlFor="confirm-password">confirm password</label>
        <input id="confirm-password" type="password" />
      </div>
      <div>
        <label htmlFor="terms">Terms and conditions</label>
        <input id="terms" type="checkbox" />
      </div>
      <div>
        <label htmlFor="gender">gender</label>
        <input id="gender" type="radio" />
        <input id="gender" type="radio" />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
