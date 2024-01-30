import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInSuccess, signOutAction } from "../redux/user/userSlice";

const Profile = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [formData, setFormData] = useState({
    Username: currentUser.Username,
    Email: currentUser.Email,
    Password: "",
    Name: currentUser.Name,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (currentUser) {
  //       setFormData({
  //         Username: currentUser.Username || "",
  //         Email: currentUser.Email || "",
  //         Password: "",
  //         Name: currentUser.Name || "",
  //       });
  //     }
  //   }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setSuccessMessage(null);
      const res = await fetch(
        `https://p2carebackend.onrender.com/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: currentUser.token,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signInSuccess(data.udata));
        setSuccessMessage("Data updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `https://p2carebackend.onrender.com/user/delete/${currentUser._id}`,

        {
          method: "DELETE",
          headers: {
            Authorization: currentUser.token,
          },
        }
      );

      if (response.ok) {
        dispatch(signOutAction());
        navigate("/sign-up");
      } else {
        console.error("Failed to sign out account:", response.statusText);
      }
    } catch (error) {
      console.error("Error Sign Out account:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md ">
        <div className="flex mb-6 flex-col">
          <h2 className="text-xl font-semibold">{currentUser.Name}</h2>
          <form>
            <div className="mb-4 ">
              <label
                htmlFor="Username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="Username"
                className="w-full p-2 border rounded-md"
                defaultValue={formData.Username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="Name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                className="w-full p-2 border rounded-md"
                defaultValue={formData.Name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="Email"
                className="w-full p-2 border rounded-md"
                defaultValue={formData.Email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="Password"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Update Now
              </button>
            </div>
          </form>
        </div>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {/* Links Section */}
        <div className="mt-6">
          <button
            className="text-blue-500 hover:underline"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
