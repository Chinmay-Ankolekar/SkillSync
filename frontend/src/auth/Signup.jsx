import { useState } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";

function signup() {
  let navigate = useNavigate();
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
    type: "",
  });

  const handlechange = (e) => {
    setformData((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullname,
            userType: formData.type,
          },
        },
      });

      if (error) {
        throw error;
      }
      alert("User Created");
      navigate("/login");
      createUser(data.user.id);
    } catch (error) {
      alert(error.message);
    }
  };

  async function createUser(id) {
    try {
      console.log(formData.type);
      const { data, error } = await supabase
        .from("users")
        .insert({
          fullname: formData.fullname,
          email: formData.email,
          type: formData.type,
          id: id,
        })
        .single();
      if (error) throw error;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-8">Sign up</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                onChange={handlechange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handlechange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handlechange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                user type
              </label>
              <input
                id="fullname"
                name="type"
                type="text"
                required
                onChange={handlechange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="user type"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default signup;
