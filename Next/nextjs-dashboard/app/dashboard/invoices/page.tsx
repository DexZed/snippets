import { FormEvent } from "react";

export default function Page() {
 function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

};
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>User Information</legend>
        <label>
          First Name:
          <input type="text" name="firstName" required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" name="dob" required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phone" required />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" rows={4} cols={30} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}
