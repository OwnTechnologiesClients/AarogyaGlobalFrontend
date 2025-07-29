import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full px-4 py-14">
  {/* Login Form */}
  <div className="bg-white shadow-xl border-black-200 border rounded-2xl p-8 w-full md:w-1/2 h-full flex flex-col justify-between">
    <h2 className="text-xl font-bold mb-6 text-[#000D44]">Log In To Your Account</h2>
    <form className="space-y-4 flex-grow">
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="accent-primary" />
          Keep Me Logged In
        </label>
        <a href="#" className="hover:underline">Forgot Password?</a>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#04CE78] cursor-pointer hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors duration-200"
      >
        Login <ArrowRight size={20} />
      </button>
    </form>
    <div>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-4 text-gray-400">Or</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-red-500 font-semibold py-3 rounded-lg transition-colors duration-200">
        <FcGoogle size={20} />
        Login with Google
      </button>
      {/* <div className="mt-8 text-center text-gray-600 text-sm">
        Don't Have An Account?{' '}
        <a href="#" className="font-bold text-primary hover:underline">Create</a>
      </div> */}
    </div>
  </div>

  {/* Register Form */}
  <div className="bg-white shadow-xl border-black-200 border border-black-200 rounded-2xl p-8 w-full md:w-1/2 h-full flex flex-col justify-between">
    <h2 className="text-xl font-bold mb-6 text-[#000D44]">Create Account</h2>
    <form className="space-y-4 flex-grow">
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Repeat Password"
        className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#1F5FFF] cursor-pointer hover:bg-violet-800 text-white font-bold py-3 rounded-lg transition-colors duration-200"
      >
        Register Now <ArrowRight size={20} />
      </button>
    </form>
    <div>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-4 text-gray-400">Or</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-red-500 font-semibold py-3 rounded-lg transition-colors duration-200">
        <FcGoogle size={20} />
        Login with Google
      </button>
      {/* <div className="mt-8 text-center text-gray-600 text-sm">
        Already Have An Account?{' '}
        <a href="#" className="font-bold text-primary hover:underline">Login</a>
      </div> */}
    </div>
  </div>
</div>

  );
};

export default LoginForm;