import { useState } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";

function signup() {
  let navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setFormdata((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      const { data, error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
        options: {
          data: {
            fullName: formdata.fullname,
          },
        },
      });
      if (error) throw error;
      alert("User Created");
      navigate("/login");
      createUser();
    } catch (error) {
      alert(error.message);
    }
  };

  async function createUser() {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          fullname: formdata.fullname,
          email: formdata.email,
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
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          </div>
          <button
            onClick={handlesubmit}
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

      {/* <form onSubmit={handlesubmit}>
      <label>Enter the Name</label>
      <input type="text" name='fullname' onChange={handlechange}/>
      <br />
      <br />
      <label>Enter the Email</label>
      <input type="text" name='email' onChange={handlechange}/>
      <br />
      <br />
      <label>Enter the Password</label>
      <input type="text" name='password' onChange={handlechange}/>
      <br />
      <br />
      <button>Signup</button>
      </form>
      <p>Already have an account  <Link to="/">login</Link></p> */}
    </>
  );
}

export default signup;
