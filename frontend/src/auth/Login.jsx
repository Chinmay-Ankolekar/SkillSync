import { useState } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formdata.email,
        password: formdata.password,
      });
      if (error) throw error;
      setToken(data);

      if(data.user.user_metadata.userType === "hr"){
        navigate("/dashboard");
      }
      else{
        navigate("/userdashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <>
                                        


     {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form className="space-y-4">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handlesubmit}
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div> */}


<div class="flex justify-center items-center h-screen">
  <div class="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
    <div class="max-w-md rounded-3xl bg-gradient-to-t from-purple-800 via-purple-800 to-purple-800 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
      <p class="mb-20 font-bold tracking-wider">CORINE</p>
      <p class="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
        Start your <br />
        journey with us
      </p>
      <p class="mb-28 leading-relaxed text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi voluptas a officia. Omnis.</p>
      <div class="bg-purple-600/80 rounded-2xl px-4 py-8">
        <p class="mb-3 text-gray-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea voluptates sapiente!</p>
        <div class="">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full object-cover" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" alt="Simon Lewis" />
            <p class="ml-4 w-56">
              <strong class="block font-medium">Simon Lewis</strong>
              <span class="text-xs text-gray-200"> Published 12 Bestsellers </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 py-20">
      <h2 class="mb-2 text-3xl font-bold">Sign Up</h2>
      <a href="#" class="mb-10 block font-bold text-gray-600">Have an account</a>
      <p class="mb-1 font-medium text-gray-500">Looking for?</p>
      <div class="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
        <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
          <input class="peer hidden" type="radio" name="radio" id="radio1" checked />
          <label class="peer-checked:border-purple-600 peer-checked:bg-purple-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border" for="radio1"> </label>
          <div class="peer-checked:border-transparent peer-checked:bg-purple-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-purple-600 ring-offset-2"></div>
          <span class="pointer-events-none z-10">Projects</span>
        </div>
        <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
          <input class="peer hidden" type="radio" name="radio" id="radio3" checked />
          <label class="peer-checked:border-purple-600 peer-checked:bg-purple-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border" for="radio3"> </label>
          <div class="peer-checked:border-transparent peer-checked:bg-purple-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-purple-600 ring-offset-2"></div>
          <span class="pointer-events-none z-10">Job</span>
        </div>
      </div>
      <p class="mb-1 font-medium text-gray-500">Email</p>
      <div class="mb-4 flex flex-col">
        <div class="focus-within:border-purple-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="email" id="signup-email" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>
      <p class="mb-1 font-medium text-gray-500">Password</p>
      <div class="mb-4 flex flex-col">
        <div class="focus-within:border-purple-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="password" id="signup-password" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
        </div>
      </div>
      <button class="hover:shadow-purple-600/40 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">Sign Up</button>
    </div>
  </div>
</div>

    </>
  );
}

export default Login;
