// SignupForm.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      console.log("Start");
      const response = await fetch(
        "https://p2carebackend.onrender.com/user/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        navigate("/sign-in");
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100  h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Name"
            >
              Name:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="Name"
              defaultValue={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Username"
            >
              Username:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="Username"
              defaultValue={formData.Username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="Email"
              defaultValue={formData.Email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="Password"
              defaultValue={formData.Password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign Up"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
